import PageHero from "@/components/PageHero";
import FeatureBlock from "@/components/FeatureBlock";
import FeatureGrid from "@/components/FeatureGrid";
import ContentSection from "@/components/ContentSection";
import TrustBadges from "@/components/TrustBadges";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "About Us",
  description: "Vision, mission, faculty, governance and the values that shape Sri Sathya Sai Global School.",
  alternates: { canonical: "/about-us" },
};

const parentNeeds = [
  { iconName: "shield",     title: "A safe, values-led environment",   body: "Parents look for a school that takes character as seriously as academics — and shows it in everyday routines, not just on a website." },
  { iconName: "graduation", title: "Experienced, present teachers",    body: "Teachers who know every child by name, see them as individuals, and stay long enough to make that knowledge count." },
  { iconName: "users",      title: "A real community for the family",  body: "Other parents who share the same expectations — and a school that brings them together intentionally, not by accident." },
  { iconName: "heart",      title: "A school you can trust long-term", body: "Transparent governance, accountable management, and policies that put the child and the family first." },
];

export default function Page() {
  return (
    <>
      {/* FOLD 1 — PROMISE */}
      <PageHero
        eyebrow="About SSSGS"
        title="A school built around what your child becomes, not just what they learn"
        lead="A values-rooted international school for Grades 1–8 in Singapore — experienced educators, holistic learning, and character development woven into every day."
        breadcrumb={[{ label: "About", href: "/about-us" }]}
      />

      {/* FOLD 2 — NEED */}
      <ContentSection eyebrow="Why parents are looking" title="What families really want in a school" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          When parents walk through a school for the first time, they&rsquo;re scanning for four things. We&rsquo;ve built SSSGS around all four — here&rsquo;s how.
        </p>
        <FeatureGrid items={parentNeeds} cols={4} />
      </ContentSection>

      {/* FOLD 3 — SOLUTION */}
      <FeatureBlock
        tone="mist"
        title="What SSSGS stands for."
        intro="Education that harmonises Head, Heart and Hand — uniting knowledge, compassion and purposeful action. The people and principles behind it:"
        featured={{
          title: "Head, Heart and Hand — the SSSGS way.",
          body:
            "Knowledge, compassion and purposeful action — woven together so children grow into confident, contributing adults. Five anchoring values: Sathya, Dharma, Shanti, Prema, Ahimsa.",
          image: "/img/p1-vision.jpg",
          href: "/vision-mission",
        }}
        items={[
          {
            title: "Management & governance",
            body: "Transparent, parent-aligned governance — clear roles, regular communication, an accountable structure.",
            image: "/img/lsp07288_jpg.jpg",
            imagePosition: "top",
            href: "/management-governance",
          },
          {
            title: "Faculty who stay",
            body: "Experienced educators with deep subject expertise — they know every child by name and stay long enough to know them well.",
            image: "/img/lsp07578_jpg.jpg",
            imagePosition: "top",
            href: "/faculty",
          },
          {
            title: "A parent community",
            body: "An active parent community that supports the school, each other, and children growing up — through every stage.",
            image: "/img/lsp07600_jpg.jpg",
            imagePosition: "top",
            href: "/parent-community",
          },
          {
            title: "Five anchoring values",
            body: "Sathya, Dharma, Shanti, Prema, Ahimsa — five values that shape culture, conduct and every classroom routine.",
            image: "/img/original-2.jpg",
            imagePosition: "top",
            href: "/vision-mission",
          },
          {
            title: "Accreditation",
            body: "CPE-Singapore registration, NCERT alignment, and the external standards SSSGS is held to as a PEI.",
            image: "/img/lsp07568_jpg.jpg",
            href: "/accreditation",
          },
          {
            title: "Character development",
            body: "Character isn't a class. It's the way the whole school runs, from morning routines to closing reflections.",
            image: "/img/7406-1.jpg",
            imagePosition: "top",
            href: "/character-development",
          },
        ]}
      />

      {/* FOLD 4 — PROOF */}
      <FeatureBlock
        tone="cream"
        title="Character at the centre — visible in everyday life."
        intro="Character isn't a class. It shows up in routines, conversations, the way conflict is handled, and the moments children pause to reflect."
        featured={{
          title: "Character, threaded through every day.",
          body:
            "Bhagawan Sri Sathya Sai Baba taught that the end of education is character. We take that seriously — it sits alongside academic learning in every grade, every day.",
          image: "/img/original-2.jpg",
          href: "/character-development",
        }}
        items={[
          {
            title: "Human excellence",
            body: "Competence, character and contribution — given equal footing in the way SSSGS teaches.",
            image: "/img/art-cca.jpg",
            href: "/human-excellence",
          },
          {
            title: "Values in every subject",
            body: "Values aren't an extra subject. They are integrated into the way every subject is taught — from language to math.",
            image: "/img/7621-1.jpg",
            href: "/values-integration-academics",
          },
          {
            title: "Parent–student handbook",
            body: "Policies, expectations, support channels and the rhythms of SSSGS life — everything in one place.",
            image: "/img/lsp07438_jpg.jpg",
            imagePosition: "top",
            href: "/parent-student-handbook",
          },
          {
            title: "A day at SSSGS",
            body: "Eight blocks — morning circle to closing reflection — showing how character and academics live together.",
            image: "/img/breaks_jpg.jpg",
            href: "/a-day-at-sssgs",
          },
          {
            title: "Our spaces",
            body: "Classrooms, labs, library, performing-arts spaces and reflection corners — built around how children actually learn.",
            image: "/img/school_edited.jpg",
            href: "/sssgs-spaces",
          },
          {
            title: "Co-curricular activities",
            body: "Music, visual arts, sport, speech & debate, environment & service — every child finds their thing.",
            image: "/img/art-cca.jpg",
            href: "/cca",
          },
        ]}
      />

      {/* FOLD 5 — TRUST */}
      <ContentSection eyebrow="The credentials behind the philosophy" title="Registered, accredited, and accountable" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          A values-led school still has to meet rigorous external standards. SSSGS is a CPE-Singapore-registered Private Education Institution, NCERT-aligned, and accredited to deliver Grades 1–8 with a 1:20 teacher–student ratio.
        </p>
        <TrustBadges variant="inline" />
      </ContentSection>

      {/* FOLD 6 — ACTION */}
      <CTAStrip
        title="Come see the school for yourself"
        subtitle="A 45-minute campus visit shows you the values in action better than any brochure can."
      />
    </>
  );
}
