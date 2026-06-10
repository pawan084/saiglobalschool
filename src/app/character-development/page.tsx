import Image from "next/image";
import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Character Development at SSSGS",
  description:
    "Character development at Sri Sathya Sai Global School: daily routines, reflection, restorative conversations and values-led conduct.",
  alternates: { canonical: "/character-development" },
};

const mechanisms = [
  {
    iconName: "sparkle",
    title: "Morning circle",
    body: "Each day starts with a thought, intention or value that gives the class a shared point of focus.",
  },
  {
    iconName: "chat",
    title: "Reflective conversations",
    body: "Teachers help children understand choices, celebrate growth and repair mistakes with dignity.",
  },
  {
    iconName: "handshake",
    title: "Restorative practice",
    body: "Discipline focuses on repair, responsibility and learning rather than fear or punishment.",
  },
  {
    iconName: "palette",
    title: "Stories and role models",
    body: "Stories from across traditions make values memorable, discussable and visible in everyday decisions.",
  },
];

const valuesInAction = [
  { label: "Truth", detail: "Children are encouraged to speak honestly, own mistakes and build trust." },
  { label: "Right conduct", detail: "Routines make responsibility, punctuality and respect concrete." },
  { label: "Peace", detail: "Reflection and calm classroom rhythms help children steady attention." },
  { label: "Love", detail: "Care for peers, teachers, family and community is practised in small daily ways." },
  { label: "Non-violence", detail: "Conflict is handled through empathy, repair and respectful language." },
];

const restorativePathway = [
  {
    label: "Notice",
    detail: "A teacher first notices the pattern: a conflict, repeated disruption, exclusion, unkind language or a child struggling to self-regulate.",
  },
  {
    label: "Understand",
    detail: "The child is guided to describe what happened, who was affected, what they needed, and what choice could be made next time.",
  },
  {
    label: "Repair",
    detail: "Where appropriate, students make amends through apology, restoration, changed behaviour, peer support or a follow-up agreement.",
  },
  {
    label: "Follow up",
    detail: "Teachers monitor whether the behaviour changes and involve parents or leadership when a concern needs a wider support plan.",
  },
];

const parentProof = [
  {
    iconName: "chat",
    title: "Parents are informed",
    body: "Homeroom teachers communicate patterns early, especially when behaviour or wellbeing needs shared support between home and school.",
  },
  {
    iconName: "document",
    title: "Policies are documented",
    body: "The Parent-Student Handbook explains behaviour expectations, restorative practice, bullying response and communication channels.",
  },
  {
    iconName: "trophy",
    title: "Character is recognised",
    body: "Teachers notice and affirm character moments — honesty, helpfulness, patience, courage and responsible peer support.",
  },
  {
    iconName: "shield",
    title: "Bullying is treated seriously",
    body: "Reported incidents are addressed promptly, with attention to safety, repair, accountability and parent communication.",
  },
];

const proofLinks = [
  { label: "Human Excellence", href: "/human-excellence" },
  { label: "Values & Academics", href: "/values-integration-academics" },
  { label: "A Day at SSSGS", href: "/a-day-at-sssgs" },
  { label: "Parent-Student Handbook", href: "/parent-student-handbook" },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="character-development"
      hero={{
        eyebrow: "About SSSGS",
        title: "Character Development at SSSGS",
        lead: "Character is not a class — it is the way the whole school runs. Daily routines, conversations, conflict and reflection all shape who a child becomes.",
        breadcrumb: [
          { label: "About", href: "/about-us" },
          { label: "Character Development", href: "/character-development" },
        ],
      }}
      ctaTitle="See character development in the school day"
      ctaSubtitle="Book a visit and watch how routines, reflection and values shape ordinary classroom life."
    >
      <ContentSection flush>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.8fr)] lg:items-center">
          <div className="space-y-4 text-[15.5px] leading-relaxed text-slate-700">
            <p>
              Bhagawan Sri Sathya Sai Baba taught that the end of education is character. SSSGS takes that seriously: character development sits alongside academic learning in every grade, every day.
            </p>
            <p>
              The aim is not to add one more subject. It is to shape the school culture so children practise honesty, empathy, steadiness and responsibility in real situations.
            </p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[var(--brand-rule)] bg-slate-100">
            <Image
              src="/img/home/about-sssgs/character-development.jpg"
              alt="Character development through daily school life at SSSGS"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Daily mechanisms" title="How character is practised every day">
        <FeatureGrid items={mechanisms} cols={4} />
      </ContentSection>

      <ContentSection flush eyebrow="Five values in action" title="What children practise in ordinary moments">
        <div className="grid gap-3">
          {valuesInAction.map((item) => (
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

      <ContentSection flush tone="cream" eyebrow="When something goes wrong" title="How restorative practice works">
        <div className="grid gap-3 sm:grid-cols-2">
          {restorativePathway.map((item) => (
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

      <ContentSection flush eyebrow="Parent-facing proof" title="How families know character is taken seriously">
        <FeatureGrid items={parentProof} cols={4} />
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Explore further" title="Related pages parents often check">
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
