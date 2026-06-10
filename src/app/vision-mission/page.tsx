import Image from "next/image";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";

export const metadata = {
  title: "Vision & Mission",
  description: "The vision, mission and five anchoring values (Sathya, Dharma, Shanti, Prema, Ahimsa) of Sri Sathya Sai Global School, Singapore — Head, Heart and Hand.",
  alternates: { canonical: "/vision-mission" },
};

const values = [
  { iconName: "book-open", title: "Sathya — Truth", body: "Honesty in thought, word and deed across every interaction." },
  { iconName: "scale", title: "Dharma — Right Conduct", body: "Choices grounded in responsibility, courage and respect for others." },
  { iconName: "leaf", title: "Shanti — Peace", body: "Calm minds, steady focus, the discipline of inner stillness." },
  { iconName: "heart", title: "Prema — Love", body: "Care for self, family, peers, community and the natural world." },
  { iconName: "handshake", title: "Ahimsa — Non-Violence", body: "Empathy and gentleness woven into all conduct." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="vision-mission"
      hero={{
        eyebrow: "About SSSGS",
        title: "Focused on what matters: competencies, confidence and character",
        lead: "Education at SSSGS pursues Head, Heart and Hand — uniting knowledge with compassion and purposeful action.",
        breadcrumb: [
          { label: "About", href: "/about-us" },
          { label: "Vision & Mission", href: "/vision-mission" },
        ],
      }}
      ctaTitle="See our values in practice"
      ctaSubtitle="Visit the campus or speak with our team about how SSSGS lives its mission."
    >
      <ContentSection flush>
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="news-eyebrow mb-2">Our Vision</div>
            <h2 className="text-xl lg:text-2xl font-extrabold mb-3 news-headline">
              A school where children grow into thoughtful, capable, kind adults
            </h2>
            <p className="text-slate-700 leading-relaxed text-[15px]">
              Sri Sathya Sai Global School envisions a learning community where academic excellence, character development and life skills are pursued together — not in isolation.
            </p>
          </div>
          <div className="relative aspect-square rounded-md overflow-hidden">
            <Image
              src="/img/navbar/about/vision-mission/vision-mission.jpg"
              alt="SSSGS vision: light bulb on the path"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain bg-[var(--brand-cream)] p-6"
            />
          </div>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Our Mission" title="What we work towards, every day">
        <div className="text-slate-700 leading-relaxed space-y-3 text-[15px]">
          <p>
            We harmonise Head, Heart and Hand — uniting knowledge, compassion and purposeful action. Collaborative, tech-enabled classrooms foster curiosity, reflection and confidence, while a globally minded yet deeply Indian ethos nurtures cultural adaptability and belonging.
          </p>
          <p>
            At SSSGS, parents can trust that their child&rsquo;s academic and moral growth continues seamlessly, no matter where life leads.
          </p>
        </div>
      </ContentSection>

      <ContentSection flush eyebrow="Our Faculty" title="Experienced, values-led educators">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="relative aspect-[4/3] rounded-md overflow-hidden">
            <Image
              src="/img/photos-2026-06/vision-mission-faculty.jpg"
              alt="SSSGS faculty — experienced, values-led educators"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="text-slate-700 leading-relaxed space-y-3 text-[15px]">
            <p>
              Our teaching team brings subject expertise, classroom experience and a values-led practice — educators who know every child by name and stay long enough to make that knowledge count.
            </p>
            <p>
              Faculty growth is continuous: regular subject reviews, peer observation, and structured development time keep our teaching current and our values practice consistent across grades.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Our Values" title="The five pillars of Sathya Sai education">
        <FeatureGrid items={values} cols={5} />
      </ContentSection>
    </InnerPageShell>
  );
}
