import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import Link from "next/link";

export const metadata = {
  title: "Open House",
  description: "Meet our Principal and educators in person — explore SSSGS curriculum, ask questions about admissions, and tour the campus.",
};

const youWill = [
  { iconName: "chat", title: "Meet our leadership", body: "Hear directly from our leadership team — Principal and senior educators — about how we create continuity in education for globally mobile Indian families." },
  { iconName: "eye", title: "Explore the curriculum", body: "See our CBSE curriculum, hands-on learning, and enrichment programs first-hand." },
  { iconName: "chat", title: "Ask the team", body: "Bring your questions about transitioning, support and the day-to-day experience." },
  { iconName: "handshake", title: "Talk to admissions", body: "Hear admissions timelines and entry-requirement criteria from the team itself." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="open-house"
      hero={{
        eyebrow: "Event",
        title: "Open House",
        lead: "You'll hear directly from our leadership team — Principal, senior educators and the admissions team — and get a first-hand look at how SSSGS supports globally mobile Indian families.",
        breadcrumb: [
          { label: "Admissions", href: "/admissions" },
          { label: "Open House", href: "/open-house" },
        ],
      }}
      ctaTitle="Can't make the next Open House?"
      ctaSubtitle="Book a private campus tour at a time that suits you."
    >
      <ContentSection flush title="At our Open House, you will" eyebrow="What to expect">
        <FeatureGrid items={youWill} cols={2} />
        <div className="mt-6 p-5 bg-[var(--brand-cream)] border-l-4 border-[var(--brand-accent)] rounded-r-md">
          <div className="text-xs font-bold uppercase tracking-wide text-[var(--brand-accent)]">Dates</div>
          <p className="mt-2 text-slate-700 leading-relaxed text-[15px]">
            We look forward to meeting you and your family. Dates of upcoming Open Houses are shared by email and on our calendar — register your interest below to be the first to know.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/inquire-book-a-tour" className="px-5 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-[13px] font-bold hover:bg-[var(--brand-accent-dark)] transition">
              Register your interest
            </Link>
            <Link href="/calendar" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition">
              School calendar
            </Link>
          </div>
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
