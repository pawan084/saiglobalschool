import PageHero from "@/components/PageHero";
import FeatureBlock from "@/components/FeatureBlock";
import FeatureGrid from "@/components/FeatureGrid";
import ContentSection from "@/components/ContentSection";
import TrustBadges from "@/components/TrustBadges";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "Academics",
  description: "NCERT-aligned curriculum, five specialist learning labs, formative and summative assessment and enrichment programmes at Sri Sathya Sai Global School, Singapore.",
  alternates: { canonical: "/academics" },
};

const parentAcademicNeeds = [
  { iconName: "book-open",   title: "A curriculum we can trust",        body: "NCERT-aligned content with structured progression — recognisable, rigorous, and proven across India's leading schools." },
  { iconName: "compass",     title: "Continuity through transitions",   body: "Children moving in from CBSE, ICSE, Cambridge, IB or local schools are supported without academic disruption." },
  { iconName: "flask",       title: "Learning that actually sticks",    body: "Five dedicated labs — Science, Maths, Language, English and ICT — turn classroom concepts into hands-on application." },
  { iconName: "list-check",  title: "Assessment for learning",          body: "Daily formative checks, weekly reviews and term assessments — assessment that informs teaching, not just grades." },
];

export default function Page() {
  return (
    <>
      {/* FOLD 1 — PROMISE */}
      <PageHero
        eyebrow="Academics"
        title="Academics that travel with your child"
        lead="Concept-led, hands-on teaching across primary and middle school — designed for academic continuity through any prior curriculum and reinforced with daily lab and applied-learning sessions."
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
            "Concept-led teaching combined with structured progression, conceptual clarity and foundational skill development. Designed for continuity through CBSE, ICSE, Cambridge, IB or local-curriculum transitions.",
          image: "/img/photos-2026-06/academics-ncert.jpg",
          href: "/curriculum",
        }}
        items={[
          {
            title: "Courses Offered",
            body: "Subjects across primary and middle school: languages, mathematics, science, social studies, ICT, arts, PE and value education.",
            image: "/img/photos-2026-06/academics-courses.jpg",
            href: "/courses-offered",
          },
          {
            title: "Academic Pathway",
            body: "Clear grade-by-grade progression: foundations in Grades 1–2, concept building in 3–5, depth and synthesis in 6–8.",
            image: "/img/photos-2026-06/academic-pathway.jpg",
            href: "/academic-pathway",
          },
          {
            title: "Assessment Structure",
            body: "Daily formative checks, weekly reviews, term assessments and oral & project work — for learning, not just of learning.",
            image: "/img/photos-2026-06/assessment-structure.jpg",
            href: "/assessment-structure",
          },
          {
            title: "Curriculum Comparison",
            body: "How NCERT alignment maps onto CBSE, ICSE, Cambridge and IB — for families managing a curriculum transition.",
            image: "/img/home/academics/curriculum.jpg",
            href: "/curriculum/comparison",
          },
          {
            title: "Technology & LMS",
            body: "Parents and students track homework, grades and communication through one learning management system.",
            image: "/img/photos-2026-06/technology-lms.jpg",
            href: "/technology-lms",
          },
          {
            title: "Student Support",
            body: "Personalised academic support, structured feedback and progress tracking — every child grows at their own pace.",
            image: "/img/photos-2026-06/student-support.jpg",
            imagePosition: "top",
            href: "/student-support",
          },
        ]}
      />

      {/* FOLD 4 — PROOF */}
      <FeatureBlock
        tone="cream"
        title="Where learning gets hands-on."
        intro="Concepts become real in our five learning labs and through enrichment programmes that take children well beyond the textbook."
        featured={{
          title: "Application beats memorisation.",
          body:
            "Each lab gives children a regular, structured chance to apply what they've learnt in the classroom — to make, build, observe, debate or model. Lab sessions are timetabled, not optional.",
          image: "/img/photos-2026-06/application-beats-memorisation.jpg",
          href: "/learning-labs",
        }}
        items={[
          {
            title: "Science Lab",
            body: "Hands-on experiments and structured enquiry — children learn to think like scientists, with report writing in the practical lab notebook.",
            image: "/img/navbar/academics/science-lab.jpg",
            href: "/science-lab",
          },
          {
            title: "Maths Lab",
            body: "Number sense, visual modelling and structured problem-solving — children learn to reason like mathematicians.",
            image: "/img/photos-2026-06/maths-lab.jpg",
            href: "/maths-lab",
          },
          {
            title: "Language Lab",
            body: "Four-skill language work — reading, writing, listening and speaking — across second and third languages.",
            image: "/img/photos-2026-06/tamil-lab.jpg",
            href: "/language-lab",
          },
          {
            title: "English Lab",
            body: "NCERT plus CEFR-aligned English — reading, writing, listening and speaking, with Cambridge-level instruction.",
            image: "/img/home/learning-labs/language-lab.jpg",
            href: "/english-lab",
          },
          {
            title: "ICT Lab",
            body: "Digital literacy from Grade 1 with online safety baked in — confident, considered users of technology.",
            image: "/img/home/academics/technology-lms.jpg",
            href: "/ict-lab",
          },
          {
            title: "Co-Curricular Activities",
            body: "Music, arts, sport, debate, environment & service — every child finds their thing.",
            image: "/img/photos-2026-06/co-curricular.jpg",
            href: "/cca",
          },
          {
            title: "Olympiad Coaching",
            body: "After-school Olympiad preparation for Grades 3–8 — Maths, Science and English.",
            image: "/img/home/resources-for-parents/olympiad.jpg",
            href: "/olympiad",
          },
        ]}
      />

      {/* FOLD 5 — TRUST */}
      <ContentSection eyebrow="The academic credentials" title="Standards parents recognise" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          NCERT-aligned curriculum, CPE-Singapore registration, small-group teaching with a 1:20 maximum ratio — the academic framework is anchored to standards parents already know and trust.
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
