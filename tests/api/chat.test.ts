import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the OpenAI SDK
const mockCreate = vi.fn();
vi.mock("openai", () => {
  return {
    default: class {
      chat = { completions: { create: mockCreate } };
    },
  };
});

beforeEach(() => {
  mockCreate.mockReset();
});

function req(body: unknown, ip = "20.0.0.1") {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

async function callPost(body: unknown, ip?: string) {
  process.env.OPENAI_API_KEY = "test-key";
  const { POST } = await import("@/app/api/chat/route");
  return POST(req(body, ip));
}

describe("/api/chat", () => {
  it("returns 500 if API key missing", async () => {
    delete process.env.OPENAI_API_KEY;
    vi.resetModules();
    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(req({ messages: [{ role: "user", content: "hi" }] }, "30.0.0.0"));
    expect(res.status).toBe(500);
  });

  it("streams response from OpenAI", async () => {
    mockCreate.mockResolvedValue({
      [Symbol.asyncIterator]: async function* () {
        yield { choices: [{ delta: { content: "Hello " } }] };
        yield { choices: [{ delta: { content: "world" } }] };
      },
    });
    const res = await callPost({ messages: [{ role: "user", content: "hi" }] }, "30.0.0.1");
    expect(res.status).toBe(200);
    const reader = res.body!.getReader();
    const dec = new TextDecoder();
    let out = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      out += dec.decode(value);
    }
    expect(out).toBe("Hello world");
  });

  it("400 on invalid JSON body", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    const { POST } = await import("@/app/api/chat/route");
    const r = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "30.0.0.2" },
      body: "garbage",
    });
    expect((await POST(r)).status).toBe(400);
  });

  it("returns honeypot ok response", async () => {
    const res = await callPost({ honey: "bot", messages: [{ role: "user", content: "hi" }] }, "30.0.0.3");
    expect(res.status).toBe(200);
  });

  it("400 on empty messages", async () => {
    const res = await callPost({ messages: [] }, "30.0.0.4");
    expect(res.status).toBe(400);
  });
});
