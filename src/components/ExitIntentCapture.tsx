"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { safeGet, safeSet } from "@/lib/storage";

/**
 * Triggers a "save your place" prompt when the user moves the cursor toward the
 * top of the viewport (a desktop exit-intent signal) on long forms like the
 * admission application or inquiry. Mobile users see it after 90s of inactivity
 * since there's no equivalent mouse-leave signal.
 */

const STORAGE_KEY = "sssgs:exit-intent";
const SUPPRESS_DAYS = 14;

function shouldShow(): boolean {
  if (typeof window === "undefined") return false;
  const raw = safeGet(STORAGE_KEY);
  if (!raw) return true;
  try {
    const ms = Date.now() - new Date(raw).getTime();
    return ms > SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

export default function ExitIntentCapture() {
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(false);

  // Arm after 8s on page so we don't ambush instant-bounce users
  useEffect(() => {
    if (!shouldShow()) return;
    const t = setTimeout(() => setArmed(true), 8000);
    return () => clearTimeout(t);
  }, []);

  // Desktop: mouse leaves top edge
  useEffect(() => {
    if (!armed) return;
    const isTouch = matchMedia("(hover: none)").matches;
    if (isTouch) return;
    function onMove(e: MouseEvent) {
      if (e.clientY <= 4 && e.relatedTarget == null) {
        setVisible(true);
      }
    }
    document.addEventListener("mouseleave", onMove);
    return () => document.removeEventListener("mouseleave", onMove);
  }, [armed]);

  // Mobile / no-hover: show after 90s idle as a soft fallback
  useEffect(() => {
    if (!armed) return;
    const isTouch = matchMedia("(hover: none)").matches;
    if (!isTouch) return;
    const t = setTimeout(() => setVisible(true), 90000);
    return () => clearTimeout(t);
  }, [armed]);

  function dismiss() {
    safeSet(STORAGE_KEY, new Date().toISOString());
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-[77] grid place-items-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        className="relative w-full max-w-[440px] rounded-2xl bg-white border border-[var(--brand-rule)] p-6 lg:p-7"
        style={{ boxShadow: "0 36px 64px -16px rgba(11,29,51,0.50)" }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-full text-slate-400 hover:text-[var(--brand-navy)] hover:bg-[var(--brand-cream)] transition"
        >
          <Icon name="close" size={13} />
        </button>

        <span
          className="inline-grid place-items-center h-11 w-11 rounded-xl text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-accent) 0%, var(--brand-accent-dark) 100%)",
          }}
          aria-hidden
        >
          <Icon name="ribbon" size={18} />
        </span>
        <h2
          id="exit-intent-title"
          className="mt-4 font-display text-[22px] font-bold text-[var(--brand-navy)] leading-tight"
        >
          Don&rsquo;t lose your spot.
        </h2>
        <p className="mt-1.5 text-[13.5px] text-slate-600 leading-relaxed">
          Save what you&rsquo;ve filled and we&rsquo;ll email a resume link to your inbox — no payment, no commitment.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Link
            href="/inquire-book-a-tour"
            onClick={dismiss}
            className="btn-primary justify-center"
          >
            Email me a resume link
            <Icon name="arrow-right" size={14} />
          </Link>
          <button onClick={dismiss} className="btn-secondary justify-center !py-2.5">
            Continue without saving
          </button>
        </div>
      </div>
    </div>
  );
}
