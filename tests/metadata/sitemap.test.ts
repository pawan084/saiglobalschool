import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import manifest from "@/app/manifest";

describe("sitemap", () => {
  const entries = sitemap();
  it("returns many entries", () => {
    expect(entries.length).toBeGreaterThan(40);
  });
  it("home entry has the highest priority", () => {
    // Home URL is the SITE_URL with no trailing path
    const home = entries.find((e) => /sg\.com\/?$/.test(e.url));
    expect(home).toBeTruthy();
    expect(home?.priority).toBe(1.0);
  });
  it("every entry has url + lastModified", () => {
    for (const e of entries) {
      expect(e.url).toMatch(/^https:\/\//);
      expect(e.lastModified).toBeInstanceOf(Date);
    }
  });
});

describe("robots", () => {
  it("returns a sitemap URL and rules", () => {
    const r = robots();
    expect(r.sitemap).toContain("/sitemap.xml");
    expect(r.rules).toBeTruthy();
  });
});

describe("manifest", () => {
  it("contains brand info", () => {
    const m = manifest();
    expect(m.name).toMatch(/sri sathya sai/i);
    expect(m.short_name).toBe("SSSGS");
    expect(m.start_url).toBe("/");
    expect(m.theme_color).toBe("#0d8a87");
    expect(Array.isArray(m.icons)).toBe(true);
  });
});
