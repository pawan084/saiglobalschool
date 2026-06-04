"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Optional sub-label below the main label */
  hint?: string;
  /** Use a fixed display string if you don't want animation (e.g. "1 : 20") */
  display?: string;
};

type Props = {
  items: Stat[];
  durationMs?: number;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, start: boolean, durationMs: number, reduced: boolean) {
  const [n, setN] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    // Reduced-motion users skip animation entirely; the return value below
    // derives the displayed number, so the effect doesn't need to setState.
    if (!start || reduced) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      setN(Math.round(target * easeOutCubic(p)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, start, durationMs, reduced]);
  // Derive the displayed value: reduced-motion → jump to target, otherwise
  // use the RAF-driven n. Keeps the effect free of setState-in-effect lint.
  return start && reduced ? target : n;
}

export default function StatsCounter({ items, durationMs = 1600 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden bg-white border border-[var(--brand-rule)]"
      style={{ boxShadow: "var(--shadow-md)" }}
    >
      {items.map((s, i) => (
        <StatCell key={i} item={s} visible={visible} duration={durationMs} reduced={reduced} isLast={i === items.length - 1} />
      ))}
    </div>
  );
}

function StatCell({
  item,
  visible,
  duration,
  reduced,
  isLast,
}: {
  item: Stat;
  visible: boolean;
  duration: number;
  reduced: boolean;
  isLast: boolean;
}) {
  const n = useCountUp(item.value, visible, duration, reduced);
  return (
    <div
      className={`relative px-6 py-7 lg:py-8 ${
        !isLast ? "lg:border-r border-b lg:border-b-0 border-[var(--brand-rule)]" : "border-b lg:border-b-0 border-[var(--brand-rule)]"
      } text-center lg:text-left`}
    >
      <div className="font-display text-[44px] lg:text-[54px] font-bold leading-none tracking-tight text-[var(--brand-navy)]">
        {item.display ?? (
          <>
            {item.prefix}
            <span>{n.toLocaleString()}</span>
            {item.suffix}
          </>
        )}
      </div>
      <div className="mt-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-[var(--brand-accent)]">
        {item.label}
      </div>
      {item.hint && (
        <div className="mt-1 text-[12.5px] text-slate-500">{item.hint}</div>
      )}
    </div>
  );
}
