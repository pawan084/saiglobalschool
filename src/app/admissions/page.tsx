import PageHero from "@/components/PageHero";
import FeatureBlock from "@/components/FeatureBlock";
import FeatureGrid from "@/components/FeatureGrid";
import ContentSection from "@/components/ContentSection";
import TrustBadges from "@/components/TrustBadges";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "Admissions",
  description: "Admission process, entry requirements, fees, registration and open house information for SSSGS Singapore.",
  alternates: { canonical: "/admissions" },
};

const parentConcerns = [
  { iconName: "calendar",   title: "Can we join mid-year?",          body: "Yes — mid-year admissions are welcomed across Grades 1 to 8, with personalised settling-in support." },
  { iconName: "shield",     title: "Will the transition be smooth?", body: "We support children moving from CBSE, ICSE, Cambridge, IB and local-curriculum schools without academic disruption." },
  { iconName: "graduation", title: "What's the assessment like?",    body: "A grade-appropriate, low-pressure assessment to understand your child — not to filter them out." },
  { iconName: "chat",       title: "Who do we talk to?",             body: "One admissions point of contact, transparent timelines, and a reply within one business day, every time." },
];

export default function Page() {
  return (
    <>
      {/* FOLD 1 — PROMISE */}
      <PageHero
        eyebrow="Admissions"
        title="An admissions journey that puts your child first"
        lead="Clear timelines, a single point of contact, and a process designed around the family — from first inquiry to first day at SSSGS."
        breadcrumb={[{ label: "Admissions", href: "/admissions" }]}
      />

      {/* FOLD 2 — NEED */}
      <ContentSection eyebrow="What parents ask first" title="The questions every family brings to admissions" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          Before the forms, the fees, and the timelines, families want plain answers to four questions. We&rsquo;ve answered them up front — and built the rest of the process around them.
        </p>
        <FeatureGrid items={parentConcerns} cols={4} />
      </ContentSection>

      {/* FOLD 3 — SOLUTION */}
      <FeatureBlock
        tone="mist"
        title="Admissions, made transparent."
        intro="Each step has a single point of contact, clear timelines, and explicit expectations — so you always know what's next."
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

      {/* FOLD 4 — PROOF */}
      <FeatureBlock
        tone="cream"
        title="The concrete details parents care about."
        intro="Transparent fees, refund terms aligned with CPE Singapore, and chances to meet the team in person before you decide."
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

      {/* FOLD 5 — TRUST */}
      <ContentSection eyebrow="Why families trust SSSGS" title="A registered, accredited, parent-aligned school" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          You&rsquo;re choosing more than a school — you&rsquo;re choosing the framework that protects your family&rsquo;s investment in your child&rsquo;s education. SSSGS is registered with CPE Singapore, NCERT-aligned, and built around a 1:20 teacher–student ratio.
        </p>
        <TrustBadges variant="inline" />
      </ContentSection>

      {/* FOLD 6 — ACTION */}
      <CTAStrip
        title="Ready to start your child's admission?"
        subtitle="Inquire, book a tour, or talk to admissions — we'll take it from there."
      />
    </>
  );
}
