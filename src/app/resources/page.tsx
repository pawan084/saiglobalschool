import PageHero from "@/components/PageHero";
import FeatureBlock from "@/components/FeatureBlock";
import FeatureGrid from "@/components/FeatureGrid";
import ContentSection from "@/components/ContentSection";
import TrustBadges from "@/components/TrustBadges";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "Resources",
  description: "Parent handbook, school calendar, FAQs and enrichment programs at SSSGS.",
  alternates: { canonical: "/resources" },
};

const parentResourceNeeds = [
  { iconName: "book-open",  title: "Policies in plain English",     body: "Parents want to know how the school actually runs — discipline, communication, support — without reading legalese." },
  { iconName: "calendar",   title: "Term dates and key events",     body: "When the terms start, when holidays fall, and when the major school moments happen — planned around the family year." },
  { iconName: "list-check", title: "Answers to common questions",   body: "The five or six things every prospective family asks — covered up front so you don't have to chase the answer." },
  { iconName: "sparkle",    title: "Enrichment beyond the syllabus", body: "Phonics, abacus and Olympiad coaching that extend what's taught in the classroom — without doubling the workload." },
];

export default function Page() {
  return (
    <>
      {/* FOLD 1 — PROMISE */}
      <PageHero
        eyebrow="Resources"
        title="Everything parents need, gathered in one place"
        lead="Policies, the academic calendar, parent-student handbook, frequently asked questions and the enrichment programs that complement classroom learning."
        breadcrumb={[{ label: "Resources", href: "/resources" }]}
      />

      {/* FOLD 2 — NEED */}
      <ContentSection eyebrow="What parents come here for" title="The four reasons families open this page" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          Most parents land on the Resources page with a specific question — about a policy, a date, or a programme. Each is one click away.
        </p>
        <FeatureGrid items={parentResourceNeeds} cols={4} />
      </ContentSection>

      {/* FOLD 3 — SOLUTION */}
      <FeatureBlock
        tone="mist"
        title="Everything you need, in one place."
        intro="The Parent–Student Handbook, the academic calendar, and the FAQs from prospective families — bookmarked for quick reference."
        featured={{
          title: "Parent-Student Handbook — everything you need in one place.",
          body:
            "Policies, expectations, support channels, and the rhythms of SSSGS life — written for parents and shared openly. Plus supplemental guides on transitions, settling-in, and learning approaches.",
          image: "/img/1599a2_39e7dbd515d14373b77f9a6d0140fa2e_mv2.jpg",
          href: "/parent-student-handbook",
        }}
        items={[
          {
            title: "School Calendar",
            body: "Term dates, public holidays and major school events for the current academic year — plus a downloadable PDF.",
            image: "/img/holidays_jpg.jpg",
            href: "/calendar",
          },
          {
            title: "FAQs",
            body: "Quick answers to the most common questions from prospective families about admissions, curriculum, fees and daily life.",
            image: "/img/lsp07438_jpg.jpg",
            href: "/faqs",
          },
          {
            title: "Contact the Office",
            body: "Reach the admissions and operations team by phone, WhatsApp or email — replies within one business day.",
            image: "/img/lsp07578_jpg.jpg",
            href: "/contact-us",
          },
        ]}
      />

      {/* FOLD 4 — PROOF */}
      <FeatureBlock
        tone="cream"
        title="Enrichment that extends what's taught in class."
        intro="Programs that go beyond the core curriculum — early literacy through phonics, mental-math via abacus, and Olympiad preparation for Grades 3–8."
        featured={{
          title: "Phonics, Abacus, Olympiad — focused enrichment programs.",
          body:
            "Structured early-literacy work, mental-math acceleration through abacus and Vedic techniques, and subject-specific Olympiad preparation. Each program has its own teaching team and outcomes.",
          image: "/img/7389-1.jpg",
          href: "/enrichment-activities",
        }}
        items={[
          {
            title: "Phonics Classes",
            body: "Structured early-literacy program — children build the foundation for fluent, confident reading.",
            image: "/img/7389-1.jpg",
            href: "/phonics-classes",
          },
          {
            title: "Abacus & Vedic Maths",
            body: "Mental-math acceleration through abacus practice and Vedic techniques — speed, accuracy and confidence with numbers.",
            image: "/img/lab-maths1_jpg.jpg",
            href: "/abacus-vedic-maths",
          },
          {
            title: "Olympiad Coaching",
            body: "Subject-specific Olympiad preparation for Grades 3–8 — math, science, English and general knowledge.",
            image: "/img/debate.jpg",
            href: "/olympiad",
          },
        ]}
      />

      {/* FOLD 5 — TRUST */}
      <ContentSection eyebrow="The framework behind every resource" title="Standards parents can rely on" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          Every policy, programme and resource is shaped by the framework SSSGS operates within — CPE Singapore registration, NCERT-aligned curriculum, and small-group teaching.
        </p>
        <TrustBadges variant="inline" />
      </ContentSection>

      {/* FOLD 6 — ACTION */}
      <CTAStrip
        title="Question we haven't answered?"
        subtitle="Talk to the admissions team directly — call, WhatsApp or send a quick message."
      />
    </>
  );
}
