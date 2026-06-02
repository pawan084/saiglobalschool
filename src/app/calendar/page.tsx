import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import Link from "next/link";

export const metadata = {
  title: "School Calendar",
  description: "Academic calendar and holiday list for SSSGS Singapore.",
  alternates: { canonical: "/calendar" },
};

const terms = [
  { term: "Term 1", dates: "January – March", note: "School reopens, orientation week, mid-term review" },
  { term: "Term 2", dates: "April – June", note: "Summer break in early June; project work" },
  { term: "Term 3", dates: "July – September", note: "Mid-term assessments, sports day, parents' meet" },
  { term: "Term 4", dates: "October – December", note: "Annual day, finals, term-end break in late December" },
];

const holidays = [
  { date: "Jan 1", name: "New Year's Day" },
  { date: "Feb (varies)", name: "Chinese New Year" },
  { date: "Mar / Apr", name: "Good Friday" },
  { date: "May 1", name: "Labour Day" },
  { date: "May", name: "Vesak Day" },
  { date: "Aug 9", name: "National Day (Singapore)" },
  { date: "Oct / Nov", name: "Deepavali" },
  { date: "Dec 25", name: "Christmas" },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="calendar"
      hero={{
        eyebrow: "Resources",
        title: "School Calendar",
        lead: "Term dates, holidays and major school events. Detailed calendar available for download in the parent portal.",
        breadcrumb: [
          { label: "Resources", href: "/resources" },
          { label: "Calendar", href: "/calendar" },
        ],
      }}
    >
      <ContentSection flush title="Academic terms 2026" eyebrow="Term structure">
        <div className="border border-[var(--brand-rule)] rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--brand-primary)] text-white text-left">
              <tr>
                <th className="px-3 py-2.5 font-bold">Term</th>
                <th className="px-3 py-2.5 font-bold">Dates</th>
                <th className="px-3 py-2.5 font-bold">Key events</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {terms.map((t) => (
                <tr key={t.term} className="border-t border-[var(--brand-rule)]">
                  <td className="px-3 py-2.5 font-bold text-[var(--brand-navy)]">{t.term}</td>
                  <td className="px-3 py-2.5 text-slate-700">{t.dates}</td>
                  <td className="px-3 py-2.5 text-slate-700">{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" title="Public & school holidays" eyebrow="Days off">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {holidays.map((h) => (
            <div key={h.name} className="p-3 bg-white border border-[var(--brand-rule)] rounded-md">
              <div className="text-xs font-bold uppercase tracking-wide text-[var(--brand-accent)]">{h.date}</div>
              <div className="mt-0.5 font-bold text-[var(--brand-navy)] text-sm">{h.name}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Exact dates for movable holidays are published in the school calendar download.
        </p>
        <div className="mt-3">
          <Link
            href="/_files/ugd/School Holiday List_2026_KIS.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-[13px] font-bold hover:bg-[var(--brand-accent-dark)] transition"
          >
            Download holiday list PDF
          </Link>
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
