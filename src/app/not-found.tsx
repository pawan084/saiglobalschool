import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import Icon from "@/components/Icon";
import CTAStrip from "@/components/CTAStrip";

const popular = [
  { label: "About SSSGS",            href: "/about-us",            icon: "school" as const },
  { label: "Curriculum",             href: "/curriculum",          icon: "book-open" as const },
  { label: "Admission Process",      href: "/admission-process",   icon: "document" as const },
  { label: "Inquire / Book a Tour",  href: "/inquire-book-a-tour", icon: "calendar" as const },
  { label: "Fee Structure",          href: "/fee-structure",       icon: "credit-card" as const },
  { label: "Contact Us",             href: "/contact-us",          icon: "mail" as const },
];

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--brand-cream)] via-white to-[#eef0fc] py-20 lg:py-28">
        {/* Decorative blobs */}
        <span
          aria-hidden
          className="absolute -top-20 -left-24 w-[420px] h-[420px] rounded-full opacity-[0.35] pointer-events-none"
          style={{ background: "radial-gradient(closest-side, rgba(13,138,135,0.18), transparent)" }}
        />
        <span
          aria-hidden
          className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full opacity-[0.30] pointer-events-none"
          style={{ background: "radial-gradient(closest-side, rgba(234,88,12,0.16), transparent)" }}
        />

        <div className="section-shell relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--brand-rule)] text-[11px] font-bold tracking-[0.14em] uppercase mb-5 text-[var(--brand-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)]" />
              404 · Not found
            </div>
            <h1 className="font-display text-[42px] sm:text-[52px] lg:text-[64px] font-bold leading-[1.05] tracking-tight text-[var(--brand-navy)]">
              We couldn&rsquo;t find <span className="italic font-medium text-[var(--brand-accent)]">that page.</span>
            </h1>
            <p className="mt-5 text-[16px] text-slate-600 max-w-xl leading-relaxed">
              The page might have been moved, renamed, or never existed. Try one of the popular
              destinations below — or get in touch with us directly.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="btn-primary">
                <Icon name="arrow-left" size={15} />
                Back to home
              </Link>
              <Link href="/contact-us" className="btn-secondary">
                Contact us
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>
          </div>

          {/* Brand panel */}
          <div className="relative justify-self-center lg:justify-self-end max-w-[440px] w-full">
            <div
              className="rounded-3xl bg-white border border-[var(--brand-rule)] p-8 lg:p-10 relative overflow-hidden"
              style={{ boxShadow: "var(--shadow-lg)" }}
            >
              <span
                aria-hidden
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20"
                style={{ background: "radial-gradient(closest-side, var(--brand-accent), transparent)" }}
              />
              <div className="relative flex flex-col items-center text-center">
                <BrandLogo size={120} />
                <p className="mt-5 font-display italic text-[var(--brand-navy)] text-[15px] leading-snug">
                  &ldquo;The End of Education is Character.&rdquo;
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold">
                  Sri Sathya Sai Global School
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="section-shell">
          <div className="news-eyebrow mb-2">Try these instead</div>
          <h2 className="font-display text-[24px] lg:text-[30px] font-bold text-[var(--brand-navy)] tracking-tight">
            Popular destinations
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {popular.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="card-fancy flex items-center gap-4 p-4 rounded-2xl bg-white border border-[var(--brand-rule)] group"
                style={{ boxShadow: "var(--shadow-xs)" }}
              >
                <span className="grid place-items-center h-11 w-11 rounded-xl bg-[var(--brand-primary-tint)] text-[var(--brand-primary)] shrink-0">
                  <Icon name={p.icon} size={18} />
                </span>
                <span className="flex-1 font-bold text-[var(--brand-navy)] group-hover:text-[var(--brand-primary)] transition-colors">
                  {p.label}
                </span>
                <Icon name="arrow-right" size={16} className="text-[var(--brand-accent)] shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip
        title="Looking for something specific?"
        subtitle="Our admissions team replies within one business day — by email, WhatsApp or phone."
      />
    </>
  );
}
