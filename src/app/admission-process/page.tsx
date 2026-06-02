import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import Timeline, { type TimelineItem } from "@/components/Timeline";
import FeatureGrid from "@/components/FeatureGrid";
import Link from "next/link";
import { ctaInquire } from "@/data/nav";

export const metadata = {
  title: "Admission Process",
  description: "A clear six-step admission journey at Sri Sathya Sai Global School, Singapore.",
};

const steps: TimelineItem[] = [
  { tag: "Step 1 · Apply", title: "Application Form", body: "Fill out the Admission Inquiry Form in person at the campus or through online submission. Our admissions team replies within one business day." },
  { tag: "Step 2 · Assess", title: "Aptitude Assessment", body: "A grade-appropriate assessment in language, mathematics and general aptitude — the aim is to understand each child's learning profile so we can support them well." },
  { tag: "Step 3 · Confirm", title: "Admission Confirmation", body: "You receive confirmation of admission with grade placement, available sections, and start date." },
  { tag: "Step 4 · Documents", title: "Document Submission", body: "Submit required documents: birth certificate, prior school records, ID/passport copies, photographs. The office guides you through the checklist." },
  { tag: "Step 5 · Pay", title: "Fee Payment", body: "Pay the registration and applicable term fees per the published fee structure. Receipts issued the same day; bank transfer, PayNow and online payment supported." },
  { tag: "Step 6 · Begin", title: "Final Submission & Start", body: "Sign the parent–school agreement, receive the welcome pack with uniform and book lists, and meet your child's homeroom teacher before the first day." },
];

const supportPoints = [
  { iconName: "handshake", title: "Mid-year admissions welcome", body: "We handle transfers from CBSE, ICSE, Cambridge, IB and local-curriculum schools without academic disruption." },
  { iconName: "phone", title: "Dedicated admissions officer", body: "One point of contact for your family across every step of the journey." },
  { iconName: "leaf", title: "Settling-in support", body: "Personalised onboarding for children adapting to a new school, peers and routine." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="admission-process"
      hero={{
        eyebrow: "Admissions",
        title: "Admission Process",
        lead: "A clear, supportive six-step journey for families. Mid-year admissions welcome at Sri Sathya Sai Global School, Singapore.",
        breadcrumb: [{ label: "Admissions", href: "/admissions" }, { label: "Admission Process", href: "/admission-process" }],
      }}
      ctaTitle="Questions before applying?"
      ctaSubtitle="Speak with an admissions officer, book a campus tour, or WhatsApp us."
    >
      <ContentSection flush title="The Six Steps" eyebrow="Process">
        <p className="text-slate-600 leading-relaxed mb-5 text-[15px]">
          End-to-end timeline of what happens between your inquiry and your child&rsquo;s first day.
        </p>
        <Timeline items={steps} />
        <div className="mt-7 flex flex-wrap gap-2">
          <Link href={ctaInquire.href} className="px-5 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-[13px] font-bold hover:bg-[var(--brand-accent-dark)] transition">
            Start the inquiry
          </Link>
          <Link href="/entry-requirements" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition">
            Entry requirements
          </Link>
          <Link href="/fee-structure" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition">
            Fee structure
          </Link>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" title="How we support families through admission" eyebrow="Support">
        <FeatureGrid items={supportPoints} cols={3} />
      </ContentSection>
    </InnerPageShell>
  );
}
