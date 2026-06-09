import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Curriculum comparison",
  description:
    "How SSSGS compares with CBSE, ICSE, Cambridge and IB across structure, assessment, languages and pace.",
  alternates: { canonical: "/curriculum/comparison" },
};

type Row = {
  label: string;
  sssgs: string;
  cbse: string;
  icse: string;
  cambridge: string;
  ib: string;
};

const ROWS: Row[] = [
  {
    label: "Curriculum base",
    sssgs: "NCERT-aligned, values-integrated",
    cbse: "NCERT",
    icse: "CISCE board",
    cambridge: "Cambridge (CAIE) — Primary / Lower Secondary / IGCSE",
    ib: "International Baccalaureate (PYP/MYP)",
  },
  {
    label: "Medium",
    sssgs: "English",
    cbse: "Mostly English",
    icse: "English",
    cambridge: "English",
    ib: "English (additional language required)",
  },
  {
    label: "Grades covered",
    sssgs: "Primary and middle school today (expanding)",
    cbse: "Grades 1–12",
    icse: "Grades 1–10 (ISC up to 12)",
    cambridge: "Grades 1–11 (IGCSE); A-Level to 13",
    ib: "Grades 1–12",
  },
  {
    label: "Class size",
    sssgs: "~1:20 maximum",
    cbse: "Often 1:30+",
    icse: "Often 1:30+",
    cambridge: "Varies by school",
    ib: "Smaller (1:15–1:20 common)",
  },
  {
    label: "Assessment style",
    sssgs: "Continuous formative + structured term assessments",
    cbse: "Periodic + annual",
    icse: "Continuous + annual",
    cambridge: "Checkpoint tests + IGCSE external exams",
    ib: "Criterion-based, project-heavy",
  },
  {
    label: "Mid-year admissions",
    sssgs: "Welcome, with settling support",
    cbse: "Varies by school",
    icse: "Varies by school",
    cambridge: "Varies by school",
    ib: "Possible, slot-dependent",
  },
  {
    label: "Values education",
    sssgs: "Built into every subject and routine",
    cbse: "Light unless school adds it",
    icse: "Light unless school adds it",
    cambridge: "Light unless school adds it",
    ib: "Learner Profile traits; varies",
  },
  {
    label: "Co-curricular focus",
    sssgs: "CCAs + enrichment (phonics, abacus, olympiad)",
    cbse: "School-dependent",
    icse: "School-dependent",
    cambridge: "School-dependent",
    ib: "Action / Service integrated",
  },
  {
    label: "Transition fit",
    sssgs: "Strong for CBSE/ICSE families relocating to SG",
    cbse: "Strong within CBSE network",
    icse: "Strong within ICSE network",
    cambridge: "Common for internationally-mobile families",
    ib: "Globally portable, exam-style differs",
  },
  {
    label: "Fees (relative)",
    sssgs: "Mid-range",
    cbse: "Generally lower",
    icse: "Mid-range",
    cambridge: "Higher (international)",
    ib: "Highest",
  },
];

function MobileCard({ row }: { row: Row }) {
  const cols: { key: keyof Row; label: string; tone: string }[] = [
    { key: "sssgs", label: "SSSGS", tone: "bg-[var(--brand-primary-tint)] border-[var(--brand-primary)]/30 text-[var(--brand-primary-dark)]" },
    { key: "cbse", label: "CBSE", tone: "bg-white border-[var(--brand-rule)] text-[var(--brand-navy)]" },
    { key: "icse", label: "ICSE", tone: "bg-white border-[var(--brand-rule)] text-[var(--brand-navy)]" },
    { key: "cambridge", label: "CAIE", tone: "bg-white border-[var(--brand-rule)] text-[var(--brand-navy)]" },
    { key: "ib", label: "IB", tone: "bg-white border-[var(--brand-rule)] text-[var(--brand-navy)]" },
  ];
  return (
    <div className="rounded-2xl bg-white border border-[var(--brand-rule)] p-4">
      <div className="font-display text-[15px] font-bold text-[var(--brand-navy)] mb-3">
        {row.label}
      </div>
      <div className="space-y-1.5">
        {cols.map((c) => (
          <div key={c.key} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${c.tone}`}>
            <span className="text-[10.5px] uppercase tracking-[0.14em] font-bold w-12 shrink-0">
              {c.label}
            </span>
            <span className="text-[12.5px]">{row[c.key] as string}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <InnerPageShell
      slug="curriculum"
      hero={{
        eyebrow: "Compare",
        title: "SSSGS vs CBSE, ICSE, Cambridge, IB",
        lead: "A practical at-a-glance comparison for families relocating or choosing between curricula. We focus on the questions parents actually ask.",
        breadcrumb: [
          { label: "Academics", href: "/academics" },
          { label: "Curriculum", href: "/curriculum" },
          { label: "Comparison", href: "/curriculum/comparison" },
        ],
      }}
      ctaTitle="Need a tailored walkthrough?"
      ctaSubtitle="Tell us your previous curriculum and we'll map the transition for you."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Curriculum", href: "/curriculum" },
          { label: "Comparison", href: "/curriculum/comparison" },
        ]}
      />
      <ContentSection flush>
        {/* Table on lg+ */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[var(--brand-rule)] bg-white">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="bg-[var(--brand-cream)]">
                <th className="text-left px-4 py-3 font-bold text-slate-500 text-[11px] uppercase tracking-[0.14em] w-[200px]">
                  Aspect
                </th>
                <th className="text-left px-4 py-3 font-bold text-[var(--brand-primary-dark)] text-[12px] uppercase tracking-[0.14em] bg-[var(--brand-primary-tint)]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="grid place-items-center h-4 w-4 rounded-full bg-[var(--brand-primary)] text-white">
                      <Icon name="check" size={8} />
                    </span>
                    SSSGS
                  </span>
                </th>
                <th className="text-left px-4 py-3 font-bold text-slate-500 text-[11px] uppercase tracking-[0.14em]">CBSE</th>
                <th className="text-left px-4 py-3 font-bold text-slate-500 text-[11px] uppercase tracking-[0.14em]">ICSE</th>
                <th className="text-left px-4 py-3 font-bold text-slate-500 text-[11px] uppercase tracking-[0.14em]">Cambridge</th>
                <th className="text-left px-4 py-3 font-bold text-slate-500 text-[11px] uppercase tracking-[0.14em]">IB</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.label} className={i % 2 ? "bg-white" : "bg-slate-50/40"}>
                  <td className="align-top px-4 py-3 font-bold text-[var(--brand-navy)]">{r.label}</td>
                  <td className="align-top px-4 py-3 bg-[var(--brand-primary-tint)]/40 text-[var(--brand-navy)]">
                    {r.sssgs}
                  </td>
                  <td className="align-top px-4 py-3 text-slate-700">{r.cbse}</td>
                  <td className="align-top px-4 py-3 text-slate-700">{r.icse}</td>
                  <td className="align-top px-4 py-3 text-slate-700">{r.cambridge}</td>
                  <td className="align-top px-4 py-3 text-slate-700">{r.ib}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card stack on mobile */}
        <div className="lg:hidden space-y-3">
          {ROWS.map((r) => (
            <MobileCard key={r.label} row={r} />
          ))}
        </div>

        <p className="mt-6 text-[11.5px] text-slate-500 leading-relaxed">
          Note: comparisons are general patterns based on common implementations and may vary by individual school.
          Confirm specifics with each school before deciding.
        </p>
      </ContentSection>
    </InnerPageShell>
  );
}
