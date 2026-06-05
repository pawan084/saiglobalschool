import PageHero from "@/components/PageHero";
import FeatureBlock from "@/components/FeatureBlock";
import FeatureGrid from "@/components/FeatureGrid";
import ContentSection from "@/components/ContentSection";
import TrustBadges from "@/components/TrustBadges";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "Campus Life",
  description: "Facilities, daily school life, CCAs and the spaces that make SSSGS a second home.",
  alternates: { canonical: "/campus" },
};

const parentCampusNeeds = [
  { iconName: "shield",      title: "A safe, contained environment",  body: "Parents need to know the campus is safe by design — visitor protocols, supervised movement, and child-friendly spaces." },
  { iconName: "sun-rise",    title: "A predictable daily rhythm",     body: "Children settle faster when the day has structure — morning circle, focused academics, lab, mealtime, CCA, reflection." },
  { iconName: "palette",     title: "Spaces that match the learning", body: "Bright classrooms, four specialist labs, library, performing-arts and activity zones — built around how children actually learn." },
  { iconName: "users",       title: "Activities for the whole child", body: "Music, art, sport, debate and service — every child finds something to commit to, beyond the academic timetable." },
];

export default function Page() {
  return (
    <>
      {/* FOLD 1 — PROMISE */}
      <PageHero
        eyebrow="Campus"
        title="A campus designed around how your child actually lives the day"
        lead="The rhythms of a school day, the spaces that hold them, and the activities that round the whole child — from morning circle to closing reflection."
        breadcrumb={[{ label: "Campus", href: "/campus" }]}
      />

      {/* FOLD 2 — NEED */}
      <ContentSection eyebrow="What parents want from a campus" title="Four things every family looks for when they walk through" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          A tour answers a lot of questions at once. Parents are quietly scanning for four things — and the SSSGS campus is built to answer all four.
        </p>
        <FeatureGrid items={parentCampusNeeds} cols={4} />
      </ContentSection>

      {/* FOLD 3 — SOLUTION */}
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

      {/* FOLD 4 — PROOF */}
      <FeatureBlock
        tone="cream"
        title="A campus that supports the whole life of a child."
        intro="Beyond timetable blocks, life at SSSGS includes settled routines, practical conveniences, and the parent community that surrounds it all."
        featured={{
          title: "Uniform, transport, schedules — the practical stuff handled.",
          body:
            "Uniform suppliers, bus routes across Singapore, calendar, mealtimes, and the day-to-day details that make school life predictable for families.",
          image: "/img/ss1_edited.jpg",
          href: "/school-uniform-and-transportation",
        }}
        items={[
          {
            title: "Campus Address",
            body: "Where SSSGS is, how to reach us, parking and drop-off arrangements — the basics of getting here.",
            image: "/img/school_edited.jpg",
            href: "/campus-address",
          },
          {
            title: "School Calendar",
            body: "Term dates, holidays and major school events — plan family travel and key moments around the academic year.",
            image: "/img/holidays_jpg.jpg",
            href: "/calendar",
          },
          {
            title: "Parent Community",
            body: "An active parent community that supports the school, each other, and children growing up at SSSGS.",
            image: "/img/lsp07600_jpg.jpg",
            href: "/parent-community",
          },
        ]}
      />

      {/* FOLD 5 — TRUST */}
      <ContentSection eyebrow="A campus you can rely on" title="Registered, accredited, and built for small-group learning" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          The campus operates under CPE Singapore registration, with an NCERT-aligned academic backbone and a 1:20 teacher–student ratio — small enough for every child to be seen.
        </p>
        <TrustBadges variant="inline" />
      </ContentSection>

      {/* FOLD 6 — ACTION */}
      <CTAStrip
        title="Come and see the campus for yourself"
        subtitle="A 45-minute tour shows you classrooms in session, labs in use, and the people who run them."
      />
    </>
  );
}
