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
 * Trusted IP headers, in priority order.
 *
 * Each platform terminates TLS at its own edge and sets its own non-spoofable
 * header. Reading those FIRST means an attacker can't bypass rate limits by
 * forging `x-forwarded-for` — those edge headers are stripped by the edge if
 * the client tries to forge them.
 *
 *  - `x-vercel-forwarded-for`  → Vercel (set by their edge after stripping XFF)
 *  - `cf-connecting-ip`        → Cloudflare
 *  - `fly-client-ip`           → Fly.io
 *  - `x-real-ip`               → nginx default, also Netlify
 *  - `x-forwarded-for`         → generic fallback (DO trust only behind a known proxy)
 *
 * Order matters: the first match wins. `x-forwarded-for` is last so any
 * platform that adds its own header takes precedence over the spoofable one.
 */
const TRUSTED_IP_HEADERS = [
  "x-vercel-forwarded-for",
  "cf-connecting-ip",
  "fly-client-ip",
  "x-real-ip",
  "x-forwarded-for",
] as const;

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
  for (const name of TRUSTED_IP_HEADERS) {
    const v = req.headers.get(name);
    if (!v) continue;
    // x-forwarded-for can be a comma list — first is the client.
    const ip = v.split(",")[0].trim();
    if (ip) return ip;
  }
  // No platform header — degrade gracefully. Using a literal "anon" collapses
  // every anonymous client into one bucket, which means one attacker DoS's
  // rate-limiting for everyone. Hash UA + Accept-Language as a cheap proxy
  // for client identity so unique-looking clients land in different buckets.
  const ua = req.headers.get("user-agent") || "";
  const lang = req.headers.get("accept-language") || "";
  if (ua || lang) return `ua-${fnv1a(`${ua}|${lang}`)}`;
  return "anon";
}
