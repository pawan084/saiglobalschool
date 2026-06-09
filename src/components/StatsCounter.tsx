"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Listen for the print / Save-as-PDF media query. Returns true when the
 *  browser is in a print rendering context so the counter can skip its
 *  count-up animation and render the final target value instead. */
function usePrintMode() {
  const [isPrint, setIsPrint] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("print");
    const onChange = (e: MediaQueryListEvent) => setIsPrint(e.matches);
    // Sync the React state with the actual matchMedia result on mount —
    // we're subscribing to an external system (the user agent's print state).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPrint(mql.matches);
    mql.addEventListener?.("change", onChange);
    // Capture beforeprint / afterprint too — Safari and some headless renderers
    // don't reliably fire matchMedia change for print.
    const onBefore = () => setIsPrint(true);
    const onAfter = () => setIsPrint(false);
    window.addEventListener("beforeprint", onBefore);
    window.addEventListener("afterprint", onAfter);
    return () => {
      mql.removeEventListener?.("change", onChange);
      window.removeEventListener("beforeprint", onBefore);
      window.removeEventListener("afterprint", onAfter);
    };
  }, []);
  return isPrint;
}

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

function useCountUp(target: number, start: boolean, durationMs: number, skipAnimation: boolean) {
  const [n, setN] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    // Reduced-motion / print users skip animation entirely; the return value
    // below derives the displayed number, so the effect doesn't need to setState.
    if (!start || skipAnimation) return;
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
  }, [target, start, durationMs, skipAnimation]);
  // Derive the displayed value: reduced-motion / print → jump to target,
  // otherwise use the RAF-driven n. Keeps the effect free of setState-in-effect.
  return start && skipAnimation ? target : n;
}

export default function StatsCounter({ items, durationMs = 1600 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const isPrint = usePrintMode();
  // Skip animation when print/PDF rendering is active OR the user has
  // requested reduced motion — both want the final target value immediately.
  const skipAnimation = reduced || isPrint;
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
  // When entering print mode, force visibility so the counters render their
  // target value even if the section wasn't scrolled into view first. This
  // is an external-system sync (matching the user agent's print state), which
  // is the documented exception to the set-state-in-effect rule.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isPrint) setVisible(true);
  }, [isPrint]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden bg-white border border-[var(--brand-rule)]"
      style={{ boxShadow: "var(--shadow-md)" }}
    >
      {items.map((s, i) => (
        <StatCell key={i} item={s} visible={visible} duration={durationMs} skipAnimation={skipAnimation} isLast={i === items.length - 1} />
      ))}
    </div>
  );
}

function StatCell({
  item,
  visible,
  duration,
  skipAnimation,
  isLast,
}: {
  item: Stat;
  visible: boolean;
  duration: number;
  skipAnimation: boolean;
  isLast: boolean;
}) {
  const n = useCountUp(item.value, visible, duration, skipAnimation);
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
