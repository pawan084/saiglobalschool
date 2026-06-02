import { describe, it, expect } from "vitest";
import {
  bandForGrade,
  getFeeLines,
  annualise,
  format,
  CURRENCIES,
  type Currency,
} from "@/lib/fees";

describe("bandForGrade", () => {
  it.each([1, 2, 3, 4, 5])("grade %i is primary", (g) => {
    expect(bandForGrade(g)).toBe("primary");
  });
  it.each([6, 7, 8])("grade %i is secondary", (g) => {
    expect(bandForGrade(g)).toBe("secondary");
  });
});

describe("getFeeLines", () => {
  it("returns primary lines", () => {
    const lines = getFeeLines("primary");
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some((l) => l.id === "tuition-primary")).toBe(true);
  });
  it("returns secondary lines", () => {
    const lines = getFeeLines("secondary");
    expect(lines.some((l) => l.id === "tuition-secondary")).toBe(true);
  });
  it("every line has all required fields", () => {
    for (const band of ["primary", "secondary"] as const) {
      for (const l of getFeeLines(band)) {
        expect(l.id).toBeTruthy();
        expect(l.label).toBeTruthy();
        expect(typeof l.amountSgd).toBe("number");
        expect(["monthly", "annual", "one-time"]).toContain(l.frequency);
        expect(["core", "addon"]).toContain(l.group);
      }
    }
  });
});

describe("annualise", () => {
  it("multiplies monthly by 12", () => {
    expect(annualise({ id: "x", label: "x", amountSgd: 100, frequency: "monthly", group: "core" })).toBe(1200);
  });
  it("returns annual amount as-is", () => {
    expect(annualise({ id: "x", label: "x", amountSgd: 250, frequency: "annual", group: "core" })).toBe(250);
  });
  it("returns one-time amount as-is", () => {
    expect(annualise({ id: "x", label: "x", amountSgd: 500, frequency: "one-time", group: "core" })).toBe(500);
  });
});

describe("CURRENCIES", () => {
  it("exposes the expected four currencies", () => {
    expect(Object.keys(CURRENCIES).sort()).toEqual(["AED", "INR", "SGD", "USD"]);
  });
  it("each currency has symbol, toSgd rate, and label", () => {
    for (const c of Object.values(CURRENCIES)) {
      expect(c.symbol).toBeTruthy();
      expect(typeof c.toSgd).toBe("number");
      expect(c.toSgd).toBeGreaterThan(0);
      expect(c.label).toBeTruthy();
    }
  });
});

describe("format", () => {
  it("formats SGD without conversion", () => {
    expect(format(100, "SGD")).toBe("S$100");
  });
  it("converts SGD amount into target currency", () => {
    const ccy: Currency = "USD";
    const out = format(1340, ccy);
    expect(out).toMatch(/^US\$/);
  });
  it("produces a comma-separated currency string", () => {
    // Locale formatting varies — assert structure rather than en-US specifics.
    expect(format(123456, "SGD")).toMatch(/^S\$[\d,]+$/);
    expect(format(123456, "SGD")).toContain(",");
  });
});
