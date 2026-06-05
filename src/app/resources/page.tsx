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
          title: "Parent–student handbook — everything in one place.",
          body:
            "Policies, expectations, support channels and the rhythms of SSSGS life — written for parents, shared openly. Plus guides on transitions, settling-in and learning.",
          image: "/img/1599a2_39e7dbd515d14373b77f9a6d0140fa2e_mv2.jpg",
          href: "/parent-student-handbook",
        }}
        items={[
          {
            title: "School calendar",
            body: "Term dates, public holidays and major school events for the academic year — plus a downloadable PDF.",
            image: "/img/holidays_jpg.jpg",
            href: "/calendar",
          },
          {
            title: "FAQs",
            body: "Quick answers from prospective families — admissions, curriculum, fees, daily life. All in one place.",
            image: "/img/lsp07438_jpg.jpg",
            href: "/faqs",
          },
          {
            title: "Contact the office",
            body: "Reach admissions and operations by phone, WhatsApp or email — replies within one business day.",
            image: "/img/lsp07578_jpg.jpg",
            href: "/contact-us",
          },
          {
            title: "News & announcements",
            body: "School news, parent updates and announcements — what's happening at SSSGS this week and this term.",
            image: "/img/lsp07568_jpg.jpg",
            imagePosition: "top",
            href: "/news",
          },
          {
            title: "Press & media",
            body: "Coverage of SSSGS in the press, plus the school's own statements, releases and feature stories.",
            image: "/img/lsp07288_jpg.jpg",
            imagePosition: "top",
            href: "/press",
          },
          {
            title: "Events calendar",
            body: "Upcoming open houses, parent meetings, school showcases — RSVP and add to your calendar.",
            image: "/img/holidays_jpg.jpg",
            href: "/events",
          },
        ]}
      />

      {/* FOLD 4 — PROOF */}
      <FeatureBlock
        tone="cream"
        title="Enrichment that extends what's taught in class."
        intro="Programs that go beyond the core curriculum — early literacy through phonics, mental-math via abacus, and Olympiad preparation for Grades 3–8."
        featured={{
          title: "Phonics, abacus, Olympiad — focused enrichment.",
          body:
            "Structured early-literacy work, mental-math acceleration, and subject-specific Olympiad prep. Each programme has its own teaching team and outcomes.",
          image: "/img/7389-1.jpg",
          href: "/enrichment-activities",
        }}
        items={[
          {
            title: "Phonics classes",
            body: "Structured early-literacy — children build the foundation for fluent, confident reading.",
            image: "/img/7389-1.jpg",
            href: "/phonics-classes",
          },
          {
            title: "Abacus & Vedic maths",
            body: "Mental-math acceleration through abacus and Vedic techniques — speed, accuracy, confidence with numbers.",
            image: "/img/lab-maths1_jpg.jpg",
            href: "/abacus-vedic-maths",
          },
          {
            title: "Olympiad coaching",
            body: "Subject-specific Olympiad preparation for Grades 3–8 — math, science, English and general knowledge.",
            image: "/img/debate.jpg",
            href: "/olympiad",
          },
          {
            title: "Technology & LMS",
            body: "Parents and students track homework, grades and communication through one learning management system.",
            image: "/img/img-4c416e73.jpg",
            href: "/technology-lms",
          },
          {
            title: "Student support",
            body: "Personalised academic and emotional support — settling-in help, learning-needs support, one-to-one guidance.",
            image: "/img/7406-1.jpg",
            href: "/student-support",
          },
          {
            title: "Non-academic programmes",
            body: "CCA, sport, performance and service — programmes that round out a child's development beyond the syllabus.",
            image: "/img/art-cca.jpg",
            href: "/non-academic",
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
