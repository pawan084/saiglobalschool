/**
 * Tiny in-memory sliding-window rate limiter.
 *
 * Designed for single-instance protection against runaway clients. Use a real
 * distributed limiter (Upstash / Redis) once the site runs on more than one
 * Vercel region — the in-memory map is per-instance and reset on cold start.
 */

type Bucket = { hits: number[]; blockedUntil?: number };

const buckets = new Map<string, Bucket>();
const PRUNE_EVERY = 200;
let opsSincePrune = 0;

export function rateLimit(
  key: string,
  opts: { limit: number; windowMs: number; banMs?: number } = {
    limit: 12,
    windowMs: 60_000,
    banMs: 2 * 60_000,
  }
): { allowed: boolean; retryAfterMs: number; remaining: number } {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { hits: [] };
    buckets.set(key, bucket);
  }

  if (bucket.blockedUntil && bucket.blockedUntil > now) {
    return { allowed: false, retryAfterMs: bucket.blockedUntil - now, remaining: 0 };
  }
  bucket.blockedUntil = undefined;

  // Drop hits outside the window
  const cutoff = now - opts.windowMs;
  bucket.hits = bucket.hits.filter((t) => t > cutoff);

  if (bucket.hits.length >= opts.limit) {
    const banMs = opts.banMs ?? opts.windowMs;
    bucket.blockedUntil = now + banMs;
    return { allowed: false, retryAfterMs: banMs, remaining: 0 };
  }

  bucket.hits.push(now);
  if (++opsSincePrune > PRUNE_EVERY) {
    opsSincePrune = 0;
    for (const [k, b] of buckets) {
      if (!b.hits.length && (!b.blockedUntil || b.blockedUntil < now)) {
        buckets.delete(k);
      }
    }
  }
  return { allowed: true, retryAfterMs: 0, remaining: opts.limit - bucket.hits.length };
}

/**
 * Non-spoofable platform-edge IP headers, in priority order.
 *
 * Each of these platforms terminates TLS at its own edge and OVERWRITES the
 * header with the real client IP after stripping anything the client sent, so
 * a client cannot forge them. These are always trusted.
 *
 *  - `x-vercel-forwarded-for`  → Vercel
 *  - `cf-connecting-ip`        → Cloudflare
 *  - `fly-client-ip`           → Fly.io
 */
const EDGE_IP_HEADERS = [
  "x-vercel-forwarded-for",
  "cf-connecting-ip",
  "fly-client-ip",
] as const;

/**
 * Reverse-proxy headers (`x-real-ip`, `x-forwarded-for`). On a bare host — or a
 * proxy that doesn't sanitise them — a client can forge these and rotate a
 * fresh value per request to land in a new bucket every time, defeating the
 * limiter on cost-bearing endpoints (e.g. the OpenAI-backed chat route).
 *
 * So we trust them ONLY when the operator explicitly declares a sanitising
 * proxy is in front, via `RATE_LIMIT_TRUST_PROXY=1`. That deployment contract:
 * the proxy must replace (not merely append) these headers with the real
 * client IP. Absent the flag, forged proxy headers are ignored and the client
 * falls through to the UA fingerprint below.
 */
const PROXY_IP_HEADERS = ["x-real-ip", "x-forwarded-for"] as const;

function firstIp(value: string): string {
  return value.split(",")[0].trim();
}

/** Tiny FNV-1a hash so the UA fallback doesn't leak the raw string into log keys. */
function fnv1a(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h.toString(36);
}

export function clientKey(req: Request): string {
  // 1) Non-spoofable platform-edge headers — always trusted.
  for (const name of EDGE_IP_HEADERS) {
    const v = req.headers.get(name);
    if (!v) continue;
    const ip = firstIp(v);
    if (ip) return ip;
  }
  // 2) Reverse-proxy headers — forgeable on a bare host, so only trusted when
  //    the operator declares a sanitising proxy via RATE_LIMIT_TRUST_PROXY=1.
  if (process.env.RATE_LIMIT_TRUST_PROXY === "1") {
    for (const name of PROXY_IP_HEADERS) {
      const v = req.headers.get(name);
      if (!v) continue;
      const ip = firstIp(v);
      if (ip) return ip;
    }
  }
  // No trusted IP source — degrade gracefully. Using a literal "anon" collapses
  // every anonymous client into one bucket, which means one attacker DoS's
  // rate-limiting for everyone. Hash UA + Accept-Language as a cheap proxy
  // for client identity so unique-looking clients land in different buckets.
  const ua = req.headers.get("user-agent") || "";
  const lang = req.headers.get("accept-language") || "";
  if (ua || lang) return `ua-${fnv1a(`${ua}|${lang}`)}`;
  return "anon";
}
