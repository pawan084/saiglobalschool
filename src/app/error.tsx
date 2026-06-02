"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import Icon from "@/components/Icon";
import CTAStrip from "@/components/CTAStrip";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("App error:", error);
    }
  }, [error]);

  const ref = error?.digest;

  async function copyRef() {
    if (!ref) return;
    try {
      await navigator.clipboard.writeText(ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--brand-cream)] via-white to-[#eef0fc] py-20 lg:py-28">
        {/* Decorative blobs */}
        <span
          aria-hidden
          className="absolute -top-20 -left-24 w-[420px] h-[420px] rounded-full opacity-[0.35] pointer-events-none"
          style={{ background: "radial-gradient(closest-side, rgba(234,88,12,0.16), transparent)" }}
        />
        <span
          aria-hidden
          className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full opacity-[0.30] pointer-events-none"
          style={{ background: "radial-gradient(closest-side, rgba(13,138,135,0.18), transparent)" }}
        />

        <div className="section-shell relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--brand-accent)]/30 text-[11px] font-bold tracking-[0.14em] uppercase mb-5 text-[var(--brand-accent)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--brand-accent)] opacity-70 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)]" />
              </span>
              Something interrupted
            </div>

            <h1 className="font-display text-[40px] sm:text-[48px] lg:text-[60px] font-bold leading-[1.05] tracking-tight text-[var(--brand-navy)]">
              Our system hit a{" "}
              <span className="italic font-medium text-[var(--brand-accent)]">snag.</span>
            </h1>

            <p className="mt-5 text-[16px] text-slate-600 max-w-xl leading-relaxed">
              A small technical issue interrupted this page. You can retry, head back to safety,
              or reach out if it keeps happening. We&rsquo;re sorry for the bump.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex gap-3 flex-wrap">
              <button onClick={() => reset()} className="btn-primary">
                <Icon name="rotate" size={15} />
                Try again
              </button>
              <Link href="/" className="btn-secondary">
                <Icon name="arrow-left" size={15} />
                Back to home
              </Link>
              <Link href="/contact-us" className="btn-secondary">
                Contact support
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>

            {/* Reference id pill (only if digest present) */}
            {ref && (
              <div className="mt-7 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--brand-rule)] bg-white/80 backdrop-blur text-[12px]">
                <span className="text-slate-500">Reference</span>
                <span className="font-mono text-[var(--brand-navy)] truncate max-w-[200px]">
                  {ref}
                </span>
                <button
                  onClick={copyRef}
                  className="grid place-items-center h-6 w-6 rounded-full text-[var(--brand-primary)] hover:bg-[var(--brand-primary-tint)] transition"
                  aria-label="Copy reference id"
                  title="Copy reference id"
                >
                  <Icon name={copied ? "check" : "document"} size={12} />
                </button>
              </div>
            )}
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

      <CTAStrip
        title="Need a hand?"
        subtitle="If this keeps happening, our admissions team can help — by email, WhatsApp or phone."
      />
    </>
  );
}
