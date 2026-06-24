import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import Link from "next/link";

export const metadata = {
  title: "Registration",
  description: "Registration details for Sri Sathya Sai Global School — an SSG (SkillsFuture Singapore)-registered Private Education Institution (PEI) in Singapore. Reg. No. 202505842W.",
  alternates: { canonical: "/registration" },
};

const facts = [
  { iconName: "credit-card", title: "Registration Number", body: "202505842W" },
  { iconName: "calendar", title: "Period of Registration", body: "2026 – 2028" },
  { iconName: "school", title: "Status", body: "Registered PEI (Private Education Institution) in Singapore" },
  { iconName: "users", title: "Teacher–Student Ratio", body: "Maximum: 1:20" },
];

const documents = [
  "Child's birth certificate",
  "Parent / guardian NRIC or passport",
  "Most recent school report (last 2 terms)",
  "Transfer certificate from prior school (if applicable)",
  "2 recent passport-size photographs of child",
  "Vaccination records",
];

export default function Page() {
  return (
    <InnerPageShell
      slug="registration"
      hero={{
        eyebrow: "Admissions",
        title: "Registration & PEI status",
        lead: "Sri Sathya Sai Global School is a registered Private Education Institution (PEI) in Singapore — current registration period is 2026 – 2028.",
        breadcrumb: [
          { label: "Admissions", href: "/admissions" },
          { label: "Registration", href: "/registration" },
        ],
      }}
    >
      <ContentSection flush eyebrow="School at a glance" title="Registration & operational details">
        <FeatureGrid items={facts} cols={2} />
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="What to bring" title="Documents required at registration">
        <ul className="grid sm:grid-cols-2 gap-2">
          {documents.map((d) => (
            <li key={d} className="flex items-start gap-2 p-3 bg-white rounded-md border border-[var(--brand-rule)] text-sm">
              <span className="text-[var(--brand-accent)] font-bold mt-0.5">✓</span>
              <span className="text-slate-700">{d}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection flush title="Grades offered" eyebrow="Programmes">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 border border-[var(--brand-rule)] rounded-md">
            <div className="text-xs font-bold uppercase tracking-wide text-[var(--brand-accent)] mb-1">Primary</div>
            <h3 className="font-bold text-[var(--brand-navy)]">Grades 1–5</h3>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
              Foundational literacy, numeracy, Science, Social Science, ICT, Art, PE and value education.
            </p>
          </div>
          <div className="p-5 border border-[var(--brand-rule)] rounded-md">
            <div className="text-xs font-bold uppercase tracking-wide text-[var(--brand-accent)] mb-1">Secondary</div>
            <h3 className="font-bold text-[var(--brand-navy)]">Grades 6–8</h3>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
              Mathematics, English, Science, Social Science, ICT, Languages, Art and skill development.
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/admission-process" className="px-5 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-[13px] font-bold hover:bg-[var(--brand-accent-dark)] transition">
            Admission process →
          </Link>
          <Link href="/fee-structure" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition">
            Fee structure
          </Link>
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
