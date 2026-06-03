import { describe, it, expect, vi, afterEach } from "vitest";
import { buildTimeNow } from "@/lib/clock";

afterEach(() => vi.useRealTimers());

describe("buildTimeNow", () => {
  it("returns a millisecond timestamp", () => {
    const t = buildTimeNow();
    expect(typeof t).toBe("number");
    expect(t).toBeGreaterThan(1_700_000_000_000); // 2023-01-01ish
  });

  it("reflects the system clock under fake timers", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-02T10:00:00Z"));
    expect(buildTimeNow()).toBe(Date.parse("2026-06-02T10:00:00Z"));
  });
});
