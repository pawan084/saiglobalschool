import Image from "next/image";
import InnerPageShell from "./InnerPageShell";
import ContentSection from "./ContentSection";
import Icon from "./Icon";
import CourseJsonLd from "./CourseJsonLd";
import BreadcrumbJsonLd from "./BreadcrumbJsonLd";
import type { Feature } from "./FeatureGrid";

type IconName = React.ComponentProps<typeof Icon>["name"];

type Props = {
  slug: string;
  subject: string;
  href: string;
  hero: { title: string; lead: string; image: string };
  quote?: { text: string; author: string };
  pillars: Feature[];
  whatYouSee?: string[];
};

export default function LabPage({
  slug,
  subject,
  href,
  hero,
  quote,
  pillars,
  whatYouSee,
}: Props) {
  return (
    <InnerPageShell
      slug={slug}
      hero={{
        eyebrow: `${subject} Lab`,
        title: hero.title,
        lead: hero.lead,
        breadcrumb: [
          { label: "Academics", href: "/academics" },
          { label: "Learning Labs", href: "/learning-labs" },
          { label: `${subject} Lab`, href },
        ],
      }}
      ctaTitle={`Want to see the ${subject} Lab?`}
      ctaSubtitle="Book a campus tour and visit our learning labs in person."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Learning Labs", href: "/learning-labs" },
          { label: `${subject} Lab`, href },
        ]}
      />
      <CourseJsonLd
        name={`${subject} Lab — Primary and secondary school`}
        description={hero.lead}
        path={href}
        grades="Primary and secondary school"
      />

      {/* Image + quote band */}
      <ContentSection flush>
        <div className="grid lg:grid-cols-5 gap-5 items-stretch">
          <div className="lg:col-span-3 relative aspect-[4/3] rounded-md overflow-hidden">
            <Image
              src={hero.image}
              alt={`${subject} Lab at SSSGS`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {quote ? (
            <blockquote className="lg:col-span-2 self-center px-2">
              <span className="text-[var(--brand-accent)] text-4xl leading-none block">&ldquo;</span>
              <p className="mt-1 text-[18px] lg:text-[20px] font-bold italic text-[var(--brand-navy)] leading-snug">
                {quote.text}
              </p>
              <footer className="mt-3 text-xs not-italic font-bold uppercase tracking-wide text-[var(--brand-accent)]">
                — {quote.author}
              </footer>
            </blockquote>
          ) : (
            <div className="lg:col-span-2 p-6 bg-[var(--brand-cream)] rounded-md" />
          )}
        </div>
      </ContentSection>

      {/* Pillars — numbered cards; grid adapts to pillar count */}
      <ContentSection flush tone="cream" eyebrow="Why it works" title={`Why ${subject} learning works at SSSGS`}>
        <div
          className={
            pillars.length === 4
              ? "grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
              : "grid sm:grid-cols-3 gap-3"
          }
        >
          {pillars.map((p, i) => (
            <article
              key={p.title}
              className="card card-hover relative p-4 pt-12"
            >
              <span className="absolute top-3 left-3 h-9 w-9 grid place-items-center rounded-lg bg-[var(--brand-primary-tint)] text-[var(--brand-primary)]">
                {p.iconName ? <Icon name={p.iconName as IconName} size={18} /> : <Icon name="arrow-right" size={18} />}
              </span>
              <span className="absolute top-3 right-3 text-[11px] font-bold text-slate-500">
                0{i + 1}
              </span>
              <h3 className="font-bold text-[var(--brand-navy)]">{p.title}</h3>
              {p.body && (
                <p className="mt-1.5 text-[13.5px] text-slate-600 leading-relaxed">{p.body}</p>
              )}
            </article>
          ))}
        </div>
      </ContentSection>

      {/* What you'd see */}
      {whatYouSee && whatYouSee.length > 0 && (
        <ContentSection flush eyebrow="In the lab" title="What you'd see students doing">
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {whatYouSee.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 p-3 bg-white border border-[var(--brand-rule)] rounded text-[14px]"
              >
                <span className="h-6 w-6 shrink-0 grid place-items-center rounded-full bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] font-bold text-xs">
                  ✓
                </span>
                <span className="text-slate-700">{s}</span>
              </li>
            ))}
          </ul>
        </ContentSection>
      )}
    </InnerPageShell>
  );
}
