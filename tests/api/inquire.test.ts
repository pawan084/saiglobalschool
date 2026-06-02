import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/inquire/route";

function req(body: unknown, ip = "10.0.0.1") {
  return new Request("http://localhost/api/inquire", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("/api/inquire", () => {
  it("accepts a valid inquiry and returns a reference", async () => {
    const res = await POST(req({ name: "Alice", email: "a@example.com" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.reference).toMatch(/^INQ-/);
  });

  it("400 on missing name", async () => {
    const res = await POST(req({ email: "a@example.com" }, "10.0.0.2"));
    expect(res.status).toBe(400);
  });

  it("400 on bad email", async () => {
    const res = await POST(req({ name: "A", email: "bad" }, "10.0.0.3"));
    expect(res.status).toBe(400);
  });

  it("silently OK on honeypot", async () => {
    const res = await POST(req({ honey: "bot" }, "10.0.0.4"));
    expect(res.status).toBe(200);
  });

  it("400 on invalid JSON", async () => {
    const r = new Request("http://localhost/api/inquire", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "10.0.0.5" },
      body: "x",
    });
    expect((await POST(r)).status).toBe(400);
  });

  it("rate-limits after burst", async () => {
    const ip = "10.0.0.6";
    for (let i = 0; i < 8; i++) {
      await POST(req({ name: "X", email: "x@example.com" }, ip));
    }
    const res = await POST(req({ name: "X", email: "x@example.com" }, ip));
    expect(res.status).toBe(429);
  });
});
