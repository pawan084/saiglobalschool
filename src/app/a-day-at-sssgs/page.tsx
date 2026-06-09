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
  { tag: "7:45 AM", title: "Arrival & Morning Circle", body: "Children settle in, attendance, a thought for the day, and a warm-up to focus the mind." },
  { tag: "8:30 AM", title: "Core Academic Block 1", body: "Focused block: language or mathematics. Whole-group teaching with structured practice." },
  { tag: "10:00 AM", title: "Snack & Movement Break", body: "Healthy snack and a movement break — children move, stretch and chat before the next block." },
  { tag: "10:20 AM", title: "Core Academic Block 2", body: "Science, social studies or rotating subject. Concept work followed by application." },
  { tag: "11:45 AM", title: "Learning Lab Session", body: "Hands-on session in one of the five labs — science, math, language, English or ICT." },
  { tag: "1:00 PM", title: "Mealtime & Reflection", body: "A community lunch followed by a quiet reflection — a deliberate pause in the day." },
  { tag: "2:00 PM", title: "Co-curricular Activities", body: "Music, art, sport, public speaking, debate or service club. Every child finds their thing." },
  { tag: "3:15 PM", title: "Closing Reflection & Home", body: "Brief circle: what we learned, what we're grateful for, what's coming tomorrow." },
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
