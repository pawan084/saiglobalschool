import Link from "next/link";

const popular = [
  { label: "About SSSGS", href: "/about-us" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Admission Process", href: "/admission-process" },
  { label: "Inquire / Book a Tour", href: "/inquire-book-a-tour" },
  { label: "Fee Structure", href: "/fee-structure" },
  { label: "Contact Us", href: "/contact-us" },
];

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="section-shell py-20 lg:py-28">
      <div className="max-w-2xl">
        <div className="news-eyebrow mb-2">Lost?</div>
        <h1 className="text-4xl lg:text-5xl font-extrabold news-headline">
          404 — We couldn&rsquo;t find that page
        </h1>
        <p className="mt-4 text-slate-600 text-[16px] leading-relaxed">
          The page might have been moved, renamed, or never existed. Try one of the popular
          destinations below, or get in touch.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          {popular.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="p-4 rounded border border-[var(--brand-rule)] bg-white hover:border-[var(--brand-primary)] hover:shadow-sm transition flex items-center justify-between group"
            >
              <span className="font-bold text-[var(--brand-navy)] group-hover:text-[var(--brand-primary)]">
                {p.label}
              </span>
              <span className="text-[var(--brand-accent)] font-bold">→</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex gap-3 flex-wrap">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-[13px] font-bold hover:bg-[var(--brand-accent-dark)] transition"
          >
            Back to home
          </Link>
          <Link
            href="/contact-us"
            className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
