import Link from "next/link";
import NewsCard, { type NewsCardProps } from "./NewsCard";

type CardSpec = Omit<NewsCardProps, "variant">;

type Props = {
  title: string;
  sectionHref?: string;
  main: CardSpec;
  satellites: CardSpec[];
  accent?: "teal" | "orange" | "navy";
};

const accents = {
  teal: "border-[var(--brand-primary)]",
  orange: "border-[var(--brand-accent)]",
  navy: "border-[var(--brand-navy)]",
} as const;

export default function RelatedNewsSection({
  title,
  sectionHref,
  main,
  satellites,
  accent = "teal",
}: Props) {
  return (
    <section className="py-8 lg:py-10 bg-[var(--brand-cream)]">
      <div className="section-shell">
        <div className={`flex items-center justify-between mb-4 pb-2 border-b-2 ${accents[accent]}`}>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--brand-navy)]">
            {title}
          </h2>
          {sectionHref && (
            <Link
              href={sectionHref}
              className="text-xs font-bold text-[var(--brand-accent)] hover:text-[var(--brand-accent-dark)] uppercase tracking-wide"
            >
              See all →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          <div className="lg:col-span-7 lg:border-r lg:border-[var(--brand-rule)] lg:pr-5">
            <NewsCard {...main} variant="hero" />
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 lg:gap-5">
            {satellites.slice(0, 4).map((s, i) => (
              <NewsCard key={i} {...s} variant="feature" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
