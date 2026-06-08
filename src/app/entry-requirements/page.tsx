import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import Link from "next/link";

export const metadata = {
  title: "Entry Requirements",
  description: "Age and assessment criteria for entry to primary and middle school at Sri Sathya Sai Global School, Singapore.",
  alternates: { canonical: "/entry-requirements" },
};

const gradeReqs = [
  { grade: "Grade 1", age: "6+ years by Jan 1", assessment: "Readiness conversation, simple literacy & numeracy check" },
  { grade: "Grade 2", age: "7+", assessment: "Grade-1-level assessment in English & Mathematics" },
  { grade: "Grade 3", age: "8+", assessment: "Grade-2-level assessment in English, Mathematics & EVS" },
  { grade: "Grade 4", age: "9+", assessment: "Grade-3-level assessment in core subjects" },
  { grade: "Grade 5", age: "10+", assessment: "Grade-4-level assessment in core subjects" },
  { grade: "Grade 6", age: "11+", assessment: "Grade-5-level including Science & Social Studies" },
  { grade: "Grade 7", age: "12+", assessment: "Grade-6-level + language proficiency" },
  { grade: "Grade 8", age: "13+", assessment: "Grade-7-level, prior school transcripts reviewed" },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="entry-requirements"
      hero={{
        eyebrow: "Admissions",
        title: "Entry requirements",
        lead: "Age and assessment criteria for entry to Grades 1 through 8. We accept mid-year admissions and support transitions across curricula.",
        breadcrumb: [
          { label: "Admissions", href: "/admissions" },
          { label: "Entry Requirements", href: "/entry-requirements" },
        ],
      }}
    >
      <ContentSection flush eyebrow="By grade" title="Age & assessment criteria">
        <div className="border border-[var(--brand-rule)] rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--brand-primary)] text-white text-left">
              <tr>
                <th className="px-3 py-2.5 font-bold">Grade</th>
                <th className="px-3 py-2.5 font-bold">Min. age</th>
                <th className="px-3 py-2.5 font-bold">Assessment</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {gradeReqs.map((r) => (
                <tr key={r.grade} className="border-t border-[var(--brand-rule)]">
                  <td className="px-3 py-2.5 font-bold text-[var(--brand-navy)] align-top">{r.grade}</td>
                  <td className="px-3 py-2.5 text-slate-700 align-top">{r.age}</td>
                  <td className="px-3 py-2.5 text-slate-700 align-top">{r.assessment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" title="Mid-year & cross-curriculum admissions" eyebrow="Transitions">
        <div className="text-slate-700 leading-relaxed space-y-3 text-[15px]">
          <p>
            SSSGS welcomes children moving from CBSE, ICSE, Cambridge, IB and local-curriculum schools. Our assessment process is designed to understand what your child knows and where they need support — not to gate-keep.
          </p>
          <p>
            Personalised settling-in support helps each child adapt to routines, peers and teachers — academic continuity is our priority.
          </p>
        </div>
        <p className="mt-4 text-[13.5px] text-slate-600">
          Not sure which grade your child belongs in?{" "}
          <Link href="/grade-fit" className="text-[var(--brand-primary)] font-bold hover:underline">
            Take the 60-second grade-fit quiz
          </Link>{" "}
          — we suggest a grade band based on age and prior schooling.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/admission-process" className="px-5 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-[13px] font-bold hover:bg-[var(--brand-accent-dark)] transition">
            Start admission
          </Link>
          <Link href="/inquire-book-a-tour" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition">
            Book a tour
          </Link>
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
