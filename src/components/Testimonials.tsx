"use client";

import { useEffect, useRef, useState } from "react";

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  grade?: string;
};

type Props = {
  items: Testimonial[];
  intervalMs?: number;
};

export default function Testimonials({ items, intervalMs = 7000 }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalMs <= 0 || paused) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [intervalMs, paused, items.length]);

  if (items.length === 0) return null;
  const t = items[active];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid lg:grid-cols-5 gap-6 items-stretch">
        {/* Main quote card */}
        <figure
          className="lg:col-span-3 relative px-7 lg:px-10 py-9 lg:py-11 rounded-2xl bg-white"
          style={{
            boxShadow: "var(--shadow-lg)",
            backgroundImage:
              "linear-gradient(135deg, #ffffff 0%, var(--brand-cream) 100%)",
          }}
        >
          {/* Decorative serif quote */}
          <div
            className="absolute -top-3 left-7 lg:left-10 font-display text-[110px] leading-none text-[var(--brand-accent)] opacity-30 select-none"
            aria-hidden
          >
            &ldquo;
          </div>

          <blockquote className="relative font-display text-[20px] lg:text-[24px] leading-snug text-[var(--brand-navy)] italic font-medium">
            {t.quote}
          </blockquote>

          <figcaption className="mt-8 flex items-center gap-3">
            <span
              className="h-11 w-11 rounded-full grid place-items-center text-white font-display font-bold text-[15px] shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
              }}
            >
              {t.author
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
            <div className="leading-tight">
              <div className="text-[14px] font-bold text-[var(--brand-navy)]">{t.author}</div>
              <div className="text-[12px] text-slate-500">
                {[t.role, t.grade].filter(Boolean).join(" · ")}
              </div>
            </div>
          </figcaption>
        </figure>

        {/* Side list */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          {items.map((it, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-1 text-left p-4 rounded-xl border transition group ${
                  isActive
                    ? "bg-white border-[var(--brand-accent)]"
                    : "bg-white/60 border-[var(--brand-rule)] hover:border-[var(--brand-primary)] hover:bg-white"
                }`}
                style={isActive ? { boxShadow: "var(--shadow-sm)" } : undefined}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--brand-accent)]">
                    {it.author}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="text-[11px] text-slate-500">{it.grade}</span>
                </div>
                <div className="text-[13px] text-slate-700 leading-snug line-clamp-2">
                  {it.quote}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-7">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-10 bg-[var(--brand-accent)]" : "w-1.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
