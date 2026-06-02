import Link from "next/link";
import { notFound } from "next/navigation";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";
import EventRsvpForm from "./EventRsvpForm";
import { events } from "@/data/events";
import { SITE_URL } from "@/lib/site-url";

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ev = events.find((e) => e.slug === slug);
  if (!ev) return { title: "Event not found" };
  return {
    title: ev.title,
    description: ev.excerpt,
    alternates: { canonical: `/events/${slug}` },
    openGraph: {
      title: ev.title,
      description: ev.excerpt,
      type: "article",
      publishedTime: ev.startsAt,
    },
  };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-SG", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const TONE: Record<string, string> = {
  "Open House": "bg-[var(--brand-primary-tint)] text-[var(--brand-primary-dark)]",
  "Parent–Teacher": "bg-[var(--brand-cream)] text-[var(--brand-navy)]",
  Performance: "bg-amber-50 text-amber-800",
  Workshop: "bg-sky-50 text-sky-800",
  Holiday: "bg-rose-50 text-rose-700",
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ev = events.find((e) => e.slug === slug);
  if (!ev) notFound();

  const startD = new Date(ev.startsAt);
  const endD = new Date(ev.endsAt);
  const sameDay = startD.toDateString() === endD.toDateString();
  const upcoming = +endD > Date.now();

  const related = events
    .filter((e) => e.slug !== slug && +new Date(e.endsAt) > Date.now())
    .slice(0, 3);

  return (
    <InnerPageShell
      slug="resources"
      hero={{
        eyebrow: ev.type,
        title: ev.title,
        lead: ev.excerpt,
        breadcrumb: [
          { label: "Resources", href: "/resources" },
          { label: "Events", href: "/events" },
          { label: ev.title, href: `/events/${slug}` },
        ],
      }}
      ctaTitle="Other events coming up?"
      ctaSubtitle="See the full calendar of open houses, workshops and performances."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Events", href: "/events" },
          { label: ev.title, href: `/events/${slug}` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: ev.title,
          startDate: ev.startsAt,
          endDate: ev.endsAt,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: ev.location,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Singapore",
              addressCountry: "SG",
            },
          },
          organizer: {
            "@type": "Organization",
            name: "Sri Sathya Sai Global School",
            url: SITE_URL,
          },
          description: ev.excerpt,
          image: `${SITE_URL}/opengraph-image`,
        }}
      />

      <ContentSection flush>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-6 lg:gap-8">
          {/* Main */}
          <div className="space-y-5">
            <div
              className="rounded-2xl bg-white border border-[var(--brand-rule)] p-6 lg:p-7"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <span
                className={`inline-block text-[10.5px] uppercase tracking-[0.14em] font-bold px-2 py-0.5 rounded-full ${
                  TONE[ev.type] || "bg-slate-100 text-slate-700"
                }`}
              >
                {ev.type}
              </span>
              <h2 className="font-display text-[22px] lg:text-[26px] font-bold text-[var(--brand-navy)] mt-2 tracking-tight">
                When & where
              </h2>
              <dl className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-4 text-[14px]">
                <div className="flex items-start gap-3">
                  <span
                    className="grid place-items-center h-9 w-9 rounded-xl bg-[var(--brand-primary-tint)] text-[var(--brand-primary-dark)] shrink-0"
                    aria-hidden
                  >
                    <Icon name="calendar" size={14} />
                  </span>
                  <div>
                    <dt className="text-[10.5px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
                      Date
                    </dt>
                    <dd className="text-[var(--brand-navy)] font-bold">
                      {fmtDate(ev.startsAt)}
                      {!sameDay && (
                        <>
                          <br />
                          to {fmtDate(ev.endsAt)}
                        </>
                      )}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span
                    className="grid place-items-center h-9 w-9 rounded-xl bg-[var(--brand-primary-tint)] text-[var(--brand-primary-dark)] shrink-0"
                    aria-hidden
                  >
                    <Icon name="clock" size={14} />
                  </span>
                  <div>
                    <dt className="text-[10.5px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
                      Time
                    </dt>
                    <dd className="text-[var(--brand-navy)] font-bold">
                      {ev.type === "Holiday"
                        ? "All day"
                        : `${fmtTime(ev.startsAt)}–${fmtTime(ev.endsAt)} SGT`}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:col-span-2">
                  <span
                    className="grid place-items-center h-9 w-9 rounded-xl bg-[var(--brand-primary-tint)] text-[var(--brand-primary-dark)] shrink-0"
                    aria-hidden
                  >
                    <Icon name="map-pin" size={14} />
                  </span>
                  <div>
                    <dt className="text-[10.5px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
                      Location
                    </dt>
                    <dd className="text-[var(--brand-navy)] font-bold">{ev.location}</dd>
                    <Link
                      href="/campus-address"
                      className="text-[12px] text-[var(--brand-primary)] hover:underline font-bold"
                    >
                      Directions →
                    </Link>
                  </div>
                </div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={`/api/events/${slug}/ics`}
                  className="btn-secondary !py-2 !px-4 text-[12.5px]"
                >
                  <Icon name="calendar" size={12} />
                  Add to calendar (.ics)
                </a>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-1.5 text-[12.5px] text-slate-600 hover:text-[var(--brand-primary)] px-4 py-2"
                >
                  <Icon name="arrow-left" size={12} />
                  Back to all events
                </Link>
              </div>
            </div>

            <div
              className="rounded-2xl bg-white border border-[var(--brand-rule)] p-6 lg:p-7"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div className="news-eyebrow">What to expect</div>
              <h2 className="font-display text-[22px] font-bold text-[var(--brand-navy)] mt-1 tracking-tight">
                About this {ev.type.toLowerCase()}
              </h2>
              <p className="mt-3 text-[14.5px] text-slate-700 leading-relaxed">
                {ev.excerpt}
              </p>
              {ev.type === "Open House" && (
                <ul className="mt-4 space-y-1.5 text-[13.5px] text-slate-700">
                  <li className="flex items-start gap-2">
                    <Icon name="check" size={13} className="mt-0.5 text-[var(--brand-primary)] shrink-0" />
                    Tour the labs (ICT, language, maths, science)
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="check" size={13} className="mt-0.5 text-[var(--brand-primary)] shrink-0" />
                    Sit in on a sample class for your child&rsquo;s grade
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="check" size={13} className="mt-0.5 text-[var(--brand-primary)] shrink-0" />
                    Meet teachers and current parents
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="check" size={13} className="mt-0.5 text-[var(--brand-primary)] shrink-0" />
                    Q&A with the admissions team
                  </li>
                </ul>
              )}
            </div>

            {related.length > 0 && (
              <div>
                <div className="news-eyebrow mb-2">Also coming up</div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/events/${r.slug}`}
                      className="card-fancy block p-4 rounded-2xl bg-white border border-[var(--brand-rule)]"
                      style={{ boxShadow: "var(--shadow-xs)" }}
                    >
                      <div className="news-eyebrow">{r.type}</div>
                      <div className="font-display font-bold text-[15px] text-[var(--brand-navy)] mt-1 leading-snug">
                        {r.title}
                      </div>
                      <div className="mt-2 text-[11.5px] text-slate-500">
                        {fmtDate(r.startsAt)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RSVP side */}
          <aside className="lg:sticky lg:top-28 self-start">
            {upcoming ? (
              <EventRsvpForm slug={slug} title={ev.title} />
            ) : (
              <div className="rounded-2xl bg-[var(--brand-cream)] border border-[var(--brand-rule)] p-5 text-center">
                <div className="news-eyebrow">Past event</div>
                <h3 className="font-display text-[17px] font-bold text-[var(--brand-navy)] mt-1">
                  This event has ended
                </h3>
                <Link
                  href="/events"
                  className="mt-3 btn-secondary !py-2 !px-4 text-[13px] inline-flex"
                >
                  See upcoming events
                </Link>
              </div>
            )}
          </aside>
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
