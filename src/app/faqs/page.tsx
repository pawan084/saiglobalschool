import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FaqAccordion, { type FAQ } from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata = {
  title: "FAQs",
  description: "Frequently asked questions about admissions, curriculum, fees and daily life at SSSGS.",
};

const faqs: FAQ[] = [
  { q: "Which grades does SSSGS offer?", a: "We offer Grades 1 to 8, covering Primary (Grades 1–5) and Secondary (Grades 6–8)." },
  { q: "Is SSSGS a registered school in Singapore?", a: "Yes. SSSGS is a registered Private Education Institution (PEI). Current registration period is 2026–2028 (Registration No. 202505842W)." },
  { q: "What curriculum does SSSGS follow?", a: "An NCERT-aligned integrated curriculum, with structured progression across language, math, science, social studies, ICT, art and values education." },
  { q: "Do you accept mid-year admissions?", a: "Yes — we welcome admissions throughout the year, with personalised settling-in support for children transitioning from other schools or systems." },
  { q: "What's the teacher-student ratio?", a: "Average across the school is 1:20, with smaller groups in many sessions." },
  { q: "What languages are offered?", a: "English is the medium of instruction. Additional languages are offered as part of the curriculum and enrichment programs." },
  { q: "Are there enrichment programs?", a: "Yes — phonics classes, abacus and Vedic maths, olympiad coaching, and other enrichment activities complement classroom learning." },
  { q: "How do I book a campus tour?", a: "Use the Inquire / Book a Tour page, or WhatsApp us — we'll typically respond within one business day." },
  { q: "What are the fees?", a: "See the Fee Structure page for the detailed breakdown by grade. Our admissions team can walk you through specifics." },
  { q: "Is there a refund policy?", a: "Yes — refunds follow CPE Singapore guidelines. See the Refund Policy page for the full terms." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="faqs"
      hero={{
        eyebrow: "Resources",
        title: "Frequently Asked Questions",
        lead: "Quick answers to the most common questions from prospective families. Need something specific? Get in touch.",
        breadcrumb: [
          { label: "Resources", href: "/resources" },
          { label: "FAQs", href: "/faqs" },
        ],
      }}
      ctaTitle="Didn't find your answer?"
      ctaSubtitle="Send a quick question via WhatsApp or the contact form."
    >
      <FaqJsonLd items={faqs} />
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "FAQs", href: "/faqs" },
        ]}
      />
      <ContentSection flush>
        <FaqAccordion items={faqs} />
      </ContentSection>
    </InnerPageShell>
  );
}
