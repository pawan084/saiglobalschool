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
          title: "A four-step process. One point of contact.",
          body:
            "Inquire → meet the team → assess → register. Mid-year admissions welcome. Transitions from CBSE, ICSE, Cambridge, IB or local schools handled without disruption.",
          image: "/img/p1-vision.jpg",
          href: "/admission-process",
        }}
        items={[
          {
            title: "Entry requirements",
            body: "Age criteria and a grade-appropriate assessment for entry from Grade 1 through Grade 8.",
            image: "/img/7406-1.jpg",
            href: "/entry-requirements",
          },
          {
            title: "Registration",
            body: "PEI Singapore registration steps, required documents, and the operational basics of joining SSSGS.",
            image: "/img/lsp07578_jpg.jpg",
            imagePosition: "top",
            href: "/registration",
          },
          {
            title: "Inquire or book a tour",
            body: "Start the conversation. A quick inquiry or a campus tour — we reply within one business day.",
            image: "/img/lsp07438_jpg.jpg",
            imagePosition: "top",
            href: "/inquire-book-a-tour",
          },
          {
            title: "Grade-fit assessment",
            body: "A low-pressure check to understand your child and place them where they will thrive.",
            image: "/img/lsp07484_jpg.jpg",
            imagePosition: "top",
            href: "/grade-fit",
          },
          {
            title: "Apply online",
            body: "Submit details, upload documents and track your application in one place — no paperwork shuffle.",
            image: "/img/lsp07568_jpg.jpg",
            imagePosition: "top",
            href: "/apply",
          },
          {
            title: "Admissions FAQs",
            body: "Quick answers to the questions every prospective family asks — admissions, fees, timelines, transitions.",
            image: "/img/lsp07438_jpg.jpg",
            imagePosition: "top",
            href: "/faqs",
          },
        ]}
      />

      {/* FOLD 4 — PROOF */}
      <FeatureBlock
        tone="cream"
        title="The concrete details parents care about."
        intro="Transparent fees, refund terms aligned with CPE Singapore, and chances to meet the team in person before you decide."
        featured={{
          title: "Fees, dates and policies — published, not buried.",
          body:
            "Transparent annual fees for Grades 1–8. Tuition billed monthly; lab, CCA and books per annum. Refunds follow CPE Singapore guidelines.",
          image: "/img/548-1.jpg",
          href: "/fee-structure",
        }}
        items={[
          {
            title: "Open house",
            body: "Meet our Principal and educators in person. Explore the curriculum, walk the campus, ask the team anything.",
            image: "/img/lsp07600_jpg.jpg",
            imagePosition: "top",
            href: "/open-house",
          },
          {
            title: "Refund policy",
            body: "CPE-Singapore-aligned terms — cooling-off, withdrawal, and how refunds are processed. No surprises.",
            image: "/img/7621-1.jpg",
            href: "/refund-policy",
          },
          {
            title: "Contact us",
            body: "Call, WhatsApp, email or visit. One business day, every time — no automated runaround.",
            image: "/img/lsp07288_jpg.jpg",
            imagePosition: "top",
            href: "/contact-us",
          },
          {
            title: "Fee calculator",
            body: "Estimate annual fees by grade band — tuition, lab, CCA and books — before you commit.",
            image: "/img/7406-1.jpg",
            href: "/fee-structure/calculator",
          },
          {
            title: "Calendar & events",
            body: "Term dates, school events and the next open house — plan family travel around the academic year.",
            image: "/img/holidays_jpg.jpg",
            href: "/calendar",
          },
          {
            title: "Accreditation",
            body: "CPE-Singapore registration, what PEI accreditation covers, and what it means for your family.",
            image: "/img/p1-vision.jpg",
            imagePosition: "top",
            href: "/accreditation",
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
