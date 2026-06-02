"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

const STORAGE_KEY = "sssgs:cookie-consent";

type Consent = "accepted" | "rejected";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    }, 1100);
    return () => clearTimeout(t);
  }, []);

  function decide(value: Consent) {
    localStorage.setItem(STORAGE_KEY, value);
    localStorage.setItem("sssgs:cookie-consent-at", new Date().toISOString());
    setVisible(false);
    // Hook for downstream code: window dispatch
    window.dispatchEvent(new CustomEvent("sssgs:consent", { detail: { value } }));
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-3 left-3 right-3 z-[75] mx-auto max-w-[640px]"
    >
      <div
        className="rounded-2xl bg-white border border-[var(--brand-rule)] p-4 lg:p-5 flex flex-col sm:flex-row gap-3 items-start"
        style={{ boxShadow: "0 24px 48px -16px rgba(11,29,51,0.35)" }}
      >
        <span
          className="grid place-items-center h-10 w-10 rounded-xl shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
            color: "#fff",
          }}
          aria-hidden
        >
          <Icon name="shield" size={16} />
        </span>
        <div className="flex-1">
          <div className="font-display text-[15px] font-bold text-[var(--brand-navy)]">
            We value your privacy
          </div>
          <p className="text-[12.5px] text-slate-600 mt-0.5 leading-snug">
            We use essential cookies to run this site, plus optional analytics to improve your experience.
            See our{" "}
            <Link href="/privacy" className="text-[var(--brand-primary)] hover:underline font-bold">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/cookie-policy" className="text-[var(--brand-primary)] hover:underline font-bold">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => decide("accepted")} className="btn-primary !py-2 !px-4 text-[13px]">
              Accept all
            </button>
            <button
              onClick={() => decide("rejected")}
              className="btn-secondary !py-2 !px-4 text-[13px]"
            >
              Essential only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
