import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { rateLimit, clientKey } from "@/lib/rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-02T10:00:00Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows hits under the limit", () => {
    for (let i = 0; i < 3; i++) {
      const r = rateLimit(`u${Math.random()}`, { limit: 5, windowMs: 60_000 });
      expect(r.allowed).toBe(true);
      expect(r.remaining).toBeGreaterThanOrEqual(0);
    }
  });

  it("blocks once limit is reached", () => {
    const key = `block-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      expect(rateLimit(key, { limit: 5, windowMs: 60_000, banMs: 30_000 }).allowed).toBe(true);
    }
    const r = rateLimit(key, { limit: 5, windowMs: 60_000, banMs: 30_000 });
    expect(r.allowed).toBe(false);
    expect(r.remaining).toBe(0);
    expect(r.retryAfterMs).toBeGreaterThan(0);
  });

  it("stays blocked during the ban window", () => {
    const key = `ban-${Math.random()}`;
    for (let i = 0; i < 5; i++) rateLimit(key, { limit: 5, windowMs: 60_000, banMs: 60_000 });
    rateLimit(key, { limit: 5, windowMs: 60_000, banMs: 60_000 }); // triggers ban
    vi.advanceTimersByTime(10_000);
    const r = rateLimit(key, { limit: 5, windowMs: 60_000, banMs: 60_000 });
    expect(r.allowed).toBe(false);
  });

  it("unblocks after ban expires", () => {
    const key = `expire-${Math.random()}`;
    for (let i = 0; i < 5; i++) rateLimit(key, { limit: 5, windowMs: 60_000, banMs: 60_000 });
    rateLimit(key, { limit: 5, windowMs: 60_000, banMs: 60_000 }); // ban
    vi.advanceTimersByTime(61_000);
    const r = rateLimit(key, { limit: 5, windowMs: 60_000, banMs: 60_000 });
    expect(r.allowed).toBe(true);
  });

  it("uses default opts when not provided", () => {
    const key = `default-${Math.random()}`;
    const r = rateLimit(key);
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBeLessThanOrEqual(12);
  });

  it("forgets old hits outside the rolling window", () => {
    const key = `roll-${Math.random()}`;
    for (let i = 0; i < 4; i++) rateLimit(key, { limit: 5, windowMs: 60_000 });
    vi.advanceTimersByTime(61_000);
    // After window elapses, full quota refreshes
    for (let i = 0; i < 5; i++) {
      expect(rateLimit(key, { limit: 5, windowMs: 60_000 }).allowed).toBe(true);
    }
  });

  it("prunes inactive buckets eventually (defensive)", () => {
    // Hit many distinct keys to push past the prune threshold
    for (let i = 0; i < 250; i++) {
      rateLimit(`prune-${i}`, { limit: 5, windowMs: 60_000 });
    }
    // Subsequent calls should still work
    const r = rateLimit("prune-after", { limit: 5, windowMs: 60_000 });
    expect(r.allowed).toBe(true);
  });
});

describe("clientKey", () => {
  it("prefers Vercel's edge header above x-forwarded-for (which is spoofable)", () => {
    const req = new Request("http://localhost/", {
      headers: {
        "x-vercel-forwarded-for": "5.5.5.5",
        "x-forwarded-for": "1.2.3.4, 6.6.6.6",
      },
    });
    expect(clientKey(req)).toBe("5.5.5.5");
  });

  it("uses cf-connecting-ip on Cloudflare", () => {
    const req = new Request("http://localhost/", {
      headers: {
        "cf-connecting-ip": "203.0.113.10",
        "x-forwarded-for": "evil-spoofed",
      },
    });
    expect(clientKey(req)).toBe("203.0.113.10");
  });

  it("uses fly-client-ip on Fly.io", () => {
    const req = new Request("http://localhost/", {
      headers: { "fly-client-ip": "203.0.113.20" },
    });
    expect(clientKey(req)).toBe("203.0.113.20");
  });

  it("falls back to x-real-ip", () => {
    const req = new Request("http://localhost/", { headers: { "x-real-ip": "9.9.9.9" } });
    expect(clientKey(req)).toBe("9.9.9.9");
  });

  it("uses x-forwarded-for as last platform-header resort", () => {
    const req = new Request("http://localhost/", {
      headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
    });
    expect(clientKey(req)).toBe("1.2.3.4");
  });

  it("never returns the literal 'anon' bucket when UA/lang are present", () => {
    const req = new Request("http://localhost/", {
      headers: {
        "user-agent": "Mozilla/5.0 ChromeTest",
        "accept-language": "en-US",
      },
    });
    const key = clientKey(req);
    expect(key).not.toBe("anon");
    expect(key).toMatch(/^ua-/);
  });

  it("distinct UA/lang fingerprints land in different buckets", () => {
    const a = clientKey(
      new Request("http://localhost/", {
        headers: { "user-agent": "Mozilla", "accept-language": "en" },
      })
    );
    const b = clientKey(
      new Request("http://localhost/", {
        headers: { "user-agent": "Safari", "accept-language": "fr" },
      })
    );
    expect(a).not.toBe(b);
  });

  it("returns 'anon' only as the absolute last resort", () => {
    const req = new Request("http://localhost/");
    expect(clientKey(req)).toBe("anon");
  });
});
