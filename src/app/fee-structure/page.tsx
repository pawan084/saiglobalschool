import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import FeeTable, { type FeeRow } from "@/components/FeeTable";
import Link from "next/link";

export const metadata = {
  title: "Fee Structure",
  description: "Annual fee structure for Primary (Grades 1–5) and Secondary (Grades 6–8) at SSSGS Singapore.",
};

const primary: FeeRow[] = [
  { category: "One-Time / Annual", type: "Registration Fee", amount: "S$500", frequency: "One-Time", remarks: "At the time of admission" },
  { category: "One-Time / Annual", type: "Medical / Accidental Insurance", amount: "S$30", frequency: "Per Annum", remarks: "—" },
  { category: "Tuition & Resource", type: "Tuition Fee", amount: "S$650", frequency: "Per Month", remarks: "—" },
  { category: "Tuition & Resource", type: "Laboratories & Resource Fees", amount: "S$300", frequency: "Per Annum", remarks: "Includes IT, Science, Maths, English Labs, Library resources" },
  { category: "Tuition & Resource", type: "CCA Fee", amount: "S$250", frequency: "Per Annum", remarks: "As per activity" },
  { category: "Consumables", type: "Books Fee", amount: "S$250", frequency: "Per Annum", remarks: "—" },
  { category: "Consumables", type: "School ID Card", amount: "S$10", frequency: "Each", remarks: "—" },
];

const secondary: FeeRow[] = [
  { category: "One-Time / Annual", type: "Registration Fee", amount: "S$600", frequency: "One-Time", remarks: "At the time of admission" },
  { category: "One-Time / Annual", type: "Medical / Accidental Insurance", amount: "S$30", frequency: "Per Annum", remarks: "—" },
  { category: "Tuition & Resource", type: "Tuition Fee", amount: "S$780", frequency: "Per Month", remarks: "—" },
  { category: "Tuition & Resource", type: "Laboratories & Resource Fees", amount: "S$400", frequency: "Per Annum", remarks: "Includes IT, Science, Maths, English Labs, Library resources" },
  { category: "Tuition & Resource", type: "CCA Fee", amount: "S$300", frequency: "Per Annum", remarks: "As per activity" },
  { category: "Consumables", type: "Books Fee", amount: "S$350", frequency: "Per Annum", remarks: "—" },
  { category: "Consumables", type: "School ID Card", amount: "S$10", frequency: "Each", remarks: "—" },
];

const policies = [
  { iconName: "credit-card", title: "Payment options", body: "Bank transfer, online payment and PayNow. Receipts issued the same day." },
  { iconName: "calendar", title: "Term & one-time fees", body: "Some fees are billed once at admission; tuition is billed per term." },
  { iconName: "rotate", title: "Refund policy", body: "Refunds follow our published policy — see the dedicated page for terms." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="fee-structure"
      hero={{
        eyebrow: "Fees",
        title: "Fee Structure",
        lead: "Transparent annual fee breakdown for Grades 1–8. Tables for Primary (Grades 1–5) and Secondary (Grades 6–8) below. Indicative figures — please confirm with admissions.",
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
              ~S$10,100<span className="text-[14px] font-bold text-slate-500"> / year</span>
            </div>
            <p className="mt-2 text-[13px] text-slate-600 leading-relaxed">
              Indicative annual total. Subjects deepen at this stage; lab fees adjust accordingly.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection flush eyebrow="Primary">
        <FeeTable title="Primary Section — Grades 1 to 5" rows={primary} />
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Secondary">
        <FeeTable title="Secondary Section — Grades 6 to 8" rows={secondary} />
      </ContentSection>

      <ContentSection flush title="What's included & how it's billed" eyebrow="Notes">
        <FeatureGrid items={policies} cols={3} />
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/fee-structure/calculator" className="px-5 py-2.5 rounded-full bg-[var(--brand-navy)] text-white text-[13px] font-bold hover:bg-[#1e293b] transition">
            Try the fee calculator →
          </Link>
          <Link href="/refund-policy" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition">
            Refund policy →
          </Link>
          <Link href="/registration" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition">
            Registration details →
          </Link>
        </div>
        <p className="mt-5 text-xs text-slate-500">
          Fees listed are indicative. Final fees, applicable taxes and special arrangements will be confirmed by the admissions office at the time of registration.
        </p>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Common questions" title="Frequently asked about fees">
        <div className="space-y-3">
          {[
            { q: "When are fees billed?", a: "Tuition is billed per month. Lab, CCA and books fees are billed per annum at the start of the academic year. The registration fee is one-time, at admission." },
            { q: "Are there sibling discounts?", a: "Please contact admissions for current sibling-discount policies — these are reviewed each academic year." },
            { q: "What payment methods are accepted?", a: "Bank transfer, PayNow and online payment. Receipts are issued the same day; physical receipts available on request." },
            { q: "What if I withdraw mid-year?", a: "Refunds follow CPE Singapore guidelines and our published refund policy. See the dedicated refund-policy page or speak with admissions." },
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
