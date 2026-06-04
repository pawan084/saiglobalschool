import { describe, it, expect } from "vitest";
import { score, searchEntries } from "@/lib/search";

const entry = (overrides: Partial<{ title: string; section: string; tags: string; href: string }>) => ({
  title: "Apply now",
  href: "/apply",
  section: "Admissions",
  tags: "application form admission",
  ...overrides,
});

describe("score()", () => {
  it("rewards a prefix match more than a substring match", () => {
    const a = score(entry({ title: "Apply now" }), "apply");
    const b = score(entry({ title: "How to apply" }), "apply");
    expect(a).toBeGreaterThan(b);
  });

  it("scores tag hits above section hits", () => {
    const tagHit = score(entry({ title: "Foo", section: "Other", tags: "fees tuition" }), "fees");
    const sectionHit = score(entry({ title: "Foo", section: "Fees", tags: "other" }), "fees");
    expect(tagHit).toBeGreaterThan(sectionHit);
  });

  it("returns 0-ish for non-matches (no positive score)", () => {
    expect(score(entry({ title: "Foo" }), "zzzz")).toBeLessThanOrEqual(0);
  });

  it("prefers shorter titles when scores are otherwise equal", () => {
    const short = score(entry({ title: "Apply" }), "apply");
    const long = score(entry({ title: "Apply for our school admission process now" }), "apply");
    expect(short).toBeGreaterThan(long);
  });
});

describe("searchEntries()", () => {
  it("returns ranked results for a non-empty query", () => {
    const results = searchEntries("fees");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toMatch(/Fee Structure/i);
  });

  it("returns an empty list for an empty query", () => {
    expect(searchEntries("")).toEqual([]);
    expect(searchEntries("   ")).toEqual([]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(searchEntries("zzzzz_no_match")).toEqual([]);
  });

  it("respects the limit argument", () => {
    const results = searchEntries("a", 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("is case-insensitive", () => {
    const a = searchEntries("FEES");
    const b = searchEntries("fees");
    expect(a.map((e) => e.href)).toEqual(b.map((e) => e.href));
  });
});
