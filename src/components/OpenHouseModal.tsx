"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";
import { safeGet, safeSet } from "@/lib/storage";
import { useFocusTrap } from "@/lib/useFocusTrap";

/**
 * Open-house promotional modal.
 *  - Shows once after 14 seconds on first qualified visit
 *  - 7-day frequency cap once dismissed or RSVP'd
 *  - Suppressed on the open-house, apply, and inquire pages (would compete)
 *  - Respects prefers-reduced-motion (no entrance scaling)
 */

const STORAGE_KEY = "sssgs:openhouse-modal";
const SUPPRESS_DAYS = 7;
const SUPPRESS_PATHS = ["/open-house", "/inquire-book-a-tour", "/apply"];

function shouldShow(): boolean {
  if (typeof window === "undefined") return false;
  if (SUPPRESS_PATHS.some((p) => window.location.pathname.startsWith(p))) return false;
  const raw = safeGet(STORAGE_KEY);
  if (!raw) return true;
  try {
    const { at } = JSON.parse(raw) as { at: string };
    const ageMs = Date.now() - new Date(at).getTime();
    return ageMs > SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

function suppress(reason: "dismiss" | "rsvp") {
  safeSet(STORAGE_KEY, JSON.stringify({ at: new Date().toISOString(), reason }));
}

export default function OpenHouseModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!shouldShow()) return;
    const t = setTimeout(() => setVisible(true), 14000);
    return () => clearTimeout(t);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!visible) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        suppress("dismiss");
        setVisible(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  const trapRef = useFocusTrap<HTMLDivElement>(visible);

  if (!visible) return null;

  function dismiss() {
    suppress("dismiss");
    setVisible(false);
  }

  function rsvp() {
    suppress("rsvp");
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="openhouse-title"
      className="fixed inset-0 z-[78] grid place-items-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        ref={trapRef}
        className="relative w-full max-w-[480px] rounded-3xl overflow-hidden bg-white border border-[var(--brand-rule)]"
        style={{ boxShadow: "0 40px 80px -20px rgba(11,29,51,0.55)" }}
      >
        {/* Top brand band */}
        <div
          className="relative px-7 pt-7 pb-6"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-cream) 0%, #fff 60%, #eef0fc 100%)",
          }}
        >
          <span
            aria-hidden
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-25 pointer-events-none"
            style={{
              background: "radial-gradient(closest-side, var(--brand-accent), transparent)",
            }}
          />
          <span
            aria-hidden
            className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(closest-side, var(--brand-primary), transparent)",
            }}
          />
          <button
            onClick={dismiss}
            aria-label="Close"
            className="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-full bg-white/80 backdrop-blur text-slate-500 hover:text-[var(--brand-navy)] hover:bg-white transition"
          >
            <Icon name="close" size={13} />
          </button>

          <div className="relative flex items-center gap-3">
            <BrandLogo size={48} />
            <div className="text-[11px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
              Open House · 21 June 2026
            </div>
          </div>
          <h2
            id="openhouse-title"
            className="relative mt-3 font-display text-[26px] sm:text-[30px] font-bold leading-tight text-[var(--brand-navy)]"
          >
            See SSSGS{" "}
            <span className="italic text-[var(--brand-accent)] font-medium">in motion.</span>
          </h2>
          <p className="relative mt-2 text-[14px] text-slate-600 leading-relaxed">
            Tour the labs, meet teachers, observe a real class — coffee on us. Limited slots; RSVP to reserve yours.
          </p>
        </div>

        {/* Action band */}
        <div className="px-7 py-5 flex flex-col sm:flex-row gap-2">
          <Link href="/open-house" onClick={rsvp} className="btn-primary flex-1 justify-center">
            RSVP — it&rsquo;s free
            <Icon name="arrow-right" size={14} />
          </Link>
          <button onClick={dismiss} className="btn-secondary sm:flex-none">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
