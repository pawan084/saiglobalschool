"use client";

import { useEffect } from "react";

export default function SwRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    let cancelled = false;
    (async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });
        if (cancelled) return;
        // Quietly check for an update once a day to catch deploys
        reg.update().catch(() => {});
      } catch (err) {
        console.warn("[sw] register failed:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
