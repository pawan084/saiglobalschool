import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import AdmissionStepGuide from "@/components/AdmissionStepGuide";
import Link from "next/link";
import { ctaInquire } from "@/data/nav";

export const metadata = {
  title: "Admission Process",
  description: "A clear six-step admission journey at Sri Sathya Sai Global School, Singapore.",
  alternates: { canonical: "/admission-process" },
};

const supportPoints = [
  { iconName: "handshake", title: "Mid-year admissions welcome", body: "We handle transfers from CBSE, ICSE, Cambridge, IB and local-curriculum schools without academic disruption." },
  { iconName: "phone",     title: "Dedicated admissions officer", body: "One point of contact for your family across every step of the journey." },
  { iconName: "leaf",      title: "Settling-in support",          body: "Personalised onboarding for children adapting to a new school, peers and routine." },
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
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: "Admission Process", href: "/admission-process" },
        ]}
      />
      <ContentSection flush eyebrow="The journey" title="From inquiry to first day">
        <p className="text-slate-600 leading-relaxed mb-5 text-[15px] max-w-3xl">
          Six steps, typically two to three weeks. Each step lists what you do, what we do, and any
          documents to prepare — so there are no surprises.
        </p>
        <AdmissionStepGuide />
        <div className="mt-8 flex flex-wrap gap-2">
          <Link href={ctaInquire.href} className="btn-primary !py-2.5 !px-5 !text-[13px]">
            Start the inquiry
          </Link>
          <Link href="/entry-requirements" className="btn-secondary !py-2.5 !px-5 !text-[13px]">
            Entry requirements
          </Link>
          <Link href="/fee-structure" className="btn-secondary !py-2.5 !px-5 !text-[13px]">
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
