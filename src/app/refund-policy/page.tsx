import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import Link from "next/link";

export const metadata = {
  title: "Refund Policy",
  description: "Refund policy of Sri Sathya Sai Global School, Singapore — SSG SkillsFuture Singapore guidelines, terms, timelines and process.",
  alternates: { canonical: "/refund-policy" },
};

export default function Page() {
  return (
    <InnerPageShell
      slug="refund-policy"
      showRelated={false}
      hero={{
        eyebrow: "Policies",
        title: "Refund Policy",
        lead: "Clear refund terms in line with SSG (SkillsFuture Singapore) guidelines provided in the standard PEI student contract.",
        breadcrumb: [
          { label: "Admissions", href: "/admissions" },
          { label: "Refund Policy", href: "/refund-policy" },
        ],
      }}
    >
      <ContentSection flush>
        <div className="space-y-6">
          <h2 className="font-display text-[22px] font-bold text-[var(--brand-navy)]">
            1. TERMINATION AND REFUND POLICY
          </h2>

          <div className="border-l-4 border-[var(--brand-primary)] pl-4">
            <h3 className="font-bold text-[var(--brand-navy)]">1.1</h3>
            <p className="mt-1.5 text-slate-700 leading-relaxed text-[15px]">
              The PEI will notify the student in writing within three (3) working days after becoming aware of any of the following (each a <strong>&ldquo;Refund Event&rdquo;</strong>):
            </p>
            <ul className="mt-2 space-y-1.5 text-slate-700 text-[15px] leading-relaxed list-none">
              <li className="flex gap-2"><span className="shrink-0">(a)</span><span>It cannot commence the provision of the Course on the Course Commencement Date;</span></li>
              <li className="flex gap-2"><span className="shrink-0">(b)</span><span>It cannot complete the provision of the Course by the Course Completion Date;</span></li>
              <li className="flex gap-2"><span className="shrink-0">(c)</span><span>The Course will be terminated before the Course Completion Date;</span></li>
              <li className="flex gap-2"><span className="shrink-0">(d)</span><span>The Student does not meet the course entry or matriculation requirements as stated in Schedule A; or</span></li>
              <li className="flex gap-2"><span className="shrink-0">(e)</span><span>The Immigration &amp; Checkpoints Authority of Singapore (the <strong>&ldquo;ICA&rdquo;</strong>) rejects the Student&rsquo;s application for the Student Pass.</span></li>
            </ul>
          </div>

          <div className="border-l-4 border-[var(--brand-primary)] pl-4">
            <h3 className="font-bold text-[var(--brand-navy)]">1.2</h3>
            <p className="mt-1.5 text-slate-700 leading-relaxed text-[15px]">
              Where any of the Refund Events in Clause 1.1(a) to (c) above has occurred:
            </p>
            <ul className="mt-2 space-y-2 text-slate-700 text-[15px] leading-relaxed list-none">
              <li className="flex gap-2"><span className="shrink-0">(a)</span><span>The PEI shall use reasonable efforts to make alternative study arrangements for the Student and shall propose such alternative study arrangements in writing to the Contracting Party, within ten (10) working days of informing the Contracting Party of the Refund Event.</span></li>
              <li className="flex gap-2"><span className="shrink-0">(b)</span><span>If the Contracting Party accepts such alternative study arrangements, the PEI shall set forth such alternative study arrangements in a written contract and this Contract shall automatically terminate on the date that such new written contract comes into effect.</span></li>
              <li className="flex gap-2"><span className="shrink-0">(c)</span><span>If the PEI does not propose alternative study arrangements to the Contracting Party within the time stipulated in Clause 1.2(a) above, or the Contracting Party does not accept such alternative study arrangements, the Contracting Party may forthwith terminate this Contract by way of a written notice to the PEI.</span></li>
            </ul>
          </div>

          <div className="border-l-4 border-[var(--brand-primary)] pl-4">
            <h3 className="font-bold text-[var(--brand-navy)]">1.3</h3>
            <p className="mt-1.5 text-slate-700 leading-relaxed text-[15px]">
              Where any of the Refund Events in Clauses 1.1(d) to (e) has occurred, the PEI shall forthwith terminate this Contract by way of a written notice to the Contracting Party.
            </p>
          </div>

          <div className="border-l-4 border-[var(--brand-primary)] pl-4">
            <h3 className="font-bold text-[var(--brand-navy)]">1.4</h3>
            <p className="mt-1.5 text-slate-700 leading-relaxed text-[15px]">
              If the Contract is terminated pursuant to Clause 1.2(b) read with Clause 1.1(a), the PEI shall refund all Course Fees and Miscellaneous Fees paid by the Contracting Party within seven (7) working days of the termination.
            </p>
          </div>

          <div className="border-l-4 border-[var(--brand-primary)] pl-4">
            <h3 className="font-bold text-[var(--brand-navy)]">1.5</h3>
            <p className="mt-1.5 text-slate-700 leading-relaxed text-[15px]">
              If the Contract is terminated pursuant to Clause 1.2(b) read with either Clause 1.1(b) or Clause 1.1(c), the PEI shall refund the Course Fees and Miscellaneous Fees in proportion to the uncompleted portion or duration of the Course, whichever is higher, to the Contracting Party within seven (7) working days of the termination.
            </p>
          </div>

          <div className="border-l-4 border-[var(--brand-primary)] pl-4">
            <h3 className="font-bold text-[var(--brand-navy)]">1.6</h3>
            <p className="mt-1.5 text-slate-700 leading-relaxed text-[15px]">
              If the Contract is terminated pursuant to Clause 1.3 or Clause 1.2(c) read with Clause 1.1(a), the PEI shall refund all Course Fees and Miscellaneous Fees paid by the Contracting Party within seven (7) working days of the termination.
            </p>
          </div>

          <div className="border-l-4 border-[var(--brand-primary)] pl-4">
            <h3 className="font-bold text-[var(--brand-navy)]">1.7</h3>
            <p className="mt-1.5 text-slate-700 leading-relaxed text-[15px]">
              If the Contract is terminated pursuant to Clause 1.2(c) read with either Clause 1.1(b) or Clause 1.1(c), the PEI shall refund the Course Fees and Miscellaneous Fees in proportion to the uncompleted portion or duration of the Course, whichever is higher, to the Contracting Party within seven (7) working days of the termination.
            </p>
          </div>

          <div className="border-l-4 border-[var(--brand-primary)] pl-4">
            <h3 className="font-bold text-[var(--brand-navy)]">1.8 Refund for Withdrawal During the Cooling-Off Period</h3>
            <p className="mt-1.5 text-slate-700 leading-relaxed text-[15px]">
              <strong>Cooling-Off Period</strong> — Shall refer to the period of ten (10) calendar days commencing from and including the date of this Contract.
            </p>
            <p className="mt-2 text-slate-700 leading-relaxed text-[15px]">
              Notwithstanding anything herein contained, the Contracting Party shall be entitled to, without any liability whatsoever to the PEI, forthwith terminate the Contract at any time within the Cooling-Off Period by way of a written notice to the PEI. The PEI shall return all Course Fees and Miscellaneous Fees paid to it within seven (7) working days of the receipt of the written notice.
            </p>
          </div>

          <div className="border-l-4 border-[var(--brand-primary)] pl-4">
            <h3 className="font-bold text-[var(--brand-navy)]">1.9 Refund for Withdrawal Outside the Cooling-Off Period</h3>
            <p className="mt-1.5 text-slate-700 leading-relaxed text-[15px]">
              Without prejudice to Clauses 1.1 to 1.8 above, the Contracting Party may terminate the Contract at any time before the Course Completion Date by providing a written notice to the PEI. Upon receipt of such notice, the PEI shall within seven (7) working days, refund to the Contracting Party such amount (if any) as determined in accordance with Schedule D.
            </p>
          </div>

          {/* Schedule D */}
          <div className="mt-8">
            <h2 className="font-display text-[20px] font-bold text-[var(--brand-navy)] text-center mb-1">SCHEDULE D</h2>
            <h3 className="font-bold text-[var(--brand-navy)] text-center mb-4">REFUND POLICY</h3>
            <div className="border border-[var(--brand-rule)] rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[var(--brand-primary)] text-white text-left">
                  <tr>
                    <th className="px-4 py-3 font-bold text-center">% of [the amount of Course Fees and Miscellaneous Fees paid under Schedules B and C]</th>
                    <th className="px-4 py-3 font-bold text-center">If the Contracting Party&rsquo;s written notice of withdrawal is received:</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-t border-[var(--brand-rule)]">
                    <td className="px-4 py-3 text-center font-bold text-[var(--brand-navy)]">[100]</td>
                    <td className="px-4 py-3 text-slate-700">more than [30] working days before the Course Commencement Date</td>
                  </tr>
                  <tr className="border-t border-[var(--brand-rule)] bg-slate-50/40">
                    <td className="px-4 py-3 text-center font-bold text-[var(--brand-navy)]">[50]</td>
                    <td className="px-4 py-3 text-slate-700">on or before, but not more than [7] working days before the Course Commencement Date</td>
                  </tr>
                  <tr className="border-t border-[var(--brand-rule)]">
                    <td className="px-4 py-3 text-center font-bold text-[var(--brand-navy)]">[20]</td>
                    <td className="px-4 py-3 text-slate-700">after, but not more than [7] working days after the Course Commencement Date</td>
                  </tr>
                  <tr className="border-t border-[var(--brand-rule)] bg-slate-50/40">
                    <td className="px-4 py-3 text-center font-bold text-[var(--brand-navy)]">[0]</td>
                    <td className="px-4 py-3 text-slate-700">more than [7] working days after the Course Commencement Date</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
