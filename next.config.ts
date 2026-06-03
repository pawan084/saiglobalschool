import type { NextConfig } from "next";

/**
 * Content-Security-Policy
 *
 * Hash- and source-based policy that keeps the site fully static-prerenderable
 * (no per-request nonce). The trade-off vs nonce-based CSP:
 *
 *   - We must allow 'unsafe-inline' for styles (Next.js inlines critical CSS
 *     and Tailwind utility classes mean inline `style="..."` attributes are
 *     common). Mitigated by also keeping X-Frame-Options + Referrer-Policy.
 *   - We allow 'unsafe-inline' for scripts so React Server Component flight
 *     payloads (which Next.js inlines as <script>) can execute. The other
 *     hardening (no-eval in prod, frame-ancestors 'none') still blocks the
 *     most common XSS escalation paths.
 *
 * If you ever move to dynamic rendering (e.g. add auth pages), switch to
 * nonce-based CSP via `proxy.ts` for strict 'strict-dynamic' enforcement.
 */
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  // Scripts: 'self' for our bundles + 'unsafe-inline' for RSC flight payloads.
  // 'unsafe-eval' is only needed in dev for React's enhanced error stacks.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // Styles: 'unsafe-inline' covers Next.js critical CSS + Tailwind inline styles.
  "style-src 'self' 'unsafe-inline'",
  // Images: allow data: (Next.js blur placeholders) and our own origin.
  "img-src 'self' blob: data:",
  // Fonts loaded via next/font/google get inlined as same-origin URLs.
  "font-src 'self' data:",
  // Connect: API + WhatsApp + OpenAI streaming (the chat route is internal).
  "connect-src 'self' https://wa.me",
  // Embed protection: refuse to be framed anywhere.
  "frame-ancestors 'none'",
  // Forms: only submit to our own origin.
  "form-action 'self'",
  // Base URI: prevent <base> tag injection redirecting relative URLs.
  "base-uri 'self'",
  // Block legacy plugins.
  "object-src 'none'",
  // Upgrade plain HTTP requests to HTTPS in production.
  !isDev ? "upgrade-insecure-requests" : "",
]
  .filter(Boolean)
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(self), microphone=(self), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Cross-Origin Opener / Embedder hardening — strict but compatible with our
  // assets (all same-origin). Comment out if you embed cross-origin iframes.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

// Wrap with @next/bundle-analyzer when `npm run analyze` runs.
// The env flag means production builds without `ANALYZE=true` stay untouched.
import withBundleAnalyzerImport from "@next/bundle-analyzer";
const withBundleAnalyzer = withBundleAnalyzerImport({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
