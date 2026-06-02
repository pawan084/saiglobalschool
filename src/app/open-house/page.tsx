import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import TourSlotPicker from "@/components/TourSlotPicker";

export const metadata = {
  title: "Open House & private tour",
  description:
    "Pick a date and time to visit Sri Sathya Sai Global School — tour the labs, meet teachers, sit in on a class.",
  alternates: { canonical: "/open-house" },
};

const youWill = [
  { iconName: "chat",      title: "Meet our leadership",       body: "Hear directly from our leadership team about how we create continuity for globally mobile families." },
  { iconName: "eye",       title: "Explore the curriculum",    body: "See our curriculum, hands-on learning and enrichment programmes first-hand." },
  { iconName: "users",     title: "Meet teachers & parents",   body: "Conversations with current parents are unfiltered — that's the point." },
  { iconName: "handshake", title: "Talk to admissions",        body: "Get clarity on timelines, fees, and entry requirements directly from the team." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="open-house"
      hero={{
        eyebrow: "Visit",
        title: "Open House & private tours",
        lead: "Pick a date and a time. We'll tailor the visit around your child's grade and your questions.",
        breadcrumb: [
          { label: "Admissions", href: "/admissions" },
          { label: "Open House", href: "/open-house" },
        ],
      }}
      ctaTitle="Need a different time?"
      ctaSubtitle="WhatsApp us — we'll find a slot that works."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: "Open House", href: "/open-house" },
        ]}
      />

      <ContentSection flush>
        <TourSlotPicker />
      </ContentSection>

      <ContentSection flush eyebrow="What to expect" title="At our Open House, you will">
        <FeatureGrid items={youWill} cols={2} />
      </ContentSection>
    </InnerPageShell>
  );
}
