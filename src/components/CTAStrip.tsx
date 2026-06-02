import Link from "next/link";
import { ctaInquire, ctaWhatsApp } from "@/data/nav";
import Icon from "./Icon";

export default function CTAStrip({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-navy)] text-white py-12 lg:py-14">
      {/* Decorative orbs */}
      <span
        aria-hidden
        className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none opacity-[0.18]"
        style={{ background: "radial-gradient(closest-side, var(--brand-accent), transparent)" }}
      />
      <span
        aria-hidden
        className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none opacity-[0.16]"
        style={{ background: "radial-gradient(closest-side, var(--brand-primary), transparent)" }}
      />
      {/* Faint dot grid */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="section-shell relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="news-eyebrow text-[var(--brand-accent)] inline-flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)]"
              aria-hidden
            />
            Take the next step
          </div>
          <h2 className="font-display text-[22px] lg:text-[28px] font-bold mt-2 leading-tight tracking-tight">
            {title ?? "Ready to learn more about SSSGS?"}
          </h2>
          {subtitle && (
            <p className="text-slate-300 text-[14px] mt-2 max-w-2xl">{subtitle}</p>
          )}
        </div>
        <div className="flex gap-3 shrink-0 flex-wrap">
          <Link href={ctaInquire.href} className="btn-primary">
            {ctaInquire.label}
            <Icon name="arrow-right" size={15} />
          </Link>
          <a
            href={ctaWhatsApp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-white"
          >
            <Icon name="whatsapp" size={14} />
            {ctaWhatsApp.label}
          </a>
        </div>
      </div>
    </section>
  );
}
