import Image from "next/image";
import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  breadcrumb?: { label: string; href: string }[];
  tone?: "teal" | "navy" | "cream";
  /** Optional decorative background image. When set, the gradient tone is
   *  layered on top at reduced opacity so the page title stays legible. */
  image?: string;
  imageAlt?: string;
  /** object-position for the background image. */
  imagePosition?: "center" | "top" | "bottom";
};

const tones = {
  teal: "from-[var(--brand-primary)] to-[var(--brand-primary-dark)] text-white",
  navy: "from-[var(--brand-navy)] to-[#1e293b] text-white",
  cream: "from-[var(--brand-cream)] to-white text-[var(--brand-navy)]",
} as const;

const POS_CLASS = { center: "object-center", top: "object-top", bottom: "object-bottom" } as const;

export default function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumb = [],
  tone = "teal",
  image,
  imageAlt,
  imagePosition = "center",
}: Props) {
  const onLight = tone === "cream";
  // When an image backdrop is supplied the section's own gradient is
  // suppressed so the photo shows through; a scrim layered on top keeps
  // foreground text legible. Tone still drives the scrim colour + text.
  const sectionBg = image ? "" : `bg-gradient-to-br ${tones[tone]}`;
  const sectionText = onLight ? "text-[var(--brand-navy)]" : "text-white";
  return (
    <section className={`relative overflow-hidden ${sectionBg} ${image ? sectionText : ""} pt-8 lg:pt-12 pb-12 lg:pb-16`}>
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            sizes="100vw"
            preload
            fetchPriority="high"
            loading="eager"
            className={`object-cover ${POS_CLASS[imagePosition]}`}
          />
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: onLight
                ? "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.40))"
                : "linear-gradient(110deg, rgba(11,29,51,0.78) 0%, rgba(11,29,51,0.60) 45%, rgba(13,138,135,0.38) 100%)",
            }}
          />
        </>
      )}
      {/* Decorative orbs (skipped when an image backdrop is present) */}
      {!onLight && !image && (
        <>
          <span
            aria-hidden
            className="absolute -top-40 -right-20 w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.10), transparent)" }}
          />
          <span
            aria-hidden
            className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(closest-side, rgba(234,88,12,0.16), transparent)" }}
          />
        </>
      )}
      {/* Dot pattern (skipped when image backdrop is present) */}
      {!image && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
      )}

      <div className="section-shell relative">
        {breadcrumb.length > 0 && (
          <nav
            className={`flex gap-2 text-[12px] mb-3 ${onLight ? "text-slate-600" : "text-white/75"}`}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:underline">Home</Link>
            {breadcrumb.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="opacity-60">›</span>
                <Link href={c.href} className="hover:underline">{c.label}</Link>
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10.5px] font-bold uppercase tracking-[0.14em] mb-4 ${
              onLight
                ? "bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] border border-[var(--brand-accent)]/30"
                : "bg-white/10 text-white border border-white/15 backdrop-blur"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${onLight ? "bg-[var(--brand-accent)]" : "bg-white"}`} />
            {eyebrow}
          </div>
        )}
        {/* news-headline normally forces brand-navy, but when an image backdrop
            is in play we override to white for legibility over the scrim. */}
        <h1 className={`font-display text-[30px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.08] tracking-tight max-w-3xl ${image && !onLight ? "text-white" : "news-headline"}`}>
          {title}
        </h1>
        {lead && (
          <p className={`mt-3 text-[15.5px] lg:text-[17px] leading-relaxed max-w-3xl ${onLight ? "text-slate-700" : "text-white/90"}`}>
            {lead}
          </p>
        )}
      </div>

      {/* Wave bottom divider */}
      <svg
        aria-hidden
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 right-0 w-full h-[36px] lg:h-[48px] pointer-events-none"
      >
        <path
          d="M0,28 C 240,2 480,56 720,28 S 1200,2 1440,28 L1440,56 L0,56 Z"
          fill="white"
        />
      </svg>
    </section>
  );
}
