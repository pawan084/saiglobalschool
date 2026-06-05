import PageHero from "@/components/PageHero";
import FeatureBlock from "@/components/FeatureBlock";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "Admissions",
  description: "Admission process, entry requirements, fees, registration and open house information for SSSGS Singapore.",
  alternates: { canonical: "/admissions" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Admissions"
        lead="A clear, supportive admissions journey — inquire, meet the team, assess, register. Mid-year admissions welcome; we walk every family through every step."
        breadcrumb={[{ label: "Admissions", href: "/admissions" }]}
      />

      <FeatureBlock
        tone="mist"
        title="Admissions, made transparent."
        intro="Each step has a single point of contact, clear timelines, and explicit expectations. Below: the process and the details that go with it."
        featured={{
          title: "Admission process: clear, supportive, parent-friendly.",
          body:
            "Inquire → meet the team → assess → register. Mid-year admissions welcome. Transitions from CBSE, ICSE, Cambridge, IB and local-curriculum schools handled without academic disruption.",
          image: "/img/p1-vision.jpg",
          href: "/admission-process",
        }}
        items={[
          {
            title: "Entry Requirements",
            body: "Age criteria and grade-appropriate assessment for entry from Grade 1 through Grade 8.",
            image: "/img/7406-1.jpg",
            href: "/entry-requirements",
          },
          {
            title: "Registration",
            body: "PEI Singapore registration details, required documents, and the operational basics of joining SSSGS.",
            image: "/img/lsp07578_jpg.jpg",
            imagePosition: "top",
            href: "/registration",
          },
          {
            title: "Inquire / Book a Tour",
            body: "Start the conversation. Send a quick inquiry or book a campus tour — we'll reply within one business day.",
            image: "/img/lsp07438_jpg.jpg",
            imagePosition: "top",
            href: "/inquire-book-a-tour",
          },
        ]}
      />

      <FeatureBlock
        tone="cream"
        title="Money, dates and policies."
        intro="Transparent fees, refund terms in line with CPE Singapore, and upcoming events to meet the team."
        featured={{
          title: "Fee Structure — Primary & Secondary, indicative annual totals.",
          body:
            "Transparent annual fee breakdown for Grades 1–8. Tuition is billed per month; lab, CCA and books are billed per annum. Refunds follow our published policy and CPE Singapore guidelines.",
          image: "/img/548-1.jpg",
          href: "/fee-structure",
        }}
        items={[
          {
            title: "Open House",
            body: "Meet our Principal and educators in person — explore the curriculum, ask about admissions, tour the campus.",
            image: "/img/lsp07600_jpg.jpg",
            imagePosition: "top",
            href: "/open-house",
          },
          {
            title: "Refund Policy",
            body: "CPE-Singapore-aligned refund terms — cooling-off period, withdrawal terms, and how refunds are processed.",
            image: "/img/7621-1.jpg",
            href: "/refund-policy",
          },
          {
            title: "Contact Us",
            body: "Call, WhatsApp, email or visit. The admissions team responds within one business day, every time.",
            image: "/img/lsp07288_jpg.jpg",
            imagePosition: "top",
            href: "/contact-us",
          },
        ]}
      />

      <CTAStrip />
    </>
  );
}
