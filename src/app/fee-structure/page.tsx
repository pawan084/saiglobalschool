import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import FeeTable, { type FeeRow } from "@/components/FeeTable";
import Link from "next/link";

export const metadata = {
  title: "Fee Structure",
  description: "Annual fee structure for Primary (Grades 1–5) and Secondary (Grades 6–8) at Sri Sathya Sai Global School, Singapore — tuition, lab, CCA and registration fees.",
  alternates: { canonical: "/fee-structure" },
};

const primary: FeeRow[] = [
  { category: "One-Time / Annual", type: "Registration Fees", amount: "S$500", frequency: "One-Time", remarks: "At the time of admission" },
  { category: "One-Time / Annual", type: "Medical / Accidental Insurance", amount: "S$30", frequency: "Per Annum", remarks: "—" },
  { category: "Tuition & Resource", type: "Tuition Fee", amount: "S$650", frequency: "Per Month", remarks: "Billed bimonthly (6 instalments per annum)" },
  { category: "Tuition & Resource", type: "Laboratories and Resource Fees", amount: "S$300", frequency: "Per Annum", remarks: "Includes IT, Science, Maths and English Labs, Library resources etc." },
  { category: "Tuition & Resource", type: "CCA Fee", amount: "S$250", frequency: "Per Annum", remarks: "As per Activity" },
  { category: "Consumables", type: "Books Fee", amount: "S$250", frequency: "Per Annum", remarks: "—" },
  { category: "Consumables", type: "School ID Card", amount: "S$10", frequency: "Each", remarks: "—" },
  { category: "Consumables", type: "Uniform", amount: "S$50", frequency: "One-Time", remarks: "Set of 2 T-shirts" },
  { category: "Optional / Variable", type: "External Events Fee", amount: "TBD", frequency: "Variable", remarks: "—" },
  { category: "Optional / Variable", type: "External Examinations Fee", amount: "TBD", frequency: "Variable", remarks: "—" },
  { category: "Optional / Variable", type: "Field Trip", amount: "TBD", frequency: "Variable", remarks: "—" },
  { category: "Administrative", type: "Late Fee Charges", amount: "S$50", frequency: "Per Week", remarks: "After 3-day grace period" },
  { category: "Administrative", type: "Non-Giro Payment", amount: "S$10", frequency: "Each transaction", remarks: "—" },
];

const secondary: FeeRow[] = [
  { category: "One-Time / Annual", type: "Registration Fees", amount: "S$500", frequency: "One-Time", remarks: "At the time of admission" },
  { category: "One-Time / Annual", type: "Medical / Accidental Insurance", amount: "S$30", frequency: "Per Annum", remarks: "—" },
  { category: "Tuition & Resource", type: "Tuition Fee", amount: "S$750", frequency: "Per Month", remarks: "Billed bimonthly (6 instalments per annum)" },
  { category: "Tuition & Resource", type: "Laboratories and Resource Fees", amount: "S$400", frequency: "Per Annum", remarks: "Includes IT, Science, Maths and English Labs, Library resources etc." },
  { category: "Tuition & Resource", type: "CCA Fee", amount: "S$300", frequency: "Per Annum", remarks: "As per Activity" },
  { category: "Consumables", type: "Books Fee", amount: "S$350", frequency: "Per Annum", remarks: "—" },
  { category: "Consumables", type: "School ID Card", amount: "S$10", frequency: "Each", remarks: "—" },
  { category: "Consumables", type: "Uniform", amount: "S$50", frequency: "One-Time", remarks: "Set of 2 T-shirts. Different pricing for sizes above L." },
  { category: "Optional / Variable", type: "External Events Fee", amount: "TBD", frequency: "Variable", remarks: "—" },
  { category: "Optional / Variable", type: "External Examinations Fee", amount: "TBD", frequency: "Variable", remarks: "—" },
  { category: "Optional / Variable", type: "Field Trip", amount: "TBD", frequency: "Variable", remarks: "—" },
  { category: "Administrative", type: "Late Fee Charges", amount: "S$50", frequency: "Per Week", remarks: "After 3-day grace period" },
  { category: "Administrative", type: "Non-Giro Payment", amount: "S$10", frequency: "Each transaction", remarks: "—" },
];

