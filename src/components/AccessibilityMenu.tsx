"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { safeGet, safeSet } from "@/lib/storage";
import { useFocusTrap } from "@/lib/useFocusTrap";

type FontScale = "base" | "lg" | "xl" | "xxl";
type Contrast = "normal" | "high";

const STORAGE_FONT = "sssgs:font-scale";
const STORAGE_CONTRAST = "sssgs:contrast";

const SCALE_LABEL: Record<FontScale, string> = {
  base: "Default",
  lg: "Large",
  xl: "Extra large",
  xxl: "Huge",
};

function applyToHtml(font: FontScale, contrast: Contrast) {
  const root = document.documentElement;
  if (font === "base") root.removeAttribute("data-font-scale");
  else root.setAttribute("data-font-scale", font);
  if (contrast === "normal") root.removeAttribute("data-contrast");
  else root.setAttribute("data-contrast", contrast);
}

export default function AccessibilityMenu() {
  // SSR renders defaults (no storage access) so server/client HTML match.
  // Stored prefs are read on mount, then applied + persisted on change.
  const [open, setOpen] = useState(false);
  const [font, setFont] = useState<FontScale>("base");
  const [contrast, setContrast] = useState<Contrast>("normal");
  const [hydrated, setHydrated] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  // Move focus into the dialog on open, trap Tab, and restore focus to the
  // trigger on close — role="dialog" needs managed focus to be valid.
  const trapRef = useFocusTrap<HTMLDivElement>(open);

  // Intentional one-shot setState in effect: SSR has no access to localStorage,
  // so the stored prefs have to be read after mount. Reading at render time
  // produces a hydration mismatch on the aria-pressed states below.
  useEffect(() => {
    const storedFont = safeGet(STORAGE_FONT) as FontScale | null;
    const storedContrast = safeGet(STORAGE_CONTRAST) as Contrast | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedFont) setFont(storedFont);
    if (storedContrast) setContrast(storedContrast);
    setHydrated(true);
  }, []);

  // Persist + apply on change (post-hydration only — we don't want to overwrite
  // the stored pref with the SSR default on the first effect run).
  useEffect(() => {
    if (!hydrated) return;
    safeSet(STORAGE_FONT, font);
    safeSet(STORAGE_CONTRAST, contrast);
    applyToHtml(font, contrast);
  }, [hydrated, font, contrast]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function reset() {
    setFont("base");
    setContrast("normal");
  }

  return (
    <div ref={panelRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Accessibility options"
        title="Accessibility options"
        onClick={() => setOpen((v) => !v)}
        className="float-launcher"
        style={{ left: "1rem", bottom: "5.5rem" }}
      >
        <Icon name="eye" size={18} />
      </button>

      {open && (
        <div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility options"
          className="fixed left-4 bottom-[8.5rem] z-[71] w-[290px] rounded-2xl bg-white border border-[var(--brand-rule)] p-4"
          style={{ boxShadow: "0 22px 48px -16px rgba(11,29,51,0.30)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
                Accessibility
              </div>
              <div className="font-display text-[16px] font-bold text-[var(--brand-navy)]">
                Reading preferences
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid place-items-center h-7 w-7 rounded-full text-slate-500 hover:text-[var(--brand-navy)] hover:bg-[var(--brand-cream)] transition"
            >
              <Icon name="close" size={13} />
            </button>
          </div>

          {/* Font scale */}
          <div className="mb-3">
            <div className="text-[12px] font-bold text-[var(--brand-navy)] mb-1.5">Text size</div>
            <div className="grid grid-cols-4 gap-1 rounded-xl bg-[var(--brand-cream)] p-1">
              {(["base", "lg", "xl", "xxl"] as FontScale[]).map((s, i) => (
                <button
                  key={s}
                  onClick={() => setFont(s)}
                  aria-pressed={font === s}
                  aria-label={SCALE_LABEL[s]}
                  className={`rounded-lg py-1.5 text-center font-bold transition ${
                    font === s
                      ? "bg-white shadow-sm text-[var(--brand-navy)]"
                      : "text-slate-500 hover:text-[var(--brand-navy)]"
                  }`}
                  style={{ fontSize: `${0.8 + i * 0.08}rem` }}
                >
                  A
                </button>
              ))}
            </div>
          </div>

          {/* High contrast */}
          <div className="mb-3">
            <div className="text-[12px] font-bold text-[var(--brand-navy)] mb-1.5">Contrast</div>
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-[var(--brand-cream)] p-1">
              {(["normal", "high"] as Contrast[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setContrast(c)}
                  aria-pressed={contrast === c}
                  className={`rounded-lg py-1.5 text-[12px] font-bold capitalize transition ${
                    contrast === c
                      ? "bg-white shadow-sm text-[var(--brand-navy)]"
                      : "text-slate-500 hover:text-[var(--brand-navy)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={reset}
            className="w-full text-[12px] text-[var(--brand-primary)] hover:underline font-bold py-1"
          >
            Reset to defaults
          </button>

          <div className="mt-3 pt-3 border-t border-[var(--brand-rule)] text-[11px] text-slate-500 leading-relaxed">
            Preferences are saved on this device. Need help? Reach out via <Link href="/contact-us" className="text-[var(--brand-primary)] hover:underline font-bold">Contact us</Link>.
          </div>
        </div>
      )}
    </div>
  );
}
