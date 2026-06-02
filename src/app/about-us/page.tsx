import PageHero from "@/components/PageHero";
import FeatureBlock from "@/components/FeatureBlock";
import CTAStrip from "@/components/CTAStrip";

export const metadata = {
  title: "About Us",
  description: "Vision, mission, faculty, governance and the values that shape Sri Sathya Sai Global School.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About SSSGS"
        title="About Sri Sathya Sai Global School"
        lead="A values-rooted international school for Grades 1–8 in Singapore — built around experienced educators, holistic learning, and a commitment to character development."
        breadcrumb={[{ label: "About", href: "/about-us" }]}
      />

      <FeatureBlock
        tone="mist"
        title="What SSSGS stands for."
        intro="Education that harmonises Head, Heart and Hand — uniting knowledge, compassion and purposeful action. Below, the people and principles that shape SSSGS."
        featured={{
          title: "Vision, Mission and the SSSGS way.",
          body:
            "We pursue Head, Heart and Hand — knowledge with compassion and purposeful action — so children grow into confident, contributing adults. Our values: Sathya, Dharma, Shanti, Prema, Ahimsa.",
          image: "/img/p1-vision.png",
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
        ]}
      />

      <FeatureBlock
        tone="cream"
        title="Character at the centre."
        intro="Character isn't a class — it's the way the whole school runs. Daily routines, conversations, conflict and reflection all shape who a child becomes."
        featured={{
          title: "Character development, threaded through daily life.",
          body:
            "Bhagawan Sri Sathya Sai Baba taught that the end of education is character. We take that seriously — character development sits alongside academic learning in every grade, every day.",
          image: "/img/1599a2_ceba713090de446aa704425813893fe9_mv2.png",
          href: "/character-development",
        }}
        items={[
          {
            title: "Human Excellence",
            body: "Competence, character and contribution on equal footing — the SSSGS pedagogy puts all three at the heart of teaching.",
            image: "/img/1599a2_5a4405ad06c548069c50fa4e1e4647ca_mv2.png",
            href: "/human-excellence",
          },
          {
            title: "Values Integration & Academics",
            body: "Values aren't an extra subject — they're integrated into the way every subject is taught, from language to math.",
            image: "/img/7621-1.png",
            href: "/values-integration-academics",
          },
          {
            title: "Parent-Student Handbook",
            body: "Policies, expectations, support channels and the rhythms of SSSGS life — everything you need in one place.",
            image: "/img/lsp07438_jpg.jpg",
            imagePosition: "top",
            href: "/parent-student-handbook",
          },
        ]}
      />

      <CTAStrip />
    </>
  );
}
