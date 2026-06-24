import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import TrustBadges from "@/components/TrustBadges";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Icon from "@/components/Icon";
import Link from "next/link";

export const metadata = {
  title: "Accreditation",
  description:
    "Sri Sathya Sai Global School's registrations, certifications and commitments — and how to verify them.",
  alternates: { canonical: "/accreditation" },
};

const items: {
  title: string;
  body: string;
  badge: string;
  iconName: "shield" | "ribbon" | "trophy" | "scale";
  verify?: { label: string; href: string };
}[] = [
  {
    title: "SSG Registration",
    body: "Registered Private Education Institution under SSG (SkillsFuture Singapore). Registration Number 202505842W, valid 2026–2028.",
    badge: "SSG PEI",
    iconName: "shield",
    verify: {
      label: "Verify on SSG",
      href: "https://www.tpgateway.gov.sg/resources/information-for-private-education-institutions-(peis)/pei-listing",
    },
  },
  {
    title: "Statutory compliance",
    body: "Compliant with MOE / SSG requirements for private education institutions in Singapore, including fee protection, refund policy and student welfare obligations.",
    badge: "MOE / SSG",
    iconName: "scale",
  },
  {
    title: "Curriculum alignment",
    body: "Curriculum is NCERT-aligned across English, Mathematics, Science, Social Science and ICT — designed to ease transition for families moving from Indian and international systems.",
    badge: "NCERT",
    iconName: "ribbon",
  },
  {
    title: "Values-based commitment",
    body: "Operates under the Sathya Sai education framework — Sathya (Truth), Dharma (Right Conduct), Shanti (Peace), Prema (Love), Ahimsa (Non-Violence) — integrated across the school day.",
    badge: "5 Values",
    iconName: "trophy",
  },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="accreditation"
      hero={{
        eyebrow: "Trust",
        title: "Accreditation & registrations",
        lead: "Where we are accredited, what we are committed to, and how you can verify it directly with the registering body.",
        breadcrumb: [{ label: "Accreditation", href: "/accreditation" }],
      }}
      ctaTitle="Want our compliance pack?"
      ctaSubtitle="Email admissions and we'll share the documents relevant to your decision."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Accreditation", href: "/accreditation" },
        ]}
      />

      <ContentSection flush>
        <div className="mb-8">
          <TrustBadges variant="inline" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((it) => (
            <article
              key={it.title}
              className="card-fancy p-6 rounded-2xl bg-white border border-[var(--brand-rule)]"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="grid place-items-center h-11 w-11 rounded-xl text-white shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
                  }}
                  aria-hidden
                >
                  <Icon name={it.iconName} size={17} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="news-eyebrow">{it.badge}</div>
                  <h3 className="font-display text-[17px] font-bold text-[var(--brand-navy)] mt-0.5">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] text-slate-600 leading-relaxed">{it.body}</p>
                  {it.verify && (
                    <a
                      href={it.verify.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--brand-primary)] hover:underline"
                    >
                      {it.verify.label}
                      <Icon name="arrow-up-right" size={11} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-[var(--brand-cream)] border border-[var(--brand-rule)] flex items-start gap-3">
          <span
            className="grid place-items-center h-9 w-9 rounded-xl bg-white text-[var(--brand-primary)] shrink-0"
            aria-hidden
          >
            <Icon name="document" size={15} />
          </span>
          <div>
            <div className="font-bold text-[14px] text-[var(--brand-navy)]">
              Need to verify something specific?
            </div>
            <p className="text-[12.5px] text-slate-600 mt-0.5">
              We&rsquo;re happy to share signed copies of registrations and fee-protection
              arrangements on request.
            </p>
            <Link
              href="/contact-us"
              className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--brand-primary)] hover:underline"
            >
              Request the compliance pack
              <Icon name="arrow-right" size={12} />
            </Link>
          </div>
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
