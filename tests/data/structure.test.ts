import { describe, it, expect } from "vitest";

describe("data/site", () => {
  it("exposes required brand strings", async () => {
    const { site } = await import("@/data/site");
    expect(site.name).toBeTruthy();
    expect(site.shortName).toBe("SSSGS");
    expect(site.url).toMatch(/^https:\/\//);
    expect(site.phone).toMatch(/\+65/);
    expect(site.email).toMatch(/@/);
    expect(site.social.facebook).toMatch(/^https:\/\//);
    expect(site.social.youtube).toMatch(/^https:\/\//);
  });
});

describe("data/nav", () => {
  it("exposes navigation tree", async () => {
    const { navigation, ctaInquire, ctaWhatsApp } = await import("@/data/nav");
    expect(Array.isArray(navigation)).toBe(true);
    expect(navigation.length).toBeGreaterThan(0);
    for (const item of navigation) {
      expect(item.label).toBeTruthy();
      expect(item.href.startsWith("/")).toBe(true);
      if (item.children) {
        for (const c of item.children) {
          expect(c.href.startsWith("/")).toBe(true);
        }
      }
    }
    expect(ctaInquire.label).toBeTruthy();
    expect(ctaInquire.href.startsWith("/")).toBe(true);
    expect(ctaWhatsApp.href).toMatch(/^https:\/\/wa\.me\//);
  });
});

describe("data/announcements", () => {
  it("each item has text + href", async () => {
    const { announcements } = await import("@/data/announcements");
    expect(announcements.length).toBeGreaterThan(0);
    for (const a of announcements) {
      expect(a.text).toBeTruthy();
      expect(a.href).toBeTruthy();
    }
  });
});

describe("data/events", () => {
  it("each event is well-shaped", async () => {
    const { events } = await import("@/data/events");
    expect(events.length).toBeGreaterThan(0);
    for (const e of events) {
      expect(e.slug).toBeTruthy();
      expect(e.title).toBeTruthy();
      expect(new Date(e.startsAt).toString()).not.toBe("Invalid Date");
      expect(new Date(e.endsAt).toString()).not.toBe("Invalid Date");
      expect(+new Date(e.endsAt)).toBeGreaterThanOrEqual(+new Date(e.startsAt));
      expect(["Open House", "Parent–Teacher", "Performance", "Workshop", "Holiday"]).toContain(e.type);
    }
  });
  it("slugs are unique", async () => {
    const { events } = await import("@/data/events");
    const set = new Set(events.map((e) => e.slug));
    expect(set.size).toBe(events.length);
  });
});

describe("data/news", () => {
  it("each post is well-shaped", async () => {
    const { news, NEWS_CATEGORIES } = await import("@/data/news");
    expect(news.length).toBeGreaterThan(0);
    for (const p of news) {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.excerpt).toBeTruthy();
      expect(typeof p.readMin).toBe("number");
      expect(NEWS_CATEGORIES).toContain(p.category);
    }
  });
  it("slugs are unique", async () => {
    const { news } = await import("@/data/news");
    expect(new Set(news.map((n) => n.slug)).size).toBe(news.length);
  });
});

describe("data/faculty", () => {
  it("each member has required fields", async () => {
    const { FACULTY } = await import("@/data/faculty");
    expect(FACULTY.length).toBeGreaterThan(0);
    for (const f of FACULTY) {
      expect(f.slug).toBeTruthy();
      expect(f.name).toBeTruthy();
      expect(f.role).toBeTruthy();
      expect(f.bio.length).toBeGreaterThan(0);
      expect(Array.isArray(f.qualifications)).toBe(true);
    }
  });
});

describe("data/subjects", () => {
  it("each subject has three grade bands", async () => {
    const { SUBJECTS } = await import("@/data/subjects");
    expect(SUBJECTS.length).toBe(9);
    for (const s of SUBJECTS) {
      expect(s.bands.length).toBe(3);
      expect(s.bands.map((b) => b.label)).toEqual(["Foundations", "Build", "Depth"]);
      for (const b of s.bands) {
        expect(b.outcomes.length).toBeGreaterThan(0);
      }
    }
  });
  it("ids are unique", async () => {
    const { SUBJECTS } = await import("@/data/subjects");
    expect(new Set(SUBJECTS.map((s) => s.id)).size).toBe(SUBJECTS.length);
  });
});

describe("data/sections", () => {
  it("home hero and satellites validate", async () => {
    const { homeHero, homeHeroSatellites, homeSections } = await import("@/data/sections");
    expect(homeHero.image?.startsWith("/")).toBe(true);
    expect(homeHero.href).toBeTruthy();
    expect(homeHeroSatellites.length).toBeGreaterThan(0);
    for (const c of homeHeroSatellites) {
      expect(c.image?.startsWith("/img/")).toBe(true);
      expect(c.href?.startsWith("/")).toBe(true);
    }
    for (const sec of homeSections) {
      expect(sec.main.image?.startsWith("/img/")).toBe(true);
      for (const s of sec.satellites) {
        expect(s.image?.startsWith("/img/")).toBe(true);
      }
    }
  });
});

describe("data/search-index", () => {
  it("each entry has title, href, section", async () => {
    const { searchIndex } = await import("@/data/search-index");
    expect(searchIndex.length).toBeGreaterThan(20);
    for (const e of searchIndex) {
      expect(e.title).toBeTruthy();
      expect(e.href.startsWith("/")).toBe(true);
      expect(e.section).toBeTruthy();
    }
  });
});

describe("data/simplePages", () => {
  it("each entry has eyebrow / title / breadcrumb", async () => {
    const { simplePages } = await import("@/data/simplePages");
    for (const key of Object.keys(simplePages)) {
      const p = simplePages[key];
      expect(p.eyebrow).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(Array.isArray(p.breadcrumb)).toBe(true);
    }
  });
});

describe("data/relatedBySection", () => {
  it("exposes sectionMeta map", async () => {
    const { sectionMeta } = await import("@/data/relatedBySection");
    const keys = Object.keys(sectionMeta);
    expect(keys.length).toBeGreaterThan(0);
    for (const k of keys) {
      const m = sectionMeta[k as keyof typeof sectionMeta];
      expect(m.label).toBeTruthy();
      expect(m.href.startsWith("/")).toBe(true);
      expect(m.cta).toBeTruthy();
    }
  });
});
