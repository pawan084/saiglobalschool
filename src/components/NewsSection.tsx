import Link from "next/link";
import NewsCard, { type NewsCardProps } from "./NewsCard";

type Props = {
  title: string;
  href?: string;
  main: Omit<NewsCardProps, "variant">;
  satellites: Omit<NewsCardProps, "variant">[];
  extras?: Omit<NewsCardProps, "variant">[];
  accent?: "teal" | "orange" | "navy";
  priorityHero?: boolean;
};

const accents = {
  teal: "border-[var(--brand-primary)]",
  orange: "border-[var(--brand-accent)]",
  navy: "border-[var(--brand-navy)]",
} as const;

export default function NewsSection({
  title,
  href,
  main,
  satellites,
  extras,
  accent = "teal",
  priorityHero,
}: Props) {
  return (
    <section className="py-6 lg:py-8">
      <div className={`flex items-center justify-between mb-4 pb-2 border-b-2 ${accents[accent]}`}>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--brand-navy)]">
          {title}
        </h2>
        {href && (
          <Link
            href={href}
            className="text-xs font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-dark)] uppercase tracking-wide"
          >
            See all →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
        {/* Main featured card — 7 cols */}
        <div className="lg:col-span-7 cell-hairline-r lg:pr-6">
          <NewsCard {...main} variant="hero" priority={priorityHero} />
        </div>

        {/* Satellite grid — 5 cols, 2 cols inside */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-x-5 gap-y-5">
          {satellites.slice(0, 4).map((s, i) => (
            <NewsCard key={i} {...s} variant="feature" />
          ))}
        </div>
      </div>

      {extras && extras.length > 0 && (
        <div className="mt-6 pt-5 border-t border-[var(--brand-rule)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {extras.map((e, i) => (
            <NewsCard key={i} {...e} variant="compact" />
          ))}
        </div>
      )}
    </section>
  );
}
