import Link from "next/link";
import { navigation, ctaWhatsApp } from "@/data/nav";
import { site } from "@/data/site";
import TrustBadges from "./TrustBadges";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const navCols = navigation.filter((n) => n.children).slice(0, 5);

  return (
    <footer className="relative overflow-hidden bg-[var(--brand-navy)] text-slate-300 mt-16">
      {/* Soft radial accents */}
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(closest-side, var(--brand-accent), transparent)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(closest-side, var(--brand-primary), transparent)" }}
        aria-hidden
      />
      {/* Faint dot grid */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* ── Top "Stay connected" band — lighter so it doesn't compete with page CTAStrip */}
      <div className="relative border-b border-white/10 bg-white/[0.02]">
        <div className="section-shell py-8 lg:py-9 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="grid place-items-center h-11 w-11 rounded-full bg-[var(--brand-accent)]/15 border border-[var(--brand-accent)]/30 text-[var(--brand-accent)] shrink-0">
              <Icon name="mail" size={18} />
            </span>
            <div className="leading-tight">
              <div className="news-eyebrow text-[var(--brand-accent)]">Stay connected</div>
              <div className="font-display text-[17px] lg:text-[19px] font-bold text-white mt-0.5">
                Email · WhatsApp · Phone · Open House
              </div>
            </div>
          </div>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-white/85 hover:text-white"
          >
            See all ways to reach us
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </div>

      {/* ── Main grid ──────────────────────────────────────── */}
      <div className="section-shell relative py-12 lg:py-16 grid gap-8 grid-cols-2 sm:grid-cols-3 lg:[grid-template-columns:minmax(0,1.5fr)_repeat(5,_minmax(0,1fr))]">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <span className="shrink-0 grid place-items-center h-14 w-14 rounded-xl bg-white/5 border border-white/10 p-1.5">
              <BrandLogo size={48} />
            </span>
            <div className="leading-tight">
              <div className="text-white font-display font-bold text-[18px] tracking-tight">
                Sri Sathya Sai Global School
              </div>
              <div className="text-[10.5px] text-slate-300 tracking-wide">Singapore</div>
            </div>
          </Link>

          <p className="mt-5 font-display italic text-slate-200 text-[15px] leading-snug max-w-sm">
            &ldquo;The End of Education is Character.&rdquo;
          </p>
          <p className="mt-4 text-[13px] text-slate-300 leading-relaxed max-w-sm">
            A values-rooted international school for primary and middle school in Singapore. Mid-year admissions welcome.
          </p>

          {/* Contact rows */}
          <ul className="mt-6 space-y-2 text-[13px]">
            <li>
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2.5 text-slate-200 hover:text-white">
                <span className="grid place-items-center h-7 w-7 rounded-full bg-white/5 border border-white/10 text-[var(--brand-accent)]">
                  <Icon name="phone" size={12} />
                </span>
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 text-slate-200 hover:text-white">
                <span className="grid place-items-center h-7 w-7 rounded-full bg-white/5 border border-white/10 text-[var(--brand-accent)]">
                  <Icon name="mail" size={12} />
                </span>
                <span className="truncate">{site.email}</span>
              </a>
            </li>
            <li>
              <a href={ctaWhatsApp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-slate-200 hover:text-white">
                <span className="grid place-items-center h-7 w-7 rounded-full bg-white/5 border border-white/10 text-[var(--brand-accent)]">
                  <Icon name="whatsapp" size={12} />
                </span>
                WhatsApp · Chat instantly
              </a>
            </li>
          </ul>

          {/* Social */}
          <div className="mt-6 flex gap-2">
            {[
              { href: site.social.facebook, name: "facebook" as const, label: "Facebook" },
              { href: site.social.youtube,  name: "youtube"  as const, label: "YouTube"  },
              { href: ctaWhatsApp.href,     name: "whatsapp" as const, label: "WhatsApp" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="h-9 w-9 grid place-items-center rounded-full bg-white/5 border border-white/10 text-slate-200 hover:bg-[var(--brand-accent)] hover:text-white hover:border-[var(--brand-accent)] transition"
              >
                <Icon name={s.name} size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns — all 5 sections */}
        {navCols.map((group) => (
          <div key={group.label}>
            <h3 className="text-white font-bold text-[11px] uppercase tracking-[0.16em] mb-4">
              {group.label}
            </h3>
            <ul className="space-y-1.5 text-[13px]">
              {group.children!.slice(0, 7).map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-slate-300 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Accreditation strip ─────────────────────────────── */}
      <div className="relative border-t border-white/10">
        <div className="section-shell py-7">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-300">
                Accreditation
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <Link
              href="/accreditation"
              className="text-[11px] font-bold text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            >
              See all registrations →
            </Link>
          </div>
          <TrustBadges />
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────── */}
      <div className="relative border-t border-white/10">
        <div className="section-shell py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[12px] text-slate-300">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Sri Sathya Sai Global School. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 justify-center">
            <Link href="/refund-policy"          className="hover:text-white transition-colors">Refund Policy</Link>
            <Link href="/parent-student-handbook" className="hover:text-white transition-colors">Handbook</Link>
            <Link href="/faqs"                    className="hover:text-white transition-colors">FAQs</Link>
            <Link href="/press"                   className="hover:text-white transition-colors">Press</Link>
            <Link href="/contact-us"              className="hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy"                 className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms"                   className="hover:text-white transition-colors">Terms</Link>
            <Link href="/cookie-policy"           className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
