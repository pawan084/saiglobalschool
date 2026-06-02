"use client";

import { useEffect, useState } from "react";

/**
 * Fixed-top reading progress bar.
 * Hides when the document is shorter than 1.5x the viewport (nothing to track).
 */
export default function ReadingProgress() {
  const [pct, setPct] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function update() {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total < doc.clientHeight * 0.5) {
        setEnabled(false);
        return;
      }
      setEnabled(true);
      const y = doc.scrollTop;
      const next = total > 0 ? Math.min(100, Math.max(0, (y / total) * 100)) : 0;
      setPct(next);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      role="presentation"
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none"
    >
      <div
        className="h-full transition-[width] duration-100 ease-out"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg, var(--brand-primary) 0%, var(--brand-accent) 100%)",
        }}
      />
    </div>
  );
}
