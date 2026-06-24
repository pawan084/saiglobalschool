import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid, { type Feature } from "@/components/FeatureGrid";
import Timeline, { type TimelineItem } from "@/components/Timeline";

export const metadata = {
  title: "A Day at SSSGS",
  description: "From morning circle to closing reflection — the rhythm of a school day at Sri Sathya Sai Global School.",
  alternates: { canonical: "/a-day-at-sssgs" },
};

const day: TimelineItem[] = [
  { tag: "8:00 AM", title: "Arrival & Morning Circle", body: "Children settle in, mark attendance, share a thought for the day, and prepare for focused learning." },
  { tag: "8:30 AM", title: "Core Academic Block 1", body: "Focused subject teaching with structured explanation, class discussion and guided practice." },
  { tag: "9:10 AM", title: "Short Break", body: "A quick refresh before the next learning block." },
  { tag: "9:25 AM", title: "Core Academic Block 2", body: "Concept learning continues through practice, questioning and classroom application." },
  { tag: "10:00 AM", title: "Learning Lab Session 1", body: "Hands-on lab-based learning linked to the subject, using activities, models and practical work." },
  { tag: "10:35 AM", title: "Core Academic Block 3", body: "Another focused academic session to build understanding, accuracy and confidence." },
  { tag: "11:10 AM", title: "Lunch Break", body: "Children pause for lunch, rest and informal interaction with peers." },
  { tag: "11:40 AM", title: "Core Academic Block 4", body: "Structured learning continues with subject practice, written work and teacher feedback." },
  { tag: "12:20 PM", title: "Learning Lab Session 2", body: "A second experiential learning session for deeper application through lab or activity-based work." },
  { tag: "1:00 PM", title: "Co-curricular Activities", body: "Music, art, sport, public speaking, debate or service activities to develop wider interests." },
  { tag: "1:25 PM", title: "Remedial Classes / Tutorial Support", body: "Targeted support for students who need reinforcement, practice or individual guidance." },
  { tag: "2:05 PM", title: "Reflection Time", body: "Students review what they learned, what they found challenging, and what they can improve." },
  { tag: "2:20 PM", title: "Dispersal", body: "The school day closes with an orderly and safe dispersal." },
];

const dailyDelivers: Feature[] = [
  { iconName: "sparkle", title: "Curiosity Ignited", body: "Every day brings a question worth pursuing, a thing worth wondering about." },
  { iconName: "handshake", title: "Connection Nurtured", body: "Children leave with strong relationships — to peers, to teachers, to learning itself." },
  { iconName: "target", title: "Purpose Defined", body: "Daily reflection helps children understand why they learn, not just what." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="a-day-at-sssgs"
      hero={{
        eyebrow: "School day",
        title: "A day at SSSGS — from morning circle to closing reflection",
        lead: "Structured rhythms, classroom learning, lab work, CCAs, mealtime conversations, and reflection — every day rounds the whole child.",
        breadcrumb: [
          { label: "Campus", href: "/campus" },
          { label: "A Day at SSSGS", href: "/a-day-at-sssgs" },
        ],
      }}
      ctaTitle="Want to see a day in action?"
      ctaSubtitle="Book a school-day tour and join us from morning circle to closing reflection."
    >
      <ContentSection flush eyebrow="Hour by hour" title="The school day, mapped">
        <Timeline items={day} />
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="What every day delivers" title="The SSSGS difference">
        <FeatureGrid items={dailyDelivers} cols={3} />
      </ContentSection>
    </InnerPageShell>
  );
}
