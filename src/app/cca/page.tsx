import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";

export const metadata = {
  title: "Co-Curricular Activities",
  description: "CCAs at SSSGS — music, art, sport, debate and more.",
};

const ccas = [
  { iconName: "music", title: "Music", body: "Choral singing, instrumental introduction, devotional and folk music traditions." },
  { iconName: "palette", title: "Visual Arts", body: "Drawing, painting, crafts and creative expression across grades." },
  { iconName: "music", title: "Performing Arts", body: "Dance, drama and storytelling — every term builds towards a showcase." },
  { iconName: "play", title: "Sport & Movement", body: "Physical education, indoor and outdoor sports, yoga and movement practice." },
  { iconName: "chat", title: "Speech & Debate", body: "Public speaking, debate club, declamations and inter-class competitions." },
  { iconName: "leaf", title: "Environment & Service", body: "Garden club, recycling initiatives, community service activities." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="cca"
      hero={{
        eyebrow: "Campus Life",
        title: "Co-Curricular Activities (CCA)",
        lead: "Every child finds their thing. CCAs at SSSGS span music, arts, sport, speech, environment and service — woven into the weekly timetable.",
        breadcrumb: [
          { label: "Academics", href: "/academics" },
          { label: "CCA", href: "/cca" },
        ],
      }}
    >
      <ContentSection flush eyebrow="The activities" title="What's on offer">
        <FeatureGrid items={ccas} cols={3} />
      </ContentSection>

      <ContentSection flush tone="cream" title="Beyond CCAs — enrichment programs" eyebrow="Also available">
        <p className="text-slate-700 leading-relaxed text-[15px]">
          Phonics classes, Abacus and Vedic Maths, Olympiad coaching and other enrichment offerings run alongside the core CCAs — see the enrichment activities page for the full picture.
        </p>
      </ContentSection>
    </InnerPageShell>
  );
}
