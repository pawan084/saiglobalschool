import { describe, it, expect, vi, afterEach } from "vitest";
import { safeGet, safeSet, safeRemove, safeGetJson, safeSetJson } from "@/lib/storage";

afterEach(() => {
  vi.restoreAllMocks();
  try { localStorage.clear(); } catch { /* ignore */ }
});

describe("safeGet / safeSet / safeRemove", () => {
  it("round-trips a value", () => {
    safeSet("k", "v");
    expect(safeGet("k")).toBe("v");
  });

  it("returns the fallback when nothing is stored", () => {
    expect(safeGet("missing", "default")).toBe("default");
  });

  it("returns null fallback by default", () => {
    expect(safeGet("missing")).toBeNull();
  });

  it("safeRemove deletes the key", () => {
    safeSet("k", "v");
    safeRemove("k");
    expect(safeGet("k")).toBeNull();
  });

  it("returns fallback when localStorage throws on get", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("denied");
    });
    expect(safeGet("k", "fallback")).toBe("fallback");
  });

  it("silently swallows errors on set", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    expect(() => safeSet("k", "v")).not.toThrow();
  });

  it("silently swallows errors on remove", () => {
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("denied");
    });
    expect(() => safeRemove("k")).not.toThrow();
  });
});

describe("safeGetJson / safeSetJson", () => {
  it("round-trips a JSON value", () => {
    safeSetJson("k", { a: 1, b: [2, 3] });
    expect(safeGetJson("k", null)).toEqual({ a: 1, b: [2, 3] });
  });

  it("returns the fallback when nothing is stored", () => {
    expect(safeGetJson("missing", [99])).toEqual([99]);
  });

  it("returns the fallback when JSON is malformed", () => {
    safeSet("k", "{not-json");
    expect(safeGetJson("k", "fallback")).toBe("fallback");
  });

  it("does not throw when stringify itself fails", () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    expect(() => safeSetJson("k", circular)).not.toThrow();
  });
});
