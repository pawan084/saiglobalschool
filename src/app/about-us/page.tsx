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
          title: "Vision, Mission and the SSSGS way.",
          body:
            "We pursue Head, Heart and Hand — knowledge with compassion and purposeful action — so children grow into confident, contributing adults. Our values: Sathya, Dharma, Shanti, Prema, Ahimsa.",
          image: "/img/p1-vision.jpg",
          href: "/vision-mission",
        }}
        items={[
          {
            title: "Management & Governance",
            body: "Transparent, parent-aligned governance — clear roles, regular communication, and an accountable structure.",
            image: "/img/lsp07288_jpg.jpg",
            imagePosition: "top",
            href: "/management-governance",
          },
          {
            title: "Faculty",
            body: "Experienced educators with subject expertise and a values-led teaching practice — they know every child by name.",
            image: "/img/lsp07578_jpg.jpg",
            imagePosition: "top",
            href: "/faculty",
          },
          {
            title: "Parent Community",
            body: "An active parent community that supports the school, supports each other, and supports children growing up.",
            image: "/img/lsp07600_jpg.jpg",
            imagePosition: "top",
            href: "/parent-community",
          },
          {
            title: "Vision & Mission",
            body: "Head, Heart and Hand — the philosophical foundation that shapes every choice at SSSGS, from curriculum to culture.",
            image: "/img/p1-vision.jpg",
            imagePosition: "top",
            href: "/vision-mission",
          },
          {
            title: "Accreditation",
            body: "CPE-Singapore registration, NCERT alignment, and the external standards SSSGS is held to as a Private Education Institution.",
            image: "/img/original-2.jpg",
            href: "/accreditation",
          },
          {
            title: "Character Development",
            body: "Character isn&rsquo;t a class — it&rsquo;s the way the whole school runs, from morning routines to closing reflections.",
            image: "/img/lsp07568_jpg.jpg",
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
          title: "Character development, threaded through daily life.",
          body:
            "Bhagawan Sri Sathya Sai Baba taught that the end of education is character. We take that seriously — character development sits alongside academic learning in every grade, every day.",
          image: "/img/original-2.jpg",
          href: "/character-development",
        }}
        items={[
          {
            title: "Human Excellence",
            body: "Competence, character and contribution on equal footing — the SSSGS pedagogy puts all three at the heart of teaching.",
            image: "/img/art-cca.jpg",
            href: "/human-excellence",
          },
          {
            title: "Values Integration & Academics",
            body: "Values aren't an extra subject — they're integrated into the way every subject is taught, from language to math.",
            image: "/img/7621-1.jpg",
            href: "/values-integration-academics",
          },
          {
            title: "Parent-Student Handbook",
            body: "Policies, expectations, support channels and the rhythms of SSSGS life — everything you need in one place.",
            image: "/img/lsp07438_jpg.jpg",
            imagePosition: "top",
            href: "/parent-student-handbook",
          },
          {
            title: "A Day at SSSGS",
            body: "Eight blocks — from morning circle to closing reflection — showing how character and academics live together every day.",
            image: "/img/breaks_jpg.jpg",
            href: "/a-day-at-sssgs",
          },
          {
            title: "SSSGS Spaces",
            body: "Classrooms, labs, library, performing-arts spaces and reflection corners — every space is built around how children actually learn.",
            image: "/img/school_edited.jpg",
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
