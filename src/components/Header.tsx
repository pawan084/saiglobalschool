"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation, ctaInquire } from "@/data/nav";
import { site } from "@/data/site";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${
        scrolled
          ? "shadow-[0_1px_0_var(--brand-rule),0_8px_24px_-12px_rgba(15,23,42,0.10)]"
          : "border-b border-[var(--brand-rule)]"
      }`}
    >
      {/* Brand band */}
      <div className={`section-shell transition-[padding] ${scrolled ? "py-2.5" : "py-4 lg:py-5"}`}>
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-4 lg:gap-5 group shrink-0">
            <BrandLogo
              size={scrolled ? 64 : 92}
              className="shrink-0 transition-[width,height] drop-shadow-sm"
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`font-display font-bold text-[var(--brand-navy)] tracking-tight transition-[font-size] ${
                  scrolled ? "text-[19px] lg:text-[22px]" : "text-[22px] lg:text-[28px]"
                } group-hover:text-[var(--brand-primary)]`}
              >
                Sri Sathya Sai Global School
              </span>
              <span
                className={`font-display italic text-[var(--brand-accent)] tracking-wide transition-[font-size] ${
                  scrolled ? "text-[11px] lg:text-[12px]" : "text-[12px] lg:text-[14px]"
                }`}
              >
                The End of Education is Character · Singapore
              </span>
            </div>
          </Link>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
              className="hidden xl:inline-flex items-center gap-2 text-[12.5px] text-slate-700 hover:text-[var(--brand-primary)] px-3 py-2 rounded-full border border-[var(--brand-rule)] hover:border-[var(--brand-primary)] transition"
              aria-label={`Call ${site.phone}`}
            >
              <span className="grid place-items-center h-5 w-5 rounded-full bg-[var(--brand-primary-tint)] text-[var(--brand-primary)]">
                <Icon name="phone" size={11} />
              </span>
              <span className="font-bold tracking-tight">{site.phone}</span>
            </a>
            <Link href={ctaInquire.href} className="hidden sm:inline-flex btn-primary !py-2.5 !px-4 !text-[13px]">
              {ctaInquire.label}
              <Icon name="arrow-right" size={14} />
            </Link>
            <button
              onClick={() => setMobile((v) => !v)}
              className="lg:hidden p-2 -mr-1 text-slate-700"
              aria-label="Toggle menu"
            >
              <Icon name={mobile ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Nav band */}
      <nav className="hidden lg:block border-t border-[var(--brand-rule)] bg-[var(--brand-cream)]/30">
        <div className="section-shell flex items-center justify-center gap-0">
          {navigation.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <Link
                href={item.href}
                className="nav-link-anim block px-4 py-3 text-[12.5px] font-bold tracking-[0.06em] uppercase text-[var(--brand-navy)] hover:text-[var(--brand-primary)] transition-colors"
              >
                {item.label}
              </Link>
              {item.children && open === item.label && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 z-10">
                  <div className="w-64 bg-white rounded-lg border border-[var(--brand-rule)] shadow-[var(--shadow-lg)] py-1.5 overflow-hidden">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2 text-[13.5px] text-slate-700 hover:bg-[var(--brand-cream)] hover:text-[var(--brand-accent)] transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobile && (
        <div className="lg:hidden border-t border-[var(--brand-rule)] bg-white">
          <div className="section-shell py-3 max-h-[70vh] overflow-y-auto">
            {navigation.map((item) => (
              <details key={item.label} className="border-b border-[var(--brand-rule)] last:border-0">
                <summary className="flex items-center justify-between py-3 cursor-pointer text-[13.5px] font-bold text-slate-800">
                  {item.label}
                  {item.children && <Icon name="plus" size={14} className="text-slate-400" />}
                </summary>
                {item.children && (
                  <div className="pl-3 pb-3 space-y-1">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setMobile(false)}
                        className="block py-1.5 text-[13.5px] text-slate-600 hover:text-[var(--brand-primary)]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </details>
            ))}
            <Link href={ctaInquire.href} className="btn-primary mt-4 w-full">
              {ctaInquire.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

