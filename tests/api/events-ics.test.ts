import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/events/[slug]/ics/route";

describe("/api/events/[slug]/ics", () => {
  it("returns an ICS file for a known slug", async () => {
    const res = await GET(
      new Request("http://localhost/api/events/open-house-june-2026/ics"),
      { params: Promise.resolve({ slug: "open-house-june-2026" }) }
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/calendar");
    const text = await res.text();
    expect(text).toContain("BEGIN:VCALENDAR");
    expect(text).toContain("SUMMARY:Open House");
    expect(text).toContain("END:VCALENDAR");
  });

  it("returns 404 for unknown slug", async () => {
    const res = await GET(
      new Request("http://localhost/api/events/unknown/ics"),
      { params: Promise.resolve({ slug: "unknown" }) }
    );
    expect(res.status).toBe(404);
  });
});
