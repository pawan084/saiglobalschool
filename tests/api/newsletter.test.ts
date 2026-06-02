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
});
