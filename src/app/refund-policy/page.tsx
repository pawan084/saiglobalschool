import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import Link from "next/link";

export const metadata = {
  title: "Refund Policy",
  description: "Refund policy of Sri Sathya Sai Global School, Singapore — terms, timelines and process.",
  alternates: { canonical: "/refund-policy" },
};

const sections = [
  { title: "Cooling-off period", body: "Within seven (7) calendar days of signing the Student Contract, a full refund of fees paid is available, less any non-refundable application fee — in line with CPE Singapore guidelines." },
  { title: "Withdrawal before course commencement", body: "If the student withdraws before the official commencement date of the academic term, all fees paid (except the registration fee and any non-refundable application fee) will be refunded within ten (10) working days." },
  { title: "Withdrawal after course commencement", body: "Refunds for withdrawal after the course commences are calculated on a pro-rata basis according to the published refund schedule. The registration fee, insurance and consumables are non-refundable." },
  { title: "Refund process", body: "Submit a written refund request to the admissions office. Approved refunds are processed to the original payment source within ten to fourteen (10–14) working days of approval." },
  { title: "School-initiated withdrawal", body: "In the rare event that SSSGS cancels a course, parents receive a full refund of all fees paid for that course." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="refund-policy"
      showRelated={false}
      hero={{
        eyebrow: "Policies",
        title: "Refund Policy",
        lead: "Clear refund terms in line with CPE Singapore guidelines. Below is a summary; the full policy is in the parent–student handbook.",
        breadcrumb: [
          { label: "Admissions", href: "/admissions" },
          { label: "Refund Policy", href: "/refund-policy" },
        ],
      }}
    >
      <ContentSection flush>
        <div className="space-y-5">
          {sections.map((s) => (
            <div key={s.title} className="border-l-4 border-[var(--brand-primary)] pl-4">
              <h3 className="font-bold text-[var(--brand-navy)]">{s.title}</h3>
              <p className="mt-1.5 text-slate-700 leading-relaxed text-[15px]">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-[var(--brand-cream)] border border-[var(--brand-accent)] rounded-md">
          <h3 className="font-bold text-[var(--brand-navy)]">Have questions about your specific case?</h3>
          <p className="mt-2 text-slate-700 leading-relaxed text-[15px]">
            Contact the admissions office for a written summary of refund amounts and timelines applicable to your contract.
          </p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <Link href="/contact-us" className="px-5 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-[13px] font-bold hover:bg-[var(--brand-accent-dark)] transition">
              Contact admissions
            </Link>
            <Link href="/parent-student-handbook" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition">
              Full handbook
            </Link>
          </div>
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
