import Link from "next/link";
import { navigation, ctaWhatsApp } from "@/data/nav";
import { site } from "@/data/site";
import TrustBadges from "./TrustBadges";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-navy)] text-slate-300 mt-16 relative overflow-hidden">
      {/* Subtle radial accent */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.05]" style={{ background: "radial-gradient(closest-side, var(--brand-accent), transparent)" }} aria-hidden />
      <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full opacity-[0.05]" style={{ background: "radial-gradient(closest-side, var(--brand-primary), transparent)" }} aria-hidden />

      <div className="section-shell py-14 lg:py-16 grid grid-cols-2 md:grid-cols-12 gap-8 relative">
        {/* Brand block */}
        <div className="col-span-2 md:col-span-4">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <span className="shrink-0 grid place-items-center h-12 w-12 rounded-xl bg-white/5 border border-white/10 p-1.5">
              <BrandLogo size={36} />
            </span>
            <div className="leading-tight">
              <div className="text-white font-display font-bold text-[17px]">Sri Sathya Sai Global School</div>
              <div className="text-[10.5px] text-slate-400">Singapore</div>
            </div>
          </Link>
          <p className="mt-5 font-display italic text-slate-300 text-[15px] leading-snug max-w-sm">
            &ldquo;{site.tagline}.&rdquo;
          </p>
          <p className="mt-4 text-[12.5px] text-slate-400 leading-relaxed max-w-sm">
            A values-rooted international school for Grades 1–8 in Singapore. Mid-year admissions welcome.
          </p>

          <div className="mt-6 flex flex-col gap-2 text-[13px]">
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 text-slate-200 hover:text-white">
              <Icon name="phone" size={14} className="text-[var(--brand-accent)]" />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-slate-200 hover:text-white">
              <Icon name="mail" size={14} className="text-[var(--brand-accent)]" />
              {site.email}
            </a>
            <a href={ctaWhatsApp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-200 hover:text-white">
              <Icon name="whatsapp" size={14} className="text-[var(--brand-accent)]" />
              WhatsApp · Chat instantly
            </a>
          </div>

          <div className="mt-6 flex gap-2">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 grid place-items-center rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition">
              <Icon name="facebook" size={14} />
            </a>
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="h-9 w-9 grid place-items-center rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition">
              <Icon name="youtube" size={14} />
            </a>
            <a href={ctaWhatsApp.href} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-9 w-9 grid place-items-center rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition">
              <Icon name="whatsapp" size={14} />
            </a>
          </div>
        </div>

        {/* Nav columns */}
        {navigation.filter((n) => n.children).slice(0, 4).map((group) => (
          <div key={group.label} className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold text-[12px] uppercase tracking-[0.12em] mb-3">
              {group.label}
            </h3>
            <ul className="space-y-1.5 text-[13px]">
              {group.children!.slice(0, 6).map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-slate-400 hover:text-white transition">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 relative">
        <div className="section-shell py-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 mb-3">
            Accreditation & details
          </div>
          <TrustBadges />
        </div>
      </div>

      <div className="border-t border-white/10 relative">
        <div className="section-shell py-4 flex flex-col md:flex-row items-center justify-between text-[12px] text-slate-500 gap-2">
          <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/refund-policy" className="hover:text-white">Refund Policy</Link>
            <Link href="/parent-student-handbook" className="hover:text-white">Handbook</Link>
            <Link href="/contact-us" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
