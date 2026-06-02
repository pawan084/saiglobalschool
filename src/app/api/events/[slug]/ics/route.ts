import { events } from "@/data/events";
import { SITE_URL } from "@/lib/site-url";

function ts(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;
  const event = events.find((e) => e.slug === slug);
  if (!event) {
    return new Response("Not found", { status: 404 });
  }

  const uid = `${event.slug}@srisathyasaiglobalschool-sg.com`;
  const dtStamp = ts(new Date().toISOString());
  const dtStart = ts(event.startsAt);
  const dtEnd = ts(event.endsAt);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SSSGS//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.title.replace(/\n/g, " ")}`,
    `DESCRIPTION:${event.excerpt.replace(/\n/g, " ")}\\nMore: ${SITE_URL}/events`,
    `LOCATION:${event.location}`,
    `URL:${SITE_URL}/events`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(lines.join("\r\n"), {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": `attachment; filename="${slug}.ics"`,
      "cache-control": "public, max-age=600",
    },
  });
}
