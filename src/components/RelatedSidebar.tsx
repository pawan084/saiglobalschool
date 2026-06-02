import Link from "next/link";
import NewsCard from "./NewsCard";
import type { NewsCardProps } from "./NewsCard";

type CardSpec = Omit<NewsCardProps, "variant">;

type Props = {
  sectionLabel: string;
  sectionHref: string;
  items: CardSpec[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function RelatedSidebar({
  sectionLabel,
  sectionHref,
  items,
  ctaLabel,
  ctaHref,
}: Props) {
  return (
    <aside className="lg:sticky lg:top-24 self-start">
      <div className="border-t-2 border-[var(--brand-accent)] pt-3 mb-3 flex items-center justify-between">
        <h3 className="text-[12px] font-extrabold tracking-[0.08em] uppercase text-[var(--brand-navy)]">
          More from {sectionLabel}
        </h3>
        <Link
          href={sectionHref}
          className="text-[11px] font-bold tracking-wide uppercase text-[var(--brand-accent)] hover:text-[var(--brand-accent-dark)]"
        >
          All →
        </Link>
      </div>
      <ul className="divide-y divide-[var(--brand-rule)]">
        {items.slice(0, 5).map((it, i) => (
          <li key={i} className="py-3 first:pt-0 last:pb-0">
            <NewsCard {...it} variant="compact" />
          </li>
        ))}
      </ul>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-5 block text-center px-4 py-2.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-dark)] text-white text-[13px] font-bold transition"
        >
          {ctaLabel}
        </Link>
      )}
    </aside>
  );
}
