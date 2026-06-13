import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";

type Card = {
  title: string;
  body?: string;
  image: string;
  imageAlt?: string;
  /** object-position for the image — useful for portraits (use "top") or full bleed. */
  imagePosition?: "center" | "top" | "bottom";
  /** "cover" crops to fill; "contain" fits the full image into the frame. */
  imageFit?: "cover" | "contain";
  href: string;
  ctaLabel?: string;
};

const POS_CLASS = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
} as const;

type Props = {
  title: string;
  intro: string;
  featured: Card;
  items: [Card, Card, Card] | Card[];
  /** Background variant: white, mist (cool pastel), cream (warm pastel) */
  tone?: "white" | "mist" | "cream";
  /** Mark this block's featured image as the LCP candidate (first FeatureBlock on the page only). */
  priorityFeatured?: boolean;
};

const toneClasses = {
  white: "bg-white",
  mist: "bg-gradient-to-b from-[#e6ecf9] via-[#eef0fc] to-[#f3eafa]",
  cream: "bg-gradient-to-b from-[#fef6ea] via-[#fdf2e4] to-[#fbece1]",
} as const;

// Decorative orb gradients per tone
const orbBgs = {
  white: { a: "radial-gradient(closest-side, rgba(13,138,135,0.08), transparent)", b: "radial-gradient(closest-side, rgba(234,88,12,0.06), transparent)" },
  mist:  { a: "radial-gradient(closest-side, rgba(99,102,241,0.18), transparent)", b: "radial-gradient(closest-side, rgba(13,138,135,0.12), transparent)" },
  cream: { a: "radial-gradient(closest-side, rgba(234,88,12,0.16), transparent)", b: "radial-gradient(closest-side, rgba(217,119,6,0.10), transparent)" },
} as const;

