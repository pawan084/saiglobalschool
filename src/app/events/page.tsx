import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Icon from "@/components/Icon";
import { events } from "@/data/events";
import { SITE_URL } from "@/lib/site-url";
import { buildTimeNow } from "@/lib/clock";

// Keep "upcoming" reasonably fresh between deploys (re-render hourly).
export const revalidate = 3600;

export const metadata = {
  title: "Events",
  description:
    "Open houses, parent–teacher meetings, performances, workshops and holidays at SSSGS.",
  alternates: { canonical: "/events" },
};

function fmt(iso: string, withTime = false) {
  const d = new Date(iso);
  if (withTime) {
    return d.toLocaleString("en-SG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return d.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });
}

function icsUrl(e: (typeof events)[number]) {
  return `/api/events/${e.slug}/ics`;
}

const TONE: Record<string, string> = {
  "Open House": "bg-[var(--brand-primary-tint)] text-[var(--brand-primary-dark)]",
  "Parent–Teacher": "bg-[var(--brand-cream)] text-[var(--brand-navy)]",
  Performance: "bg-amber-50 text-amber-800",
  Workshop: "bg-sky-50 text-sky-800",
  Holiday: "bg-rose-50 text-rose-700",
};

export default function Page() {
  const upcoming = events
    .filter((e) => +new Date(e.endsAt) >= buildTimeNow())
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));

  const jsonLd = upcoming.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.startsAt,
    endDate: e.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.location,
      address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
    },
    organizer: { "@type": "Organization", name: "Sri Sathya Sai Global School", url: SITE_URL },
    description: e.excerpt,
  }));

  return (
    <InnerPageShell
      slug="resources"
      hero={{
        eyebrow: "Resources",
        title: "Events",
        lead: "What&rsquo;s next at SSSGS. RSVP for what interests you and add it straight to your calendar.",
        breadcrumb: [
          { label: "Resources", href: "/resources" },
          { label: "Events", href: "/events" },
        ],
      }}
      ctaTitle="Hosting a partner event?"
      ctaSubtitle="Get in touch to share details with the SSSGS community."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Events", href: "/events" },
        ]}
      />
      {jsonLd.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(d).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      <ContentSection flush>
        <ul className="space-y-3">
          {upcoming.map((e) => (
            <li
              key={e.slug}
              className="rounded-2xl bg-white border border-[var(--brand-rule)] p-5 lg:p-6 grid sm:grid-cols-[120px_minmax(0,1fr)_auto] gap-4 items-center"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              {/* Date card */}
              <div className="rounded-xl bg-[var(--brand-navy)] text-white text-center px-3 py-3 sm:py-4">
                <div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
                  {new Date(e.startsAt).toLocaleString("en-SG", { month: "short" })}
                </div>
                <div className="font-display text-[28px] font-bold leading-none mt-0.5">
                  {new Date(e.startsAt).getDate()}
                </div>
                <div className="mt-1 text-[10.5px] text-white/70">
                  {new Date(e.startsAt).getFullYear()}
                </div>
              </div>

              <div>
                <span className={`inline-block text-[10.5px] uppercase tracking-[0.14em] font-bold px-2 py-0.5 rounded-full ${TONE[e.type] || "bg-slate-100 text-slate-700"}`}>
                  {e.type}
                </span>
                <h3 className="font-display text-[18px] lg:text-[20px] font-bold text-[var(--brand-navy)] mt-1.5 leading-snug">
                  {e.title}
                </h3>
                <p className="mt-1 text-[13px] text-slate-600 leading-snug">{e.excerpt}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="clock" size={11} />
                    {fmt(e.startsAt, true)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="map-pin" size={11} />
                    {e.location}
                  </span>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2">
                <Link
                  href={`/inquire-book-a-tour?event=${e.slug}`}
                  className="btn-primary !py-2 !px-4 text-[12.5px] justify-center"
                >
                  RSVP
                  <Icon name="arrow-right" size={12} />
                </Link>
                <a
                  href={icsUrl(e)}
                  className="btn-secondary !py-2 !px-4 text-[12.5px] justify-center"
                >
                  <Icon name="calendar" size={12} />
                  .ics
                </a>
              </div>
            </li>
          ))}
        </ul>

        {upcoming.length === 0 && (
          <div className="rounded-2xl border border-[var(--brand-rule)] bg-white p-8 text-center text-slate-500">
            No upcoming events scheduled — check back soon.
          </div>
        )}
      </ContentSection>
    </InnerPageShell>
  );
}
