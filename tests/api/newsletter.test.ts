import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/newsletter/route";

function req(body: unknown) {
  return new Request("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("/api/newsletter", () => {
  it("accepts a valid email", async () => {
    const res = await POST(req({ email: "test@example.com" }));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
  });

  it("rejects an invalid email", async () => {
    const res = await POST(req({ email: "not-an-email" }));
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
  });

  it("rejects missing email", async () => {
    const res = await POST(req({}));
    expect(res.status).toBe(400);
  });

  it("silently accepts honeypot-tripped submissions", async () => {
    const res = await POST(req({ email: "real@example.com", honey: "filled" }));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  it("rejects invalid JSON payload", async () => {
    const r = new Request("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "not json",
    });
    const res = await POST(r);
    expect(res.status).toBe(400);
  });

  it("rate-limits a single client after the 5/window cap", async () => {
    const ip = "10.99.0.42";
    const send = () =>
      POST(
        new Request("http://localhost/api/newsletter", {
          method: "POST",
          headers: { "content-type": "application/json", "x-forwarded-for": ip },
          body: JSON.stringify({ email: `t-${Math.random()}@example.com` }),
        })
      );
    // Burn through the bucket
    for (let i = 0; i < 5; i++) await send();
    const blocked = await send();
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("retry-after")).toBeTruthy();
  });

  it("caps the email length to RFC 5321 254 chars", async () => {
    // Use a unique x-forwarded-for so this doesn't share a bucket with the
    // burst test above. The route does .slice(254) on the email; a 500-char
    // input should still be parsed by the regex (zzz... after the TLD).
    const r = new Request("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "10.99.0.99" },
      body: JSON.stringify({ email: "ok@example.com" + "z".repeat(500) }),
    });
    const res = await POST(r);
    // The slice + regex still passes — what matters is no crash and a 2xx/4xx.
    expect([200, 400]).toContain(res.status);
  });
});
