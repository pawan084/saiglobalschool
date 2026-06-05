/**
 * Same-origin guard for state-changing API routes.
 *
 * Rejects cross-origin browser POSTs to thwart CSRF and third-party-site
 * automation. Browsers always send an `Origin` header on cross-origin writes;
 * a same-origin browser POST sends `Origin` = our own host. Server-to-server
 * callers usually omit `Origin` — those are allowed through (rate limiting and
 * the honeypot still apply), so legitimate integrations and health checks work.
 *
 * Used by every browser-invoked write endpoint (apply, chat, inquire,
 * newsletter) so the protection is applied consistently.
 */
export function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // no Origin → not a browser cross-origin write

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false; // malformed Origin → reject
  }

  // Compare against the host the browser actually addressed. Prefer the
  // forwarded host (set by the platform edge) and fall back to the Host header,
  // then the request URL — so the check still holds behind a proxy where
  // `req.url` may carry an internal host.
  const forwardedHost = req.headers.get("x-forwarded-host");
  const host = req.headers.get("host");
  let urlHost = "";
  try {
    urlHost = new URL(req.url).host;
  } catch {
    /* ignore */
  }

  return [forwardedHost, host, urlHost].some((h) => h && h === originHost);
}
