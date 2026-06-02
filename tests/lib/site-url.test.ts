import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("site-url", () => {
  const originalEnv = { ...process.env };
  beforeEach(() => {
    vi.resetModules();
  });
  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("defaults SITE_URL when env is unset", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const { SITE_URL } = await import("@/lib/site-url");
    expect(SITE_URL).toBe("https://www.srisathyasaiglobalschool-sg.com");
  });

  it("uses NEXT_PUBLIC_SITE_URL when set", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://staging.example.com";
    const { SITE_URL } = await import("@/lib/site-url");
    expect(SITE_URL).toBe("https://staging.example.com");
  });

  it("strips trailing slash from env URL", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://x.com/";
    const { SITE_URL } = await import("@/lib/site-url");
    expect(SITE_URL).toBe("https://x.com");
  });

  describe("abs()", () => {
    it("returns SITE_URL for empty/undefined path", async () => {
      const { abs, SITE_URL } = await import("@/lib/site-url");
      expect(abs("")).toBe(SITE_URL);
    });

    it("passes through absolute http URLs", async () => {
      const { abs } = await import("@/lib/site-url");
      expect(abs("https://other.com/foo")).toBe("https://other.com/foo");
      expect(abs("http://x.com")).toBe("http://x.com");
    });

    it("prefixes leading-slash paths", async () => {
      const { abs, SITE_URL } = await import("@/lib/site-url");
      expect(abs("/about-us")).toBe(`${SITE_URL}/about-us`);
    });

    it("normalises paths missing the leading slash", async () => {
      const { abs, SITE_URL } = await import("@/lib/site-url");
      expect(abs("contact")).toBe(`${SITE_URL}/contact`);
    });
  });
});
