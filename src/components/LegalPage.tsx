import PageHero from "./PageHero";
import CTAStrip from "./CTAStrip";
import RevealOnScroll from "./RevealOnScroll";
import BreadcrumbJsonLd from "./BreadcrumbJsonLd";
import Link from "next/link";

export type LegalSection = {
  id: string;
  heading: string;
  body: React.ReactNode;
};

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
  breadcrumb: { label: string; href: string }[];
};

export default function LegalPage({
  eyebrow,
  title,
  lead,
  updated,
  sections,
  breadcrumb,
}: Props) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Home", href: "/" }, ...breadcrumb]} />
      <PageHero eyebrow={eyebrow} title={title} lead={lead} breadcrumb={breadcrumb} tone="cream" />

      <div className="section-shell py-10 lg:py-12 grid lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
        {/* TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <div className="text-[11px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)] mb-2">
              On this page
            </div>
            <ol className="space-y-1.5">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block text-[13px] text-slate-600 hover:text-[var(--brand-primary)] transition py-0.5"
                  >
                    <span className="font-mono text-[11px] text-slate-400 mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-5 pt-4 border-t border-[var(--brand-rule)] text-[11.5px] text-slate-500">
              Last updated{" "}
              <span className="font-bold text-[var(--brand-navy)]">{updated}</span>
            </div>
          </div>
        </aside>

        {/* Content */}
        <RevealOnScroll>
          <article className="prose-legal max-w-none">
            <div className="lg:hidden mb-6 text-[12px] text-slate-500">
              Last updated{" "}
              <span className="font-bold text-[var(--brand-navy)]">{updated}</span>
            </div>
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-24 pb-7 mb-7 border-b border-[var(--brand-rule)] last:border-0 last:mb-0"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-[12px] text-[var(--brand-accent)] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-[22px] lg:text-[26px] font-bold text-[var(--brand-navy)] tracking-tight">
                    {s.heading}
                  </h2>
                </div>
                <div className="text-[15px] text-slate-700 leading-relaxed space-y-3 [&_a]:text-[var(--brand-primary)] [&_a]:font-bold [&_a:hover]:underline [&_strong]:text-[var(--brand-navy)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:marker:text-[var(--brand-accent)]">
                  {s.body}
                </div>
              </section>
            ))}

            <div className="mt-8 p-5 rounded-2xl bg-[var(--brand-cream)] border border-[var(--brand-rule)]">
              <div className="font-display text-[16px] font-bold text-[var(--brand-navy)] mb-1">
                Questions about this policy?
              </div>
              <p className="text-[13.5px] text-slate-600 mb-3">
                Get in touch with our admissions or data protection contact.
              </p>
              <Link href="/contact-us" className="btn-secondary !py-2 !px-4 text-[13px]">
                Contact us →
              </Link>
            </div>
          </article>
        </RevealOnScroll>
      </div>

      <CTAStrip title="Have a question?" subtitle="We respond within one business day — by email, WhatsApp or phone." />
    </>
  );
}
