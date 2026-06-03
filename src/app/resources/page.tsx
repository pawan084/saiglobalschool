import PageHero from "@/components/PageHero";
import FeatureBlock from "@/components/FeatureBlock";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "Resources",
  description: "Parent handbook, school calendar, FAQs and enrichment programs at SSSGS.",
  alternates: { canonical: "/resources" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Resources for Parents"
        lead="Policies, the academic calendar, parent-student handbook, frequently asked questions and the enrichment programs that complement classroom learning."
        breadcrumb={[{ label: "Resources", href: "/resources" }]}
      />

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

      <FeatureBlock
        tone="cream"
        title="Enrichment that goes beyond the classroom."
        intro="Programs that extend the core curriculum — early literacy through phonics, mental-math via abacus, and Olympiad preparation for Grades 3–8."
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

      <CTAStrip />
    </>
  );
}
