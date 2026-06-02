import Link from "next/link";
import { ctaInquire, ctaWhatsApp } from "@/data/nav";

export default function CTAStrip({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <section className="bg-[var(--brand-navy)] text-white py-10">
      <div className="section-shell flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="news-eyebrow text-[var(--brand-accent)]">Take the next step</div>
          <h2 className="text-xl lg:text-2xl font-extrabold mt-1">{title ?? "Ready to learn more about SSSGS?"}</h2>
          {subtitle && <p className="text-slate-300 text-sm mt-1 max-w-2xl">{subtitle}</p>}
        </div>
        <div className="flex gap-3 shrink-0 flex-wrap">
          <Link
            href={ctaInquire.href}
            className="px-5 py-3 bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-dark)] font-bold rounded-full transition"
          >
            {ctaInquire.label}
          </Link>
          <a
            href={ctaWhatsApp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 font-bold rounded-full transition"
          >
            {ctaWhatsApp.label}
          </a>
        </div>
      </div>
    </section>
  );
}
