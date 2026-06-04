"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user has asked the OS to reduce motion.
 * SSR-safe: initial render returns `false` so the first paint matches what
 * the server emitted. The real value lands in a useEffect on the client.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    // Both addEventListener and the legacy addListener exist; addEventListener
    // is supported in every browser that supports MediaQueryList.
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
