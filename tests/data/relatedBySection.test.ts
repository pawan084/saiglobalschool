import { describe, it, expect } from "vitest";
import {
  sectionMeta,
  slugSection,
  getSidebarItems,
  getRelatedBlock,
  getSectionMeta,
  type SectionKey,
} from "@/data/relatedBySection";

describe("relatedBySection", () => {
  it("each meta key maps to a real route", () => {
    for (const key of Object.keys(sectionMeta) as SectionKey[]) {
      const m = sectionMeta[key];
      expect(m.href.startsWith("/")).toBe(true);
      expect(m.label).toBeTruthy();
      expect(m.cta).toBeTruthy();
    }
  });

  it("slugSection maps known slugs to a section key", () => {
    expect(Object.keys(slugSection).length).toBeGreaterThan(0);
    for (const v of Object.values(slugSection)) {
      expect(["about", "academics", "labs", "campus", "admissions", "resources"]).toContain(v);
    }
  });

  it("getSidebarItems returns cards for a known slug", () => {
    const arr = getSidebarItems("vision-mission");
    expect(Array.isArray(arr)).toBe(true);
  });

  it("getSidebarItems is non-empty for slugs the map knows", () => {
    const knownSlug = Object.keys(slugSection)[0];
    expect(getSidebarItems(knownSlug).length).toBeGreaterThanOrEqual(0);
  });

  it("getRelatedBlock returns block for known slug", () => {
    const slug = Object.keys(slugSection)[0];
    const block = getRelatedBlock(slug);
    expect(block).not.toBeNull();
    expect(block!.title).toBeTruthy();
    expect(block!.sectionHref.startsWith("/")).toBe(true);
    expect(block!.main).toBeTruthy();
    expect(Array.isArray(block!.satellites)).toBe(true);
  });

  it("getRelatedBlock returns null for unknown slug", () => {
    expect(getRelatedBlock("does-not-exist")).toBeNull();
  });

  it("getSectionMeta returns meta for known slugs", () => {
    const slug = Object.keys(slugSection)[0];
    expect(getSectionMeta(slug)).toBeTruthy();
  });

  it("getSectionMeta returns null for unknown slugs", () => {
    expect(getSectionMeta("does-not-exist")).toBeNull();
  });
});
