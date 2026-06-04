export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  grade?: string;
};

type Props = {
  items: Testimonial[];
  title?: string;
  intro?: string;
};

const ornaments = ["Real Parents.", "Parent Voices.", "Real Stories."];

export default function TestimonialsGrid({
  items,
  title = "Parents' Testimonials",
  intro = "Real parents. Real experiences. What families say about life and learning at SSSGS.",
}: Props) {
  return (
    <section className="py-16 lg:py-20 bg-[var(--brand-cream)] relative overflow-hidden">
      {/* Background orbs */}
      <span
        aria-hidden
        className="absolute -top-32 right-12 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(234,88,12,0.10), transparent)" }}
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(13,138,135,0.08), transparent)" }}
      />
      <div className="section-shell relative">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-tight text-[var(--brand-navy)] tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-[15px] text-slate-600 max-w-2xl mx-auto">{intro}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {items.slice(0, 3).map((t, i) => (
            <article
              key={i}
              className="relative rounded-[20px] bg-white border border-[var(--brand-rule)] p-7 lg:p-8 flex flex-col"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              {/* Corner ornaments */}
              <span aria-hidden className="absolute top-3 left-3 text-[var(--brand-accent)] text-xl">✦</span>
              <span aria-hidden className="absolute top-3 right-3 text-[var(--brand-accent)] text-xl">✦</span>
              <span aria-hidden className="absolute bottom-3 left-3 text-[var(--brand-accent)] text-xl">✦</span>
              <span aria-hidden className="absolute bottom-3 right-3 text-[var(--brand-accent)] text-xl">✦</span>

              <div className="text-center mb-3">
                <h3 className="font-display text-[22px] lg:text-[26px] leading-tight">
                  <span className="block text-[var(--brand-navy)] italic">{ornaments[i]?.split(" ")[0]}</span>
                  <span className="block text-[var(--brand-accent)] italic">{ornaments[i]?.split(" ").slice(1).join(" ")}</span>
                </h3>
              </div>

              <p className="text-center text-[12.5px] text-slate-500 mb-5">
                {i === 0
                  ? "A PTM experience that goes beyond marks and supports each child's growth."
                  : i === 1
                  ? "A PTM experience that helps children settle, speak and grow with confidence."
                  : "A PTM experience that values journey and supports meaningful learning."}
              </p>

              <div className="flex-1">
                <div className="text-[var(--brand-accent)] text-3xl leading-none">&ldquo;</div>
                <blockquote className="mt-1 text-[13.5px] leading-relaxed text-slate-700">
                  {t.quote}
                </blockquote>
                <div className="text-right text-[var(--brand-accent)] text-3xl leading-none mt-2">&rdquo;</div>
              </div>

              <div className="mt-5 flex flex-col items-center">
                <span
                  className="h-12 w-12 rounded-full grid place-items-center text-white font-display font-bold text-[15px] shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
                  }}
                >
                  {t.author
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
                <div className="mt-2 text-[12.5px] font-bold text-[var(--brand-navy)]">
                  {t.author} of {t.grade}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
