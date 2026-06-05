"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  children: React.ReactNode;
  delay?: number;       // ms
  className?: string;
};

const ioSupported = (): boolean =>
  typeof IntersectionObserver !== "undefined";

export default function RevealOnScroll({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Start hidden on BOTH server and first client render so the two agree (no
  // hydration mismatch). The IntersectionObserver below reveals it after mount;
  // the `.reveal-on-scroll` CSS rule forces visibility when JS is off or motion
  // is reduced, so content is never stuck hidden.
  const [observed, setObserved] = useState(false);
  const reduced = useReducedMotion();
  // Reduced-motion users get content immediately (no fade-in delay, no
  // risk of blank above-the-fold content) — derive `shown` rather than
  // calling setState inside the effect.
  const shown = reduced || observed;

  useEffect(() => {
    if (reduced) return; // nothing to observe; `shown` already derives true
    const el = ref.current;
    if (!el || !ioSupported()) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => setObserved(true), delay);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, reduced]);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${className} transition-all duration-700 will-change-transform ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}
