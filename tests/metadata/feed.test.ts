import { describe, it, expect } from "vitest";
import { GET } from "@/app/feed.xml/route";

describe("/feed.xml", () => {
  it("returns valid RSS XML", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/rss+xml");
    const body = await res.text();
    expect(body).toContain('<?xml version="1.0"');
    expect(body).toContain("<rss");
    expect(body).toContain("<channel>");
    expect(body).toContain("<item>");
    expect(body).toContain("Sri Sathya Sai Global School");
  });
});
