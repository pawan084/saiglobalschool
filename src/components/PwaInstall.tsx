"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import { safeGet, safeSet } from "@/lib/storage";

/**
 * PwaInstall — surfaces an install affordance once the browser fires
 * beforeinstallprompt. For iOS (no programmatic install), we show a one-time
 * tooltip explaining the Share → Add to Home Screen flow.
 */

const STORAGE_DISMISS = "sssgs:pwa-install-dismissed";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function PwaInstall() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOS, setShowIOS] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isStandalone =
      matchMedia("(display-mode: standalone)").matches ||
      // iOS
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (isStandalone) return;
    if (safeGet(STORAGE_DISMISS)) return;

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      // @ts-expect-error MSStream is non-standard, only present in old IE/Edge
      !window.MSStream;

    if (isIOS) {
      // Delay so it doesn't compete with cookie banner / open-house modal
      const t = setTimeout(() => setShowIOS(true), 24000);
      return () => clearTimeout(t);
    }

    function onPrompt(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    safeSet(STORAGE_DISMISS, new Date().toISOString());
    setDeferred(null);
  }

  function dismiss() {
    safeSet(STORAGE_DISMISS, new Date().toISOString());
    setDeferred(null);
    setShowIOS(false);
  }

  if (!deferred && !showIOS) return null;

  return (
    <div
      role="dialog"
      aria-label="Install app"
      className="fixed right-3 bottom-[7rem] lg:bottom-6 z-[72] w-[290px] rounded-2xl bg-white border border-[var(--brand-rule)] p-4"
      style={{ boxShadow: "0 18px 36px -14px rgba(11,29,51,0.30)" }}
    >
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute top-2 right-2 grid place-items-center h-7 w-7 rounded-full text-slate-400 hover:text-[var(--brand-navy)] hover:bg-[var(--brand-cream)] transition"
      >
        <Icon name="close" size={12} />
      </button>
      <div className="flex items-center gap-2.5">
        <span
          className="grid place-items-center h-9 w-9 rounded-xl text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
          }}
          aria-hidden
        >
          <Icon name="sparkle" size={15} />
        </span>
        <div>
          <div className="font-display text-[14px] font-bold text-[var(--brand-navy)] leading-tight">
            Install SSSGS
          </div>
          <div className="text-[11px] text-slate-500">Quick access from your home screen</div>
        </div>
      </div>

      {deferred ? (
        <button onClick={install} className="btn-primary mt-3 justify-center w-full !py-2 text-[13px]">
          Install
          <Icon name="arrow-right" size={13} />
        </button>
      ) : (
        <p className="mt-3 text-[12px] text-slate-600 leading-snug">
          Tap the <strong>Share</strong> icon, then <strong>&ldquo;Add to Home Screen&rdquo;</strong>.
        </p>
      )}
    </div>
  );
}
