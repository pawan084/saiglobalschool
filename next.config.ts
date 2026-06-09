import type { NextConfig } from "next";

/**
 * Static security headers.
 *
 * The Content-Security-Policy is now generated per-request by `proxy.ts`
 * with a fresh nonce. Setting it here too would result in two CSP headers
 * (the browser uses the intersection — the most restrictive policy wins),
 * so we keep CSP out of this file entirely.
 *
 * Everything below is non-CSP hardening that doesn't need per-request state.
 */
const securityHeaders = [
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
  async redirects() {
    return [
      // /tamil-lab briefly appeared in commit 75620a9 before the rename was
      // reverted. Preserves any backlinks / indexed URLs that may have been
      // captured during that window.
      { source: "/tamil-lab", destination: "/language-lab", permanent: true },
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
