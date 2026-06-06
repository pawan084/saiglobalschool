import Image from "next/image";
import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Human Excellence",
  description:
    "Human Excellence at Sri Sathya Sai Global School: competence, character and contribution developed through academics, conduct, reflection and service.",
  alternates: { canonical: "/human-excellence" },
};

const commitments = [
  {
    iconName: "lightbulb",
    title: "Competence",
    body: "Students build mastery of the academic core and learn to apply ideas in real classroom, lab and project situations.",
  },
  {
    iconName: "heart",
    title: "Character",
    body: "Honesty, courage, empathy, restraint and gratitude are practised as daily habits, not treated as a separate lesson.",
  },
  {
    iconName: "handshake",
    title: "Contribution",
    body: "Children learn to serve at home, in school and in community life through responsibility, teamwork and care.",
  },
];

const dailyPractices = [
  {
    iconName: "book-open",
    title: "In academics",
    body: "Teachers look for effort, curiosity, reasoning aloud and the confidence to keep improving.",
  },
  {
    iconName: "users",
    title: "In conduct",
    body: "Classroom routines reward respect, empathy, honesty and repair when something goes wrong.",
  },
  {
    iconName: "sparkle",
    title: "In reflection",
    body: "Morning and closing moments help children pause, notice choices and connect learning with values.",
  },
  {
    iconName: "leaf",
    title: "In service",
    body: "Students practise responsibility through group roles, peer support and service-minded school activities.",
  },
];

const observedThrough = [
  { label: "Teacher feedback", detail: "Progress notes include habits, confidence and participation alongside academic learning." },
  { label: "PTMs", detail: "Parent-teacher meetings discuss the whole child: strengths, support needs, routines and goals." },
  { label: "Group work", detail: "Collaboration shows responsibility, listening, fairness and the ability to help others learn." },
  { label: "Student responsibility", detail: "Class roles and daily routines create small, repeated chances to practise leadership." },
];

const proofLinks = [
  { label: "Character Development", href: "/character-development" },
  { label: "Values & Academics", href: "/values-integration-academics" },
  { label: "A Day at SSSGS", href: "/a-day-at-sssgs" },
  { label: "Parent-Student Handbook", href: "/parent-student-handbook" },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="human-excellence"
      hero={{
        eyebrow: "About SSSGS",
        title: "Human Excellence",
        lead: "Pursuing excellence in being human — competence, character and contribution. The SSSGS pedagogy puts these on equal footing.",
        breadcrumb: [
          { label: "About", href: "/about-us" },
          { label: "Human Excellence", href: "/human-excellence" },
        ],
      }}
      ctaTitle="Visit SSSGS and see character in action"
      ctaSubtitle="A campus visit shows how competence, conduct and contribution are built into ordinary school life."
    >
      <ContentSection flush>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.8fr)] lg:items-center">
          <div className="space-y-4 text-[15.5px] leading-relaxed text-slate-700">
            <p>
              Human excellence is more than academic achievement. It is the practised craft of becoming a thoughtful, capable and contributing person — the kind of person any community is glad to count.
            </p>
            <p>
              At SSSGS, this work happens through lessons, routines, reflection, feedback and the way children learn to treat one another every day.
            </p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[var(--brand-rule)] bg-slate-100">
            <Image
              src="/img/home/about-sssgs/human-excellence.jpg"
              alt="Students developing human excellence at SSSGS"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Three commitments" title="Competence, character and contribution">
        <FeatureGrid items={commitments} cols={3} />
      </ContentSection>

      <ContentSection flush eyebrow="Daily practice" title="How human excellence shows up in school life">
        <FeatureGrid items={dailyPractices} cols={4} />
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="How it is observed" title="What teachers and parents can actually see">
        <div className="grid gap-3 sm:grid-cols-2">
          {observedThrough.map((item) => (
            <article key={item.label} className="rounded-lg border border-[var(--brand-rule)] bg-white p-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--brand-primary-tint)] text-[var(--brand-primary)]">
                  <Icon name="check" size={15} />
                </span>
                <div>
                  <h3 className="font-bold leading-tight text-[var(--brand-navy)]">{item.label}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-slate-600">{item.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection flush eyebrow="Explore further" title="Related pages parents often check">
        <div className="flex flex-wrap gap-2">
          {proofLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-rule-strong)] bg-white px-4 py-2 text-[13px] font-bold text-[var(--brand-navy)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              {link.label}
              <Icon name="arrow-right" size={13} />
            </Link>
          ))}
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
