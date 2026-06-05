import PageHero from "@/components/PageHero";
import FeatureBlock from "@/components/FeatureBlock";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "Academics",
  description: "NCERT-aligned curriculum, learning labs, assessments and enrichment programs at SSSGS.",
  alternates: { canonical: "/academics" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Academics at SSSGS"
        lead="Concept-led, hands-on teaching across Grades 1 to 8 — designed for academic continuity through any prior curriculum and reinforced with daily lab and applied-learning sessions."
        breadcrumb={[{ label: "Academics", href: "/academics" }]}
      />

      <FeatureBlock
        tone="mist"
        title="A curriculum that travels with the child."
        intro="NCERT-aligned, integrated, hands-on. Structured academic progression, conceptual clarity and applied learning across every grade."
        featured={{
          title: "Curriculum: NCERT-aligned, integrated, hands-on.",
          body:
            "Concept-led teaching combined with structured progression, conceptual clarity and foundational skill development. Designed for continuity through CBSE, ICSE, Cambridge, IB or local-curriculum transitions.",
          image: "/img/7389-1.jpg",
          href: "/curriculum",
        }}
        items={[
          {
            title: "Courses Offered",
            body: "Subjects across primary and middle school: languages, mathematics, science, social studies, ICT, arts, PE and value education.",
            image: "/img/7406-1.jpg",
            href: "/courses-offered",
          },
          {
            title: "Academic Pathway",
            body: "Clear grade-by-grade progression: foundations in Grades 1–2, concept building in 3–5, depth and synthesis in 6–8.",
            image: "/img/548-1.jpg",
            href: "/academic-pathway",
          },
          {
            title: "Assessment Structure",
            body: "Daily formative checks, weekly reviews, term assessments and oral & project work — for learning, not just of learning.",
            image: "/img/7621-1.jpg",
            href: "/assessment-structure",
          },
        ]}
      />

      <FeatureBlock
        tone="cream"
        title="Where learning gets hands-on."
        intro="Four dedicated learning labs — language, science, math and ICT — turn classroom concepts into application."
        featured={{
          title: "Learning Labs — application beats memorisation.",
          body:
            "Each lab gives children a regular, structured chance to apply what they've learnt in the classroom — to make, build, observe, debate or model. Lab sessions are timetabled, not optional.",
          image: "/img/lab-english_jpg.jpg",
          href: "/learning-labs",
        }}
        items={[
          {
            title: "Science & Maths Labs",
            body: "Hands-on experiments and visual modelling. Children learn to think like scientists and reason like mathematicians.",
            image: "/img/labs-science.jpg",
            href: "/science-lab",
          },
          {
            title: "Language & ICT Labs",
            body: "Read, speak, write with confidence — and develop digital literacy from Grade 1 with online safety baked in.",
            image: "/img/lab-english_jpg.jpg",
            href: "/language-lab",
          },
          {
            title: "CCAs & Enrichment",
            body: "Music, arts, sport, debate, environment & service — plus phonics, abacus, Vedic maths and Olympiad coaching.",
            image: "/img/art-cca.jpg",
            href: "/cca",
          },
        ]}
      />

      <CTAStrip />
    </>
  );
}
