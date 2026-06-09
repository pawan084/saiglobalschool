import Link from "next/link";
import { notFound } from "next/navigation";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CourseJsonLd from "@/components/CourseJsonLd";
import Icon from "@/components/Icon";
import { SUBJECTS } from "@/data/subjects";

export async function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const sub = SUBJECTS.find((s) => s.id === subject);
  if (!sub) return { title: "Subject not found" };
  return {
    title: `${sub.name} curriculum`,
    description: sub.blurb,
    alternates: { canonical: `/curriculum/${subject}` },
    openGraph: { title: `${sub.name} at SSSGS`, description: sub.blurb },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const sub = SUBJECTS.find((s) => s.id === subject);
  if (!sub) notFound();

  return (
    <InnerPageShell
      slug="curriculum"
      hero={{
        eyebrow: `Curriculum · ${sub.name}`,
        title: `${sub.name} at SSSGS`,
        lead: sub.blurb,
        breadcrumb: [
          { label: "Academics", href: "/academics" },
          { label: "Curriculum", href: "/curriculum" },
          { label: sub.name, href: `/curriculum/${sub.id}` },
        ],
      }}
      ctaTitle={`See ${sub.name} in action`}
      ctaSubtitle="Book a campus tour and sit in on a class."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Curriculum", href: "/curriculum" },
          { label: sub.name, href: `/curriculum/${sub.id}` },
        ]}
      />
      <CourseJsonLd
        name={`${sub.name} — Primary and middle school`}
        description={sub.intro.replace(/&rsquo;/g, "'")}
        path={`/curriculum/${sub.id}`}
        grades="Primary and middle school"
      />

      {/* Subject switcher — horizontal scroll on small/medium, wrap on large.
          Below `lg` the 9 pills overflowed onto 2-3 rows; this keeps them in
          a single tidy row with momentum-scrolling and edge fades so the user
          can still see all subjects without the noisy multi-row layout. */}
      <ContentSection flush>
        <div className="relative mb-6">
          <nav
            aria-label="All subjects"
            className="flex gap-1.5 p-1.5 rounded-2xl bg-[var(--brand-cream)] border border-[var(--brand-rule)] overflow-x-auto lg:flex-wrap lg:overflow-visible scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
            {SUBJECTS.map((s) => {
              const active = s.id === sub.id;
              return (
                <Link
                  key={s.id}
                  href={`/curriculum/${s.id}`}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 snap-start inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12.5px] font-bold whitespace-nowrap transition ${
                    active
                      ? "bg-[var(--brand-navy)] text-white"
                      : "bg-white border border-[var(--brand-rule)] text-slate-600 hover:border-[var(--brand-primary)] hover:text-[var(--brand-navy)]"
                  }`}
                >
                  <Icon name={s.icon} size={12} />
                  {s.name}
                </Link>
              );
            })}
          </nav>
          {/* Edge fades only when scrollable (below lg). Hidden on desktop where
              the row wraps. Decorative; pointer-events disabled. */}
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[var(--brand-cream)] to-transparent lg:hidden" />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[var(--brand-cream)] to-transparent lg:hidden" />
        </div>

        {/* Intro */}
        <div className="rounded-2xl bg-white border border-[var(--brand-rule)] p-6 lg:p-7 mb-6" style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="flex items-start gap-4">
            <span
              className="grid place-items-center h-12 w-12 rounded-xl text-white shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
              }}
              aria-hidden
            >
              <Icon name={sub.icon} size={20} />
            </span>
            <div>
              <div className="news-eyebrow">Overview</div>
              <h2 className="font-display text-[22px] lg:text-[26px] font-bold text-[var(--brand-navy)] tracking-tight">
                What we teach in {sub.name}
              </h2>
              <p className="mt-2 text-[14.5px] text-slate-700 leading-relaxed">
                {sub.intro.replace(/&rsquo;/g, "'")}
              </p>
            </div>
          </div>
        </div>

        {/* Three bands */}
        <div className="grid md:grid-cols-3 gap-3">
          {sub.bands.map((b, i) => {
            const tone =
              i === 0
                ? "from-[var(--brand-primary)] to-[var(--brand-primary-dark)]"
                : i === 1
                ? "from-[var(--brand-accent)] to-[var(--brand-accent-dark)]"
                : "from-[var(--brand-navy)] to-[#1e293b]";
            return (
              <article
                key={b.band}
                className="relative overflow-hidden rounded-2xl border border-[var(--brand-rule)] bg-white"
                style={{ boxShadow: "var(--shadow-xs)" }}
              >
                <div className={`bg-gradient-to-br ${tone} text-white p-4`}>
                  <div className="text-[10.5px] font-bold uppercase tracking-[0.16em] opacity-85">
                    {b.label}
                  </div>
                  <div className="font-display text-[20px] font-bold leading-tight mt-0.5">
                    {b.band}
                  </div>
                </div>
                <ul className="p-4 space-y-2 text-[13.5px] text-slate-700 leading-snug">
                  {b.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2">
                      <Icon
                        name="check"
                        size={12}
                        className="mt-1 text-[var(--brand-primary)] shrink-0"
                      />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Notes */}
        {sub.notes.length > 0 && (
          <div className="mt-6 p-5 rounded-2xl border border-[var(--brand-rule)] bg-[var(--brand-cream)]/50">
            <div className="news-eyebrow">Worth knowing</div>
            <ul className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[13.5px] text-slate-700">
              {sub.notes.map((n) => (
                <li key={n} className="flex items-start gap-2">
                  <Icon name="sparkle" size={11} className="mt-1 text-[var(--brand-accent)] shrink-0" />
                  <span>{n.replace(/&rsquo;/g, "'")}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ContentSection>
    </InnerPageShell>
  );
}
