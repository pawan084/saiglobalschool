import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

function buildReq(url = "http://localhost/") {
  return new NextRequest(url);
}

describe("proxy", () => {
  it("returns a NextResponse with a Content-Security-Policy header", () => {
    const res = proxy(buildReq());
    const csp = res.headers.get("Content-Security-Policy");
    expect(csp).toBeTruthy();
  });

  it("CSP contains a unique base64 nonce", () => {
    const res = proxy(buildReq());
    const csp = res.headers.get("Content-Security-Policy")!;
    const nonceMatch = csp.match(/nonce-([A-Za-z0-9+/=]+)/);
    expect(nonceMatch).not.toBeNull();
    expect(nonceMatch![1].length).toBeGreaterThan(20);
  });

  it("generates a fresh nonce on each call", () => {
    const a = proxy(buildReq()).headers.get("Content-Security-Policy")!.match(/nonce-([A-Za-z0-9+/=]+)/)![1];
    const b = proxy(buildReq()).headers.get("Content-Security-Policy")!.match(/nonce-([A-Za-z0-9+/=]+)/)![1];
    expect(a).not.toBe(b);
  });

  it("script-src drops 'unsafe-inline' but keeps 'strict-dynamic'", () => {
    const csp = proxy(buildReq()).headers.get("Content-Security-Policy")!;
    // script-src section between this and the next semicolon
    const scriptSrc = csp.split(";").find((p) => p.trim().startsWith("script-src"))!;
    expect(scriptSrc).toContain("'strict-dynamic'");
    expect(scriptSrc).not.toContain("'unsafe-inline'");
  });

  it("style-src-elem uses the nonce; style-src-attr allows inline style attributes", () => {
    const csp = proxy(buildReq()).headers.get("Content-Security-Policy")!;
    const elem = csp.split(";").find((p) => p.trim().startsWith("style-src-elem"))!;
    const attr = csp.split(";").find((p) => p.trim().startsWith("style-src-attr"))!;
    expect(elem).toMatch(/'nonce-[A-Za-z0-9+/=]+'/);
    expect(attr).toContain("'unsafe-inline'");
  });

  it("locks down framing, base-uri, object, and forms", () => {
    const csp = proxy(buildReq()).headers.get("Content-Security-Policy")!;
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("object-src 'none'");
  });

  it("allows the WhatsApp origin in connect-src", () => {
    const csp = proxy(buildReq()).headers.get("Content-Security-Policy")!;
    const connect = csp.split(";").find((p) => p.trim().startsWith("connect-src"))!;
    expect(connect).toContain("https://wa.me");
  });
});
