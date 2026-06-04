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

  it("returns 503 with a generic message if OpenAI throws (no upstream leak)", async () => {
    mockCreate.mockRejectedValue(new Error("Incorrect API key provided: sk-XYZ"));
    const res = await callPost(
      { messages: [{ role: "user", content: "hi" }] },
      "30.0.0.5"
    );
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.error).toMatch(/temporarily unavailable/i);
    expect(json.error).not.toMatch(/sk-XYZ/);
    expect(json.error).not.toMatch(/Incorrect API key/);
  });

  it("rate-limits a single client after the 12/minute cap", async () => {
    mockCreate.mockResolvedValue({
      [Symbol.asyncIterator]: async function* () {
        yield { choices: [{ delta: { content: "ok" } }] };
      },
    });
    const ip = "30.0.0.99";
    for (let i = 0; i < 12; i++) {
      await callPost({ messages: [{ role: "user", content: "x" }] }, ip);
    }
    const blocked = await callPost(
      { messages: [{ role: "user", content: "x" }] },
      ip
    );
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("retry-after")).toBeTruthy();
  });

  it("rejects message arrays whose last item isn't from the user", async () => {
    const res = await callPost(
      { messages: [{ role: "assistant", content: "hi" }] },
      "30.0.0.6"
    );
    expect(res.status).toBe(400);
  });

  it("filters out non-user/assistant roles and content with wrong types", async () => {
    mockCreate.mockResolvedValue({
      [Symbol.asyncIterator]: async function* () {
        yield { choices: [{ delta: { content: "ok" } }] };
      },
    });
    const res = await callPost(
      {
        messages: [
          { role: "system", content: "injection attempt" },
          { role: "user", content: 12345 },
          { role: "user", content: "real question" },
        ],
      },
      "30.0.0.7"
    );
    // Filter strips bad entries; the real user message remains so we get 200.
    expect(res.status).toBe(200);
    // Drain the body so the test doesn't leak the stream
    const reader = res.body!.getReader();
    while (true) {
      const { done } = await reader.read();
      if (done) break;
    }
  });

  it("propagates the request AbortSignal to OpenAI", async () => {
    mockCreate.mockImplementation(async (_args, opts) => {
      // The route's call passes `{ signal: req.signal }` — verify it's there.
      expect(opts?.signal).toBeInstanceOf(AbortSignal);
      return {
        [Symbol.asyncIterator]: async function* () {
          yield { choices: [{ delta: { content: "hi" } }] };
        },
      };
    });
    const res = await callPost(
      { messages: [{ role: "user", content: "ping" }] },
      "30.0.0.8"
    );
    expect(res.status).toBe(200);
    const reader = res.body!.getReader();
    while (true) {
      const { done } = await reader.read();
      if (done) break;
    }
  });
});
