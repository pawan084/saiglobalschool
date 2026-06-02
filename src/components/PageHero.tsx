import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  breadcrumb?: { label: string; href: string }[];
  tone?: "teal" | "navy" | "cream";
};

const tones = {
  teal: "from-[var(--brand-primary)] to-[var(--brand-primary-dark)] text-white",
  navy: "from-[var(--brand-navy)] to-[#1e293b] text-white",
  cream: "from-[var(--brand-cream)] to-white text-[var(--brand-navy)]",
} as const;

export default function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumb = [],
  tone = "teal",
}: Props) {
  const onLight = tone === "cream";
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${tones[tone]} pt-8 lg:pt-12 pb-12 lg:pb-16`}>
      {/* Decorative orbs */}
      {!onLight && (
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
      {/* Dot pattern */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

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
        <h1 className="font-display text-[30px] sm:text-[36px] lg:text-[44px] font-bold news-headline leading-[1.08] tracking-tight max-w-3xl">
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