const policies = [
  { iconName: "credit-card", title: "Payment options", body: "Bank transfer, online payment and PayNow. Credit card payments subject to 4% processing fee." },
  { iconName: "calendar", title: "Tuition billed bimonthly", body: "Tuition is collected in six instalments per annum — April, June, August, October, December and February. Each collection covers two months." },
  { iconName: "rotate", title: "Refund policy", body: "Refunds follow our SSG (SkillsFuture Singapore) guidelines — see the dedicated page for terms." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="fee-structure"
      hero={{
        eyebrow: "Fees",
        title: "Fee Structure",
        lead: "Transparent annual fee breakdown for primary and secondary school. Tables for Primary (Grades 1–5) and Secondary (Grades 6–8) below. Indicative figures — please confirm with admissions.",
        breadcrumb: [
          { label: "Admissions", href: "/admissions" },
          { label: "Fee Structure", href: "/fee-structure" },
        ],
      }}
      ctaTitle="Want to discuss fees?"
      ctaSubtitle="Our admissions office can walk you through the structure and answer questions before you commit."
    >
      {/* Summary cards */}
      <ContentSection flush eyebrow="Annual cost" title="At a glance">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-5 rounded-md border border-[var(--brand-rule)] bg-white">
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--brand-primary)]">
              Primary · Grades 1–5
            </div>
            <div className="mt-1 text-[28px] font-extrabold text-[var(--brand-navy)] leading-tight">
              ~S$8,400<span className="text-[14px] font-bold text-slate-500"> / year</span>
            </div>
            <p className="mt-2 text-[13px] text-slate-600 leading-relaxed">
              Indicative annual total (tuition + labs + consumables). Excludes one-time
              registration and optional add-ons.
            </p>
          </div>
          <div className="p-5 rounded-md border border-[var(--brand-rule)] bg-white">
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--brand-accent)]">
              Secondary · Grades 6–8
            </div>
            <div className="mt-1 text-[28px] font-extrabold text-[var(--brand-navy)] leading-tight">
              ~S$9,800<span className="text-[14px] font-bold text-slate-500"> / year</span>
            </div>
            <p className="mt-2 text-[13px] text-slate-600 leading-relaxed">
              Indicative annual total (tuition + labs + consumables); excludes one-time
              registration and optional add-ons. Subjects deepen at this stage, so lab fees
              adjust accordingly.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection flush eyebrow="Primary">
        <FeeTable title="Primary Section — Grades 1–5" rows={primary} />
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Secondary">
        <FeeTable title="Secondary Section — Grades 6–8" rows={secondary} />
      </ContentSection>

      <ContentSection flush title="What's included & how it's billed" eyebrow="Notes">
        <FeatureGrid items={policies} cols={3} />
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/refund-policy" className="px-5 py-2.5 rounded-full bg-[var(--brand-navy)] text-white text-[13px] font-bold hover:bg-[#1e293b] transition">
            Refund policy →
          </Link>
          <Link href="/registration" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition">
            Registration details →
          </Link>
        </div>
        <p className="mt-5 text-xs text-slate-500">
          All fees are subject to prevailing GST. Fees listed are indicative. Final fees, applicable taxes and special arrangements will be confirmed by the admissions office at the time of registration.
        </p>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Common questions" title="Frequently asked about fees">
        <div className="space-y-3">
          {[
            { q: "When are fees billed?", a: "Tuition is billed bimonthly — six instalments per annum in April, June, August, October, December and February. Each collection covers two months. Lab, CCA and books fees are billed per annum at the start of the academic year. The registration fee is one-time, at admission." },
            { q: "Are there sibling discounts?", a: "Please contact admissions for current sibling-discount policies — these are reviewed each academic year." },
            { q: "What payment methods are accepted?", a: "Bank transfer, PayNow and online payment. Credit card payments are subject to a 4% processing fee. Receipts are issued within 10 days of payment; physical receipts available on request." },
            { q: "What if I withdraw mid-year?", a: "Withdrawal requires 60 days prior written notice, or payment in lieu of the notice period. Refunds follow SSG (SkillsFuture Singapore) guidelines and our published refund policy. See the dedicated refund-policy page or speak with admissions." },
          ].map((f) => (
            <details
              key={f.q}
              className="p-4 bg-white border border-[var(--brand-rule)] rounded-md group"
            >
              <summary className="font-bold text-[var(--brand-navy)] cursor-pointer flex items-center justify-between gap-3">
                {f.q}
                <span className="text-[var(--brand-accent)] text-xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-2 text-[14px] text-slate-700 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
