import { describe, it, expect } from "vitest";
import { isAllowedOrigin } from "@/lib/origin";

function req(headers: Record<string, string>) {
  return new Request("https://sssgs.example/api/x", { method: "POST", headers });
}

describe("isAllowedOrigin", () => {
  it("allows a same-origin browser POST (Origin host === request host)", () => {
    expect(isAllowedOrigin(req({ origin: "https://sssgs.example" }))).toBe(true);
  });

  it("rejects a cross-origin browser POST", () => {
    expect(isAllowedOrigin(req({ origin: "https://evil.example" }))).toBe(false);
  });

  it("allows requests with no Origin (server-to-server / health checks)", () => {
    expect(isAllowedOrigin(req({}))).toBe(true);
  });

  it("rejects a malformed Origin", () => {
    expect(isAllowedOrigin(req({ origin: "not a url" }))).toBe(false);
  });

  it("matches against x-forwarded-host when behind a proxy", () => {
    const r = new Request("http://internal-host/api/x", {
      method: "POST",
      headers: { origin: "https://sssgs.example", "x-forwarded-host": "sssgs.example" },
    });
    expect(isAllowedOrigin(r)).toBe(true);
  });

  it("matches against the Host header", () => {
    const r = new Request("http://internal-host/api/x", {
      method: "POST",
      headers: { origin: "https://sssgs.example", host: "sssgs.example" },
    });
    expect(isAllowedOrigin(r)).toBe(true);
  });
});
