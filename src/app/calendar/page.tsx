import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Icon from "@/components/Icon";
import { events } from "@/data/events";
import { buildTimeNow } from "@/lib/clock";

export const revalidate = 3600;

export const metadata = {
  title: "School Calendar",
  description: "Academic year calendar with terms, public holidays and upcoming events at SSSGS Singapore.",
  alternates: { canonical: "/calendar" },
};

type Term = {
  id: string;
  name: string;
  start: string; // ISO
  end: string;   // ISO
  note: string;
};

const TERMS_2026: Term[] = [
  { id: "t1", name: "Term 1", start: "2026-01-06", end: "2026-03-13", note: "Reopening, orientation week, mid-term review" },
  { id: "t2", name: "Term 2", start: "2026-03-30", end: "2026-06-05", note: "Project work, mid-year assessments" },
  { id: "t3", name: "Term 3", start: "2026-06-29", end: "2026-09-04", note: "Sports day, parent–teacher meetings, mid-term assessments" },
  { id: "t4", name: "Term 4", start: "2026-09-21", end: "2026-12-04", note: "Annual day, finals, term-end break in late December" },
];

const HOLIDAYS_2026: { date: string; name: string }[] = [
  { date: "2026-01-01", name: "New Year's Day" },
  { date: "2026-02-17", name: "Chinese New Year" },
  { date: "2026-02-18", name: "Chinese New Year (2nd day)" },
  { date: "2026-03-21", name: "Hari Raya Puasa" },
  { date: "2026-04-03", name: "Good Friday" },
  { date: "2026-05-01", name: "Labour Day" },
  { date: "2026-05-27", name: "Vesak Day" },
  { date: "2026-05-28", name: "Hari Raya Haji" },
  { date: "2026-08-09", name: "National Day (Singapore)" },
  { date: "2026-11-09", name: "Deepavali" },
  { date: "2026-12-25", name: "Christmas Day" },
];

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function dayOfYear(iso: string): number {
  // A date-only ISO string ("2026-01-06") parses as UTC midnight, so compute the
  // year start in UTC too — mixing a UTC instant with a local-time `new Date(y,0,0)`
  // shifts every marker by a day on non-UTC hosts.
  const d = new Date(iso);
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  return Math.floor((d.getTime() - start) / 86400000);
}

function fmtRange(start: string, end: string) {
  const s = new Date(start), e = new Date(end);
  return `${s.toLocaleDateString("en-SG", { day: "numeric", month: "short" })} – ${e.toLocaleDateString("en-SG", { day: "numeric", month: "short" })}`;
}

function fmtDay(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", { day: "numeric", month: "short" });
}

const TOTAL = 365;
const TERM_TONE: Record<string, string> = {
  t1: "from-[var(--brand-primary)] to-[var(--brand-primary-dark)]",
  t2: "from-[var(--brand-accent)] to-[var(--brand-accent-dark)]",
  t3: "from-[var(--brand-primary)] to-[var(--brand-primary-dark)]",
  t4: "from-[var(--brand-navy)] to-[#1e293b]",
};

