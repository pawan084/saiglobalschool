import Image from "next/image";
import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Parent Community",
  description:
    "How parents engage at Sri Sathya Sai Global School through communication, meetings, events and shared support.",
  alternates: { canonical: "/parent-community" },
};

const engagement = [
  {
    iconName: "calendar",
    title: "Regular meetings",
    body: "4 PTMs in a year and topic-specific sessions give parents a steady rhythm for updates and questions.",
  },
  {
    iconName: "chat",
    title: "Clear communication",
    body: "Families stay informed through school channels for reminders, updates, homework and follow-up.",
  },
  {
    iconName: "users",
    title: "Shared transition support",
    body: "Parents of new and relocating children find a community that understands settling-in questions.",
  },
  {
    iconName: "sparkle",
    title: "Events and celebrations",
    body: "School events, showcases and celebrations give parents a visible role in the life of the school.",
  },
];

const parentExperience = [
  { label: "You know whom to contact", detail: "Class teacher, school office, admissions and leadership channels are clear." },
  { label: "You see progress regularly", detail: "PTMs, reports and informal updates help families understand growth and next steps." },
  { label: "You are part of the culture", detail: "Parent participation supports the values, routines and community children experience." },
  { label: "You are not left guessing", detail: "Dates, events, policies and practical information are gathered through parent resources." },
];

const proofLinks = [
  { label: "Management & Governance", href: "/management-governance" },
  { label: "Parent-Student Handbook", href: "/parent-student-handbook" },
  { label: "Calendar", href: "/calendar" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="parent-community"
      hero={{
        eyebrow: "About SSSGS",
        title: "Parent Community",
        lead: "An active parent community that supports the school, supports each other, and supports children as they grow.",
        breadcrumb: [
          { label: "About", href: "/about-us" },
          { label: "Parent Community", href: "/parent-community" },
        ],
      }}
      ctaTitle="Meet the community behind the school"
      ctaSubtitle="Book a campus visit and see how parents, teachers and school leadership stay connected."
    >
      <ContentSection flush>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.8fr)] lg:items-center">
          <div className="space-y-4 text-[15.5px] leading-relaxed text-slate-700">
            <p>
              Parents are partners in the SSSGS experience. Communication, meetings, school events and parent resources help families stay connected to classroom life and school culture.
            </p>
            <p>
              This matters especially for children joining mid-year or moving between countries and curricula: a steady parent community makes the transition feel less lonely.
            </p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[var(--brand-rule)] bg-slate-100">
            <Image
              src="/img/navbar/about/about-us/parent-support.jpg"
              alt="Parent community and school support at SSSGS"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="How parents engage" title="A community built around communication and support">
        <FeatureGrid items={engagement} cols={4} />
      </ContentSection>

      <ContentSection flush eyebrow="What families experience" title="How parent partnership feels in practice">
        <div className="grid gap-3 sm:grid-cols-2">
          {parentExperience.map((item) => (
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
