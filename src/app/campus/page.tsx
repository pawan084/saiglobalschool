import PageHero from "@/components/PageHero";
import FeatureBlock from "@/components/FeatureBlock";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "Campus Life",
  description: "Facilities, daily school life, CCAs and the spaces that make SSSGS a second home.",
  alternates: { canonical: "/campus" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Campus"
        title="Campus Life at SSSGS"
        lead="The rhythms of a school day, the spaces that hold them, and the activities that round the whole child — from morning circle to closing reflection."
        breadcrumb={[{ label: "Campus", href: "/campus" }]}
      />

      <FeatureBlock
        tone="mist"
        title="A day at SSSGS — designed end to end."
        intro="Structured rhythms, classroom learning, lab work, CCAs, mealtime conversations, and reflection. Every day rounds the whole child."
        featured={{
          title: "From morning circle to closing reflection.",
          body:
            "Eight blocks make up the school day: morning circle, two academic blocks, lab session, mealtime & reflection, co-curricular activities, and closing reflection. Children leave with both skills and stories.",
          image: "/img/breaks_jpg.jpg",
          href: "/a-day-at-sssgs",
        }}
        items={[
          {
            title: "Facilities",
            body: "Built for safe, focused learning — bright classrooms, specialist labs, library, performing-arts spaces and activity zones.",
            image: "/img/school_edited.jpg",
            href: "/facilities",
          },
          {
            title: "SSSGS Spaces",
            body: "Classrooms, labs, library and reflection spaces — every space is built around how children actually learn.",
            image: "/img/7621-1.jpg",
            href: "/sssgs-spaces",
          },
          {
            title: "Co-Curricular Activities",
            body: "Music, visual arts, performing arts, sport, speech & debate, environment & service — every child finds their thing.",
            image: "/img/art-cca.jpg",
            href: "/cca",
          },
        ]}
      />

      <CTAStrip />
    </>
  );
}