export default function FeatureBlock({
  title,
  intro,
  featured,
  items,
  tone = "white",
  priorityFeatured = false,
}: Props) {
  const orb = orbBgs[tone];
  return (
    <section className={`${toneClasses[tone]} relative overflow-hidden py-10 lg:py-14`}>
      {/* Decorative gradient orbs — subtle slow drift gives the page quiet life. */}
      <span
        aria-hidden
        className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full pointer-events-none orb-drift-a"
        style={{ background: orb.a }}
      />
      <span
        aria-hidden
        className="absolute -bottom-32 -right-24 w-[520px] h-[520px] rounded-full pointer-events-none orb-drift-b"
        style={{ background: orb.b }}
      />
      {/* Subtle grid texture */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
          color: "var(--brand-navy)",
        }}
      />

      <div className="section-shell relative">
        {/* Header split: title left, intro right */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mb-6 lg:mb-8">
          <div>
            <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold leading-[1.12] tracking-tight text-[var(--brand-navy)]">
              {title}
            </h2>
            {/* Decorative serif flourish */}
            <svg
              aria-hidden
              viewBox="0 0 100 12"
              className="mt-3 h-[12px] w-[100px] text-[var(--brand-accent)]"
            >
              <path
                d="M2 6 C 20 0, 35 12, 50 6 S 78 0, 98 6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-[14.5px] lg:text-[15.5px] leading-relaxed text-slate-700 md:pt-2">
            {intro}
          </p>
        </div>

        {/* Featured card */}
        <article
          className="card-fancy group relative rounded-[22px] bg-white border border-[var(--brand-rule)] overflow-hidden mb-6 transition"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <div className="grid md:grid-cols-2 items-stretch">
            <div className={`relative aspect-[5/4] md:aspect-auto md:min-h-[340px] ${
              featured.imageFit === "contain" ? "bg-[var(--brand-cream)]" : "bg-slate-100"
            }`}>
              <Image
                src={featured.image}
                alt={featured.imageAlt ?? featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                {...(priorityFeatured
                  ? { preload: true, fetchPriority: "high" as const, loading: "eager" as const }
                  : {})}
                className={`${featured.imageFit === "contain" ? "object-contain" : "object-cover"} ${POS_CLASS[featured.imagePosition ?? "center"]}`}
              />
            </div>
            <div className="p-7 lg:p-10 flex flex-col justify-center relative">
              <h3 className="text-[22px] lg:text-[27px] font-bold leading-tight text-[var(--brand-navy)] tracking-tight">
                {featured.title}
              </h3>
              {featured.body && (
                <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600 line-clamp-none sm:line-clamp-4">
                  {featured.body}
                </p>
              )}
              <Link href={featured.href} className="learn-more-pill mt-7">
                {featured.ctaLabel ?? "Learn more"}
                <span className="learn-more-arrow">
                  <Icon name="arrow-right" size={16} />
                </span>
              </Link>
            </div>
          </div>
        </article>

        {/* Satellite row: up to 6 cards (2 rows of 3).
            Two slots are conditionally reserved to keep cards aligned without
            wasting space when no card in the visual row needs the room:
            - body slot (~43px): reserved when ANY card in the grid has a body
              (one body across all cards still pushes the rest down)
            - title 2nd line (~22px): reserved per row-of-3 — so a row of
              all-short titles drops the reservation even if the OTHER row
              has long titles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {(() => {
            const sliced = items.slice(0, 6);
            const anyBody = sliced.some((c) => !!c.body);
            // Compute per-row (group of 3) whether that row needs 2-line titles
            const rowNeedsTwoLine = [0, 1].map((row) =>
              sliced.slice(row * 3, row * 3 + 3).some((c) => c.title.length > 30),
            );
            return sliced.map((c, i) => (
              <SatelliteCard
                key={c.title}
                card={c}
                reserveBodySlot={anyBody}
                reserveTwoLineTitle={rowNeedsTwoLine[Math.floor(i / 3)]}
              />
            ));
          })()}
        </div>
      </div>

      {/* Bottom wave divider */}
      <svg
        aria-hidden
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 right-0 w-full h-[44px] lg:h-[56px] pointer-events-none"
      >
        <path
          d="M0,32 C 240,0 480,64 720,32 S 1200,0 1440,32 L1440,64 L0,64 Z"
          fill="white"
          fillOpacity="0.85"
        />
      </svg>
    </section>
  );
}

function SatelliteCard({
  card,
  reserveBodySlot = true,
  reserveTwoLineTitle = true,
}: {
  card: Card;
  reserveBodySlot?: boolean;
  reserveTwoLineTitle?: boolean;
}) {
  return (
    <article
      className="card-fancy group relative rounded-[22px] bg-white border border-[var(--brand-rule)] overflow-hidden flex flex-col transition"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="p-6 pb-3 relative z-[1]">
        {/* Title and body slot reservations are controlled by the parent so a
            row of uniformly short titles doesn't carry a blank second line. */}
        <h4 className={`text-[18px] lg:text-[19px] font-bold leading-tight text-[var(--brand-navy)] tracking-tight line-clamp-2 ${reserveTwoLineTitle ? "min-h-[2.6rem]" : ""}`}>
          {card.title}
        </h4>
        {(card.body || reserveBodySlot) && (
          <div className={`mt-3 ${reserveBodySlot ? "min-h-[2.7rem]" : ""}`}>
            {card.body && (
              <p className="text-[13.5px] leading-relaxed text-slate-600 line-clamp-none sm:line-clamp-2">{card.body}</p>
            )}
          </div>
        )}
      </div>
      <div className="px-5 pb-5 relative z-[1]">
        <div className={`relative aspect-[4/3] overflow-hidden rounded-xl ${
          card.imageFit === "contain" ? "bg-[var(--brand-cream)]" : "bg-slate-100"
        }`}>
          <Image
            src={card.image}
            alt={card.imageAlt ?? card.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`${card.imageFit === "contain" ? "object-contain" : "object-cover"} ${POS_CLASS[card.imagePosition ?? "center"]}`}
          />
        </div>
      </div>
      <div className="px-6 pb-6 mt-auto relative z-[1]">
        <Link href={card.href} className="learn-more-pill !bg-[var(--brand-navy)] !text-white !pl-5 !pr-5">
          {card.ctaLabel ?? "Learn more"}
        </Link>
      </div>

      {/* Sheen on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[0]"
        style={{
          background:
            "radial-gradient(circle at 30% 0%, rgba(13,138,135,0.07), transparent 55%)",
        }}
      />
    </article>
  );
}