export default function Page() {
  const upcoming = events
    .filter((e) => +new Date(e.endsAt) >= buildTimeNow())
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt))
    .slice(0, 5);

  return (
    <InnerPageShell
      slug="calendar"
      showRelated={false}
      hero={{
        eyebrow: "Resources",
        title: "School Calendar",
        lead: "Academic year at a glance — terms, holidays and the events coming up next.",
        breadcrumb: [
          { label: "Resources", href: "/resources" },
          { label: "Calendar", href: "/calendar" },
        ],
      }}
      ctaTitle="Have an event question?"
      ctaSubtitle="WhatsApp our admissions team — we'll confirm the latest schedule."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Calendar", href: "/calendar" },
        ]}
      />

      {/* Year ribbon visualization */}
      <ContentSection flush eyebrow="Academic year 2026" title="Terms at a glance">
        <p className="text-slate-600 text-[14.5px] mb-5 max-w-2xl">
          Four terms across the calendar year, with breaks in between. Term-end dates are
          indicative — confirmed dates published in the holiday list each year.
        </p>

        <div
          className="rounded-2xl bg-white border border-[var(--brand-rule)] p-5 lg:p-6 overflow-hidden"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          {/* Month labels */}
          <div className="relative h-5 mb-2">
            {MONTH_NAMES.map((m, i) => {
              const left = MONTH_DAYS.slice(0, i).reduce((s, d) => s + d, 0) / TOTAL * 100;
              return (
                <span
                  key={m}
                  className="absolute top-0 text-[10.5px] uppercase tracking-[0.14em] font-bold text-slate-500"
                  style={{ left: `${left}%` }}
                >
                  {m}
                </span>
              );
            })}
          </div>

          {/* Ribbon */}
          <div className="relative h-9 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden">
            {/* Month dividers */}
            {MONTH_NAMES.map((_, i) => {
              const left = MONTH_DAYS.slice(0, i + 1).reduce((s, d) => s + d, 0) / TOTAL * 100;
              return (
                <span
                  key={i}
                  aria-hidden
                  className="absolute top-0 bottom-0 w-px bg-slate-200"
                  style={{ left: `${left}%` }}
                />
              );
            })}
            {/* Term blocks */}
            {TERMS_2026.map((t) => {
              const startPct = dayOfYear(t.start) / TOTAL * 100;
              const widthPct = (dayOfYear(t.end) - dayOfYear(t.start)) / TOTAL * 100;
              return (
                <div
                  key={t.id}
                  className={`absolute top-0 bottom-0 bg-gradient-to-r ${TERM_TONE[t.id]} text-white grid place-items-center text-[10.5px] font-bold uppercase tracking-[0.14em] overflow-hidden`}
                  style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                  title={`${t.name}: ${fmtRange(t.start, t.end)}`}
                >
                  <span className="truncate px-1">{t.name}</span>
                </div>
              );
            })}
            {/* Holiday markers (pixels at exact day) */}
            {HOLIDAYS_2026.map((h) => {
              const left = dayOfYear(h.date) / TOTAL * 100;
              return (
                <span
                  key={h.date + h.name}
                  className="absolute top-0 bottom-0 w-[2px] bg-rose-500/90"
                  style={{ left: `${left}%` }}
                  title={`${fmtDay(h.date)} — ${h.name}`}
                />
              );
            })}
          </div>

          {/* Today marker */}
          <TodayMarker />
        </div>

        {/* Term cards */}
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TERMS_2026.map((t) => (
            <article
              key={t.id}
              className="rounded-2xl border border-[var(--brand-rule)] bg-white overflow-hidden"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              <div className={`bg-gradient-to-br ${TERM_TONE[t.id]} text-white p-4`}>
                <div className="text-[10.5px] uppercase tracking-[0.16em] font-bold opacity-85">
                  Academic Term
                </div>
                <div className="font-display text-[20px] font-bold leading-tight mt-0.5">
                  {t.name}
                </div>
                <div className="mt-1 text-[12px] text-white/85">
                  {fmtRange(t.start, t.end)}
                </div>
              </div>
              <div className="p-4 text-[13.5px] text-slate-700 leading-relaxed">{t.note}</div>
            </article>
          ))}
        </div>
      </ContentSection>

      {/* Upcoming events strip */}
      {upcoming.length > 0 && (
        <ContentSection flush tone="cream" eyebrow="Coming up" title="Next on the calendar">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {upcoming.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/events/${e.slug}`}
                  className="card-fancy block p-4 rounded-2xl bg-white border border-[var(--brand-rule)] group"
                  style={{ boxShadow: "var(--shadow-xs)" }}
                >
                  <div className="news-eyebrow">{e.type}</div>
                  <div className="font-display font-bold text-[15px] text-[var(--brand-navy)] mt-1 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                    {e.title}
                  </div>
                  <div className="mt-2 text-[11.5px] text-slate-500 inline-flex items-center gap-1.5">
                    <Icon name="calendar" size={10} />
                    {fmtDay(e.startsAt)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link href="/events" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--brand-primary)] hover:underline">
              See all events
              <Icon name="arrow-right" size={12} />
            </Link>
          </div>
        </ContentSection>
      )}

      {/* Holidays list */}
      <ContentSection flush eyebrow="Days off" title="Public & school holidays 2026">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {HOLIDAYS_2026.map((h) => (
            <div
              key={h.date + h.name}
              className="p-3 bg-white border border-[var(--brand-rule)] rounded-xl flex items-center gap-3"
            >
              <span className="grid place-items-center h-10 w-10 rounded-lg bg-rose-50 text-rose-700 shrink-0">
                <Icon name="calendar" size={14} />
              </span>
              <div>
                <div className="text-[10.5px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
                  {fmtDay(h.date)}
                </div>
                <div className="mt-0.5 font-bold text-[var(--brand-navy)] text-[13.5px]">{h.name}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[12px] text-slate-500">
          Movable holidays follow gazetted Singapore public holidays. School-specific dates may be
          published as supplementary.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/_files/ugd/School Holiday List_2026_KIS.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-4 text-[12.5px]"
          >
            <Icon name="document" size={12} />
            Download holiday list PDF
          </Link>
          <Link href="/events" className="btn-secondary !py-2 !px-4 text-[12.5px]">
            All upcoming events
            <Icon name="arrow-right" size={12} />
          </Link>
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}

// Tiny client island that adds a "Today" marker on the ribbon if the year matches.
function TodayMarker() {
  return (
    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500" /> Public holiday
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-4 rounded bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-dark)]" /> Term
        </span>
      </div>
      <div className="font-mono text-[10.5px] text-slate-400">Year 2026</div>
    </div>
  );
}
