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
        lead="A values-rooted international school for primary and middle school in Singapore — experienced educators, holistic learning, and character development woven into every day."
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
            "We pursue Head, Heart and Hand — knowledge with compassion and purposeful action — so children grow into confident, contributing adults. Our values: Sathya, Dharma, Shanti, Prema, Ahimsa.",
          image: "/img/navbar/about/about-us/vision-mission.jpg",
          href: "/vision-mission",
        }}
        items={[
          {
            title: "Management & Governance",
            body: "Transparent, parent-aligned governance — clear roles, regular communication, and an accountable structure.",
            image: "/img/navbar/about/about-us/school-values.jpg",
            imagePosition: "top",
            href: "/management-governance",
          },
          {
            title: "Faculty",
            body: "Experienced educators with subject expertise and a values-led teaching practice — they know every child by name.",
            image: "/img/navbar/about/about-us/management-governance.jpg",
            imagePosition: "top",
            href: "/faculty",
          },
          {
            title: "Parent Community",
            body: "An active parent community that supports the school, supports each other, and supports children growing up.",
            image: "/img/navbar/about/about-us/faculty.jpg",
            imagePosition: "top",
            href: "/parent-community",
          },
          {
            title: "Five anchoring values",
            body: "Sathya, Dharma, Shanti, Prema, Ahimsa — five values that shape culture, conduct and every classroom routine.",
            image: "/img/home/about-sssgs/human-excellence.jpg",
            imagePosition: "top",
            href: "/vision-mission",
          },
          {
            title: "Accreditation",
            body: "CPE-Singapore registration, NCERT alignment, and the external standards SSSGS is held to as a PEI.",
            image: "/img/home/admissions/admission-process.jpg",
            href: "/accreditation",
          },
          {
            title: "Character development",
            body: "Character isn't a class. It's the way the whole school runs, from morning routines to closing reflections.",
            image: "/img/home/academics/student-support.jpg",
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
            "Bhagawan Sri Sathya Sai Baba taught that the end of education is character. We take that seriously — character development sits alongside academic learning in every grade, every day.",
          image: "/img/navbar/about/about-us/human-excellence.jpg",
          href: "/character-development",
        }}
        items={[
          {
            title: "Human Excellence",
            body: "Competence, character and contribution on equal footing — the SSSGS pedagogy puts all three at the heart of teaching.",
            image: "/img/navbar/about/about-us/co-curricular-activities.jpg",
            href: "/human-excellence",
          },
          {
            title: "Values Integration & Academics",
            body: "Values aren't an extra subject — they're integrated into the way every subject is taught, from language to math.",
            image: "/img/navbar/about/about-us/classroom-learning.jpg",
            href: "/values-integration-academics",
          },
          {
            title: "Parent-Student Handbook",
            body: "Policies, expectations, support channels and the rhythms of SSSGS life — everything you need in one place.",
            image: "/img/navbar/about/about-us/parent-support.jpg",
            imagePosition: "top",
            href: "/parent-student-handbook",
          },
          {
            title: "A day at SSSGS",
            body: "Eight blocks — morning circle to closing reflection — showing how character and academics live together.",
            image: "/img/home/campus-life/a-day-at-sssgs.jpg",
            href: "/a-day-at-sssgs",
          },
          {
            title: "Our spaces",
            body: "Classrooms, labs, library, performing-arts spaces and reflection corners — built around how children actually learn.",
            image: "/img/home/admissions/fee-structure.jpg",
            href: "/sssgs-spaces",
          },
          {
            title: "Co-curricular activities",
            body: "Music, visual arts, sport, speech & debate, environment & service — every child finds their thing.",
            image: "/img/home/academics/co-curricular-activities.jpg",
            href: "/cca",
          },
        ]}
      />

      {/* FOLD 5 — TRUST */}
      <ContentSection eyebrow="The credentials behind the philosophy" title="Registered, accredited, and accountable" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          A values-led school still has to meet rigorous external standards. SSSGS is a CPE-Singapore-registered Private Education Institution, NCERT-aligned, and accredited to deliver primary and middle school education with a 1:20 teacher–student ratio.
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
