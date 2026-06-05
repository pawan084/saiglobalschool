import PageHero from "@/components/PageHero";
import FeatureBlock from "@/components/FeatureBlock";
import FeatureGrid from "@/components/FeatureGrid";
import ContentSection from "@/components/ContentSection";
import TrustBadges from "@/components/TrustBadges";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "Academics",
  description: "NCERT-aligned curriculum, learning labs, assessments and enrichment programs at SSSGS.",
  alternates: { canonical: "/academics" },
};

const parentAcademicNeeds = [
  { iconName: "book-open",   title: "A curriculum we can trust",        body: "NCERT-aligned content with structured progression — recognisable, rigorous, and proven across India's leading schools." },
  { iconName: "compass",     title: "Continuity through transitions",   body: "Children moving in from CBSE, ICSE, Cambridge, IB or local schools are supported without academic disruption." },
  { iconName: "flask",       title: "Learning that actually sticks",    body: "Four dedicated labs — language, science, math and ICT — turn classroom concepts into hands-on application." },
  { iconName: "list-check",  title: "Assessment for learning",          body: "Daily formative checks, weekly reviews and term assessments — assessment that informs teaching, not just grades." },
];

export default function Page() {
  return (
    <>
      {/* FOLD 1 — PROMISE */}
      <PageHero
        eyebrow="Academics"
        title="Academics that travel with your child"
        lead="Concept-led, hands-on teaching across Grades 1 to 8 — designed for academic continuity through any prior curriculum and reinforced with daily lab and applied-learning sessions."
        breadcrumb={[{ label: "Academics", href: "/academics" }]}
      />

      {/* FOLD 2 — NEED */}
      <ContentSection eyebrow="What parents look for in academics" title="The four things every family weighs up" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          A strong academic programme has to do four things at once. Here&rsquo;s how parents frame the question — and how SSSGS answers each.
        </p>
        <FeatureGrid items={parentAcademicNeeds} cols={4} />
      </ContentSection>

      {/* FOLD 3 — SOLUTION */}
      <FeatureBlock
        tone="mist"
        title="A curriculum that travels with the child."
        intro="NCERT-aligned, integrated, hands-on. Structured academic progression, conceptual clarity and applied learning across every grade."
        featured={{
          title: "NCERT-aligned, integrated, hands-on.",
          body:
            "Concept-led teaching with structured progression and conceptual depth — built for continuity through CBSE, ICSE, Cambridge, IB or local-curriculum transitions.",
          image: "/img/7389-1.jpg",
          href: "/curriculum",
        }}
        items={[
          {
            title: "Courses offered",
            body: "Languages, math, science, social studies, ICT, arts, PE and value education — across primary and middle school.",
            image: "/img/7406-1.jpg",
            href: "/courses-offered",
          },
          {
            title: "Academic pathway",
            body: "Foundations in Grades 1–2, concept building in 3–5, depth and synthesis in 6–8 — a clear grade-by-grade map.",
            image: "/img/548-1.jpg",
            href: "/academic-pathway",
          },
          {
            title: "Assessment structure",
            body: "Daily formative checks, weekly reviews and term assessments — assessment for learning, not just of it.",
            image: "/img/7621-1.jpg",
            href: "/assessment-structure",
          },
          {
            title: "Curriculum comparison",
            body: "How NCERT alignment maps onto CBSE, ICSE, Cambridge and IB — for families managing a curriculum transition.",
            image: "/img/7389-1.jpg",
            href: "/curriculum/comparison",
          },
          {
            title: "Technology & LMS",
            body: "Parents and students track homework, grades and communication through one learning management system.",
            image: "/img/img-4c416e73.jpg",
            href: "/technology-lms",
          },
          {
            title: "Student support",
            body: "Personalised academic support, structured feedback and progress tracking — every child grows at their own pace.",
            image: "/img/lsp07484_jpg.jpg",
            imagePosition: "top",
            href: "/student-support",
          },
        ]}
      />

      {/* FOLD 4 — PROOF */}
      <FeatureBlock
        tone="cream"
        title="Where learning gets hands-on."
        intro="Concepts become real in our four learning labs and through enrichment programmes that take children well beyond the textbook."
        featured={{
          title: "Application beats memorisation.",
          body:
            "Children apply what they learnt in the classroom — make, build, observe, debate, model. Lab sessions are timetabled, not optional.",
          image: "/img/lab-english_jpg.jpg",
          href: "/learning-labs",
        }}
        items={[
          {
            title: "Science Lab",
            body: "Hands-on experiments, structured enquiry, and a culture of asking questions — children learn to think like scientists.",
            image: "/img/labs-science.jpg",
            href: "/science-lab",
          },
          {
            title: "Maths Lab",
            body: "Number sense, visual modelling and structured problem-solving — children learn to reason like mathematicians.",
            image: "/img/lab-maths1_jpg.jpg",
            href: "/maths-lab",
          },
          {
            title: "Language Lab",
            body: "Read, speak, write with confidence — vocabulary, phonics and oral fluency built into every week.",
            image: "/img/lab-english_jpg.jpg",
            href: "/language-lab",
          },
          {
            title: "ICT Lab",
            body: "Digital literacy from Grade 1 with online safety baked in — confident, considered users of technology.",
            image: "/img/img-4c416e73.jpg",
            href: "/ict-lab",
          },
          {
            title: "Co-curricular activities",
            body: "Music, arts, sport, debate, environment & service — plus phonics, abacus, Vedic maths and Olympiad coaching.",
            image: "/img/art-cca.jpg",
            href: "/cca",
          },
          {
            title: "Olympiad coaching",
            body: "Subject-specific Olympiad preparation for Grades 3–8 — math, science, English and general knowledge.",
            image: "/img/debate.jpg",
            href: "/olympiad",
          },
        ]}
      />

      {/* FOLD 5 — TRUST */}
      <ContentSection eyebrow="The academic credentials" title="Standards parents recognise" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          NCERT-aligned curriculum, CPE-Singapore registration, small-group teaching with a 1:20 ratio — the academic framework is anchored to standards parents already know and trust.
        </p>
        <TrustBadges variant="inline" />
      </ContentSection>

      {/* FOLD 6 — ACTION */}
      <CTAStrip
        title="See the curriculum and labs in action"
        subtitle="Book a campus visit — sit in on a class, see a lab session, and meet the academic team."
      />
    </>
  );
}
