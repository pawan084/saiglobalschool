import { NextResponse, type NextRequest } from "next/server";

/**
 * Per-request CSP with a fresh nonce.
 *
 * Next 16's nonce-aware rendering auto-attaches the nonce from this header
 * to framework scripts, page bundles, and the inline <style> blocks Next
 * generates during SSR. To make this work the rest of the app must render
 * dynamically — layout.tsx calls `await connection()` (or reads `headers()`)
 * to opt out of static prerendering.
 *
 * CSP strategy: hybrid.
 *   - script-src: 'self' + nonce + strict-dynamic. Drops 'unsafe-inline'.
 *   - style-src-elem: 'self' + nonce. Restricts <style> / <link rel=stylesheet>.
 *   - style-src-attr: 'unsafe-inline'. Inline style="…" attributes are used
 *     extensively in the JSX (decorative shadows, gradients, sizing). CSP3
 *     splits element vs. attribute sources, so we can keep elements strict
 *     while not requiring a refactor of every inline style attribute.
 *
 * Note that this proxy runs in the Edge runtime — keep it dependency-free.
 */
const isDev = process.env.NODE_ENV === "development";
const apiOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").origin;
  } catch {
    return "http://localhost:8000";
  }
})();

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    // Scripts: nonce + strict-dynamic lets Next propagate trust to bundles
    // it loads itself, without 'unsafe-inline'. 'unsafe-eval' only in dev
    // for React's enhanced error stacks.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    // <style> / <link> need the nonce; inline style="…" attributes stay
    // permissive because they're used throughout the JSX.
    `style-src-elem 'self' 'nonce-${nonce}'`,
    "style-src-attr 'unsafe-inline'",
    // Images: data: for next/image blur placeholders + blob: for object URLs.
    "img-src 'self' blob: data: https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://www.google.com https://*.clarity.ms https://clarity.ms",
    "font-src 'self' data:",
    `connect-src 'self' ${apiOrigin} https://wa.me https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://www.google.com https://*.clarity.ms https://clarity.ms`,
    // /campus-address embeds a Google Maps iframe. Without an explicit
    // frame-src this falls back to default-src 'self' and the map renders
    // as a blank box. https://www.google.com covers both maps.google.com
    // and www.google.com/maps which Maps may redirect to.
    "frame-src https://www.google.com https://maps.google.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    !isDev ? "upgrade-insecure-requests" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function proxy(request: NextRequest) {
  // crypto.randomUUID is available in the Edge runtime (Web Crypto).
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce);

  // Pass the nonce to Next via a request header it knows to read; layout
  // can also read it via headers() if it needs to wire a <Script nonce>.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static assets and the API.
     * Skipping next-router-prefetch + purpose=prefetch keeps Next's
     * link prefetcher fast (it doesn't need a fresh CSP).
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|robots.txt|sitemap.xml|manifest.webmanifest|sw.js|logo.png|logo-256.png|icon-192.png|icon-512.png|icon-maskable-512.png|feed.xml).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
