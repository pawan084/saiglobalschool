import Image from "next/image";
import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Values Integration with Academics",
  description:
    "How Sri Sathya Sai Global School integrates values into Language, Maths, Science, Social Science and classroom culture.",
  alternates: { canonical: "/values-integration-academics" },
};

const subjectIntegration = [
  {
    iconName: "book-open",
    title: "In Language",
    body: "Stories, discussion questions and writing prompts help children name values and connect them with choices.",
  },
  {
    iconName: "flask",
    title: "In Science",
    body: "Ethics, environment, care and responsibility are framed alongside observation, evidence and explanation.",
  },
  {
    iconName: "calculator",
    title: "In Maths",
    body: "Honest effort, peer support, precision and reasoning aloud are built into the way practice happens.",
  },
  {
    iconName: "globe",
    title: "In Social Science",
    body: "Children learn fairness, empathy for context and respect for multiple perspectives.",
  },
];

const visibleOutcomes = [
  { label: "Classroom language", detail: "Teachers use value vocabulary during ordinary lessons, not only during assemblies." },
  { label: "Reflection prompts", detail: "Students connect content with choices, consequences and care for others." },
  { label: "Assessment feedback", detail: "Feedback notices effort, collaboration and confidence as well as marks." },
  { label: "Peer interaction", detail: "Group work becomes a place to practise fairness, patience and shared responsibility." },
];

const proofLinks = [
  { label: "Human Excellence", href: "/human-excellence" },
  { label: "Character Development", href: "/character-development" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Learning Labs", href: "/learning-labs" },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="values-integration-academics"
      hero={{
        eyebrow: "About SSSGS",
        title: "Values Integration with Academics",
        lead: "Values are not an extra subject. They are integrated into the way subjects across the curriculum are taught.",
        breadcrumb: [
          { label: "About", href: "/about-us" },
          { label: "Values & Academics", href: "/values-integration-academics" },
        ],
      }}
      ctaTitle="See values-led learning in class"
      ctaSubtitle="Book a visit and see how academic learning and character formation work together at SSSGS."
    >
      <ContentSection flush>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.8fr)] lg:items-center">
          <div className="space-y-4 text-[15.5px] leading-relaxed text-slate-700">
            <p>
              Values integration means children meet Sathya, Dharma, Shanti, Prema and Ahimsa inside real learning moments: a story discussion, a science question, a group task or a maths mistake that needs patience.
            </p>
            <p>
              The aim is practical. Students learn content while also practising honesty, respect, focus, care and responsibility.
            </p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[var(--brand-rule)] bg-slate-100">
            <Image
              src="/img/home/about-sssgs/values-integration.jpg"
              alt="Values integrated with academic learning at SSSGS"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="By subject" title="How integration works across academics">
        <FeatureGrid items={subjectIntegration} cols={4} />
      </ContentSection>

      <ContentSection flush eyebrow="What parents can notice" title="Visible signs of values-led academics">
        <div className="grid gap-3 sm:grid-cols-2">
          {visibleOutcomes.map((item) => (
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
