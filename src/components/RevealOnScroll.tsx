"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;       // ms
  className?: string;
};

/** Default to shown when the IntersectionObserver API isn't available
 *  (server-rendering or very old browsers). This keeps content visible
 *  without needing a setState-in-effect on mount. */
const ioSupported = (): boolean =>
  typeof IntersectionObserver !== "undefined";

export default function RevealOnScroll({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(() => !ioSupported());

  useEffect(() => {
    const el = ref.current;
    if (!el || !ioSupported()) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 will-change-transform ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}
