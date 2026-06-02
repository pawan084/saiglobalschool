"use client";

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import Icon from "@/components/Icon";

export default function OfflinePage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--brand-cream)] via-white to-[#eef0fc] py-24 lg:py-32 min-h-[70vh] grid place-items-center">
      <span
        aria-hidden
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(13,138,135,0.18), transparent)" }}
      />
      <span
        aria-hidden
        className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(234,88,12,0.16), transparent)" }}
      />
      <div className="section-shell relative max-w-xl text-center">
        <BrandLogo size={88} className="mx-auto" />
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--brand-rule)] text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--brand-accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)]" />
          You&rsquo;re offline
        </div>
        <h1 className="mt-4 font-display text-[34px] sm:text-[44px] font-bold text-[var(--brand-navy)] leading-tight">
          We can&rsquo;t reach the network right now.
        </h1>
        <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">
          Some pages you&rsquo;ve visited recently may still load from cache. Reconnect to see fresh content.
        </p>
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          <Link href="/" className="btn-primary">
            <Icon name="arrow-left" size={14} />
            Back to home
          </Link>
          <button onClick={() => location.reload()} className="btn-secondary">
            <Icon name="rotate" size={14} />
            Retry connection
          </button>
        </div>
      </div>
    </section>
  );
}
