import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";

type Card = {
  title: string;
  body: string;
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
}: Props) {
  const orb = orbBgs[tone];
  return (
    <section className={`${toneClasses[tone]} relative overflow-hidden py-16 lg:py-20`}>
      {/* Decorative gradient orbs */}
      <span
        aria-hidden
        className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full pointer-events-none"
        style={{ background: orb.a }}
      />
      <span
        aria-hidden
        className="absolute -bottom-32 -right-24 w-[520px] h-[520px] rounded-full pointer-events-none"
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
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mb-10 lg:mb-14">
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
          className="card-fancy relative rounded-[22px] bg-white border border-[var(--brand-rule)] overflow-hidden mb-6 transition"
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
                className={`${featured.imageFit === "contain" ? "object-contain p-6" : "object-cover"} ${POS_CLASS[featured.imagePosition ?? "center"]} transition-transform duration-700`}
              />
              {/* Soft vignette */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                  background:
                    "linear-gradient(to right, rgba(11,29,51,0.25), transparent 25%, transparent 80%, rgba(11,29,51,0.12))",
                }}
              />
            </div>
            <div className="p-7 lg:p-10 flex flex-col justify-center relative">
              <h3 className="text-[22px] lg:text-[27px] font-bold leading-tight text-[var(--brand-navy)] tracking-tight">
                {featured.title}
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600">
                {featured.body}
              </p>
              <Link href={featured.href} className="learn-more-pill mt-7">
                {featured.ctaLabel ?? "Learn more"}
                <span className="learn-more-arrow">
                  <Icon name="arrow-right" size={16} />
                </span>
              </Link>
            </div>
          </div>
        </article>

        {/* Satellite row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {items.slice(0, 3).map((c) => (
            <SatelliteCard key={c.title} card={c} />
          ))}
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

function SatelliteCard({ card }: { card: Card }) {
  return (
    <article
      className="card-fancy group relative rounded-[22px] bg-white border border-[var(--brand-rule)] overflow-hidden flex flex-col transition"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="p-6 pb-5 relative z-[1]">
        <h4 className="text-[18px] lg:text-[19px] font-bold leading-tight text-[var(--brand-navy)] tracking-tight">
          {card.title}
        </h4>
        <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">{card.body}</p>
      </div>
      <div className="px-5 pb-5 relative z-[1]">
        <div className={`relative aspect-[4/3] rounded-xl overflow-hidden ${
          card.imageFit === "contain" ? "bg-[var(--brand-cream)]" : "bg-slate-100"
        }`}>
          <Image
            src={card.image}
            alt={card.imageAlt ?? card.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`${card.imageFit === "contain" ? "object-contain p-3" : "object-cover"} ${POS_CLASS[card.imagePosition ?? "center"]} transition-transform duration-700 group-hover:scale-[1.04]`}
          />
        </div>
      </div>
      <div className="px-6 pb-6 mt-auto relative z-[1]">
        <Link href={card.href} className="learn-more-pill !bg-[var(--brand-navy)] !text-white !pl-5 !pr-5">
          {card.ctaLabel ?? "Learn More"}
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
