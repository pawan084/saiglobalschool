import { describe, it, expect, vi, afterEach } from "vitest";
import { fetchWithTimeout, TimeoutError } from "@/lib/fetch";

afterEach(() => vi.restoreAllMocks());

describe("fetchWithTimeout", () => {
  it("passes through a fast response", async () => {
    const r = new Response("ok", { status: 200 });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(r);
    const out = await fetchWithTimeout("/api/x");
    expect(await out.text()).toBe("ok");
  });

  it("forwards method, headers, body to fetch", async () => {
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok"));
    await fetchWithTimeout("/api/x", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: 1 }),
    });
    const [url, init] = spy.mock.calls[0]!;
    expect(url).toBe("/api/x");
    expect((init as RequestInit).method).toBe("POST");
    expect((init as RequestInit).body).toBe('{"a":1}');
  });

  it("throws TimeoutError when slower than timeoutMs", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      (_, init) =>
        new Promise((_resolve, reject) => {
          (init as RequestInit).signal?.addEventListener("abort", () => {
            reject(new DOMException("aborted", "AbortError"));
          });
        })
    );
    await expect(fetchWithTimeout("/api/x", { timeoutMs: 30 })).rejects.toBeInstanceOf(
      TimeoutError
    );
  });

  it("rethrows non-timeout errors as-is", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("dns"));
    await expect(fetchWithTimeout("/api/x")).rejects.toThrow("dns");
  });

  it("respects an externally-provided abort signal", async () => {
    const external = new AbortController();
    vi.spyOn(globalThis, "fetch").mockImplementation(
      (_, init) =>
        new Promise((_resolve, reject) => {
          (init as RequestInit).signal?.addEventListener("abort", () => {
            reject(new DOMException("aborted", "AbortError"));
          });
        })
    );
    const p = fetchWithTimeout("/api/x", { signal: external.signal });
    external.abort();
    await expect(p).rejects.toThrow();
  });

  it("if the external signal is already aborted, fetch is called with an aborted signal", async () => {
    const external = new AbortController();
    external.abort();
    vi.spyOn(globalThis, "fetch").mockImplementation((_, init) => {
      const s = (init as RequestInit).signal;
      if (s?.aborted) {
        return Promise.reject(new DOMException("aborted", "AbortError"));
      }
      return Promise.resolve(new Response("nope"));
    });
    await expect(
      fetchWithTimeout("/api/x", { signal: external.signal })
    ).rejects.toThrow();
  });

  it("TimeoutError has cause='timeout'", () => {
    const err = new TimeoutError(1000);
    expect(err.cause).toBe("timeout");
    expect(err.message).toContain("1000");
    expect(err.name).toBe("TimeoutError");
  });
});
