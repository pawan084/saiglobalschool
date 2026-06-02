import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/apply/route";

function req(body: unknown) {
  return new Request("http://localhost/api/apply", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("/api/apply", () => {
  it("accepts a full application", async () => {
    const res = await POST(req({
      parentName: "Alice",
      parentEmail: "alice@example.com",
      parentPhone: "12345678",
      childName: "Bob",
      childGrade: "Grade 3",
    }));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.reference).toMatch(/^SSSGS-/);
  });

  it("rejects when required field missing", async () => {
    const res = await POST(req({ parentName: "A" }));
    expect(res.status).toBe(400);
  });

  it("silently OK on honeypot", async () => {
    const res = await POST(req({ honey: "bot" }));
    expect(res.status).toBe(200);
  });

  it("400 on invalid JSON", async () => {
    const r = new Request("http://localhost/api/apply", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "garbage",
    });
    const res = await POST(r);
    expect(res.status).toBe(400);
  });
});
