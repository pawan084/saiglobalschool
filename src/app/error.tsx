"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("App error:", error);
    }
  }, [error]);

  return (
    <section className="section-shell py-20 lg:py-28">
      <div className="max-w-2xl">
        <div className="news-eyebrow mb-2">Something went wrong</div>
        <h1 className="text-4xl lg:text-5xl font-extrabold news-headline">
          Our system hit a snag
        </h1>
        <p className="mt-4 text-slate-600 text-[16px] leading-relaxed">
          A small technical issue interrupted this page. You can retry, head back to safety, or
          reach out if it keeps happening.
        </p>
        {error?.digest && (
          <p className="mt-2 text-xs text-slate-400">Reference: {error.digest}</p>
        )}

        <div className="mt-8 flex gap-3 flex-wrap">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-[13px] font-bold hover:bg-[var(--brand-accent-dark)] transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition"
          >
            Back to home
          </Link>
          <Link
            href="/contact-us"
            className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition"
          >
            Contact support
          </Link>
        </div>
      </div>
    </section>
  );
}
