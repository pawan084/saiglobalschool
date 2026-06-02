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

export function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "anon";
}
