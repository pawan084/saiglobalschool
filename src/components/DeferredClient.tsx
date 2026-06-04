"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Defers rendering its children until the browser is idle OR the user
 * interacts with the page (whichever comes first). Used to keep
 * non-critical client widgets — ChatBot, AccessibilityMenu, OpenHouseModal,
 * PwaInstall, SwRegister, SearchDialog, CookieConsent — out of the initial
 * JS payload so first paint and interactive timing stay tight.
 *
 * Also wakes on a list of optional custom event names so on-demand triggers
 * (e.g. the header's ⌘K button dispatching "sssgs:open-search") still work
 * even if the user fires them before the idle deadline.
 */
type Props = {
  children: ReactNode;
  /** Max wait before falling back from requestIdleCallback to setTimeout. */
  idleTimeoutMs?: number;
  /** Window event names that should immediately wake the gate. */
  wakeOn?: string[];
};

const DEFAULT_WAKE = ["sssgs:open-search"];

export default function DeferredClient({
  children,
  idleTimeoutMs = 2000,
  wakeOn = DEFAULT_WAKE,
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    // 1. requestIdleCallback (Chrome/Firefox/Edge) with timeout fallback
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    let idleHandle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (typeof win.requestIdleCallback === "function") {
      idleHandle = win.requestIdleCallback(fire, { timeout: idleTimeoutMs });
    } else {
      // Safari/iOS — small delay so it doesn't compete with first paint
      timer = setTimeout(fire, idleTimeoutMs);
    }

    // 2. First user interaction also wakes the gate (faster than idle)
    const interaction = ["pointerdown", "keydown", "touchstart"] as const;
    interaction.forEach((evt) =>
      window.addEventListener(evt, fire, { once: true, passive: true })
    );

    // 3. Custom wake events (e.g. ⌘K trigger)
    wakeOn.forEach((evt) => window.addEventListener(evt, fire, { once: true }));

    return () => {
      done = true;
      if (idleHandle !== undefined && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleHandle);
      }
      if (timer) clearTimeout(timer);
      interaction.forEach((evt) => window.removeEventListener(evt, fire));
      wakeOn.forEach((evt) => window.removeEventListener(evt, fire));
    };
  }, [ready, idleTimeoutMs, wakeOn]);

  if (!ready) return null;
  return <>{children}</>;
}
