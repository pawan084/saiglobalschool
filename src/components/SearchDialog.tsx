"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { searchIndex, type SearchEntry } from "@/data/search-index";
import { score } from "@/lib/search";
import { useFocusTrap } from "@/lib/useFocusTrap";
import Icon from "./Icon";

/**
 * SearchDialog — Cmd/Ctrl+K to open, fuzzy substring rank with section/tag weighting.
 * Designed to be light: index lives client-side, no network.
 * Scoring is shared with /search via @/lib/search so both stay in sync.
 */

export default function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // Stable IDs for the combobox/listbox wiring. Each result option gets
  // `${listboxId}-opt-${i}` and aria-activedescendant points to the cursor.
  const listboxId = useId();
  const statusId = `${listboxId}-status`;

  // Reset query + cursor when closing so the dialog is fresh on next open.
  const closeDialog = useCallback(() => {
    setOpen(false);
    setQ("");
    setCursor(0);
  }, []);

  // Open hotkey
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (open && e.key === "Escape") {
        closeDialog();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeDialog]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Listen for header button trigger
  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("sssgs:open-search", onOpen);
    return () => window.removeEventListener("sssgs:open-search", onOpen);
  }, []);

  const results = useMemo<SearchEntry[]>(() => {
    const query = q.trim().toLowerCase();
    if (!query) {
      // Popular fallback list
      return [
        "/apply",
        "/inquire-book-a-tour",
        "/fee-structure",
        "/admission-process",
        "/curriculum",
        "/faculty",
        "/calendar",
        "/contact-us",
      ]
        .map((href) => searchIndex.find((s) => s.href === href))
        .filter(Boolean) as SearchEntry[];
    }
    return searchIndex
      .map((e) => ({ e, s: score(e, query) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 10)
      .map((x) => x.e);
  }, [q]);

  // Keep cursor in range using derived state (cheaper + lint-clean)
  const safeCursor = Math.min(cursor, Math.max(0, results.length - 1));

  function go(entry: SearchEntry) {
    closeDialog();
    router.push(entry.href);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      // Clamp the stored cursor to the current result count first — it may be
      // stale (larger) after the query narrowed the list.
      setCursor((c) => Math.min(results.length - 1, Math.min(c, results.length - 1) + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, Math.min(c, results.length - 1) - 1));
    } else if (e.key === "Enter" && results[safeCursor]) {
      e.preventDefault();
      go(results[safeCursor]);
    }
  }

  const trapRef = useFocusTrap<HTMLDivElement>(open);

  if (!open) return null;

  return (
    <div
      ref={trapRef}
      role="dialog"
      aria-modal="true"
      aria-label="Search SSSGS"
      className="fixed inset-0 z-[85] bg-black/40 backdrop-blur-sm grid items-start justify-center p-4 pt-[12vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDialog();
      }}
    >
      <div
        className="w-full max-w-[600px] rounded-2xl bg-white border border-[var(--brand-rule)] overflow-hidden"
        style={{ boxShadow: "0 40px 80px -20px rgba(11,29,51,0.55)" }}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--brand-rule)]">
          <span className="text-slate-400" aria-hidden>
            <Icon name="sparkle" size={16} />
          </span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search SSSGS — fees, curriculum, admissions…"
            className="flex-1 bg-transparent outline-none text-[15px] text-[var(--brand-navy)] placeholder:text-slate-500"
            aria-label="Search"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              results[safeCursor] ? `${listboxId}-opt-${safeCursor}` : undefined
            }
          />
          <kbd className="hidden sm:inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded border border-[var(--brand-rule)] text-slate-500">
            ESC
          </kbd>
          <button
            onClick={() => closeDialog()}
            aria-label="Close"
            className="sm:hidden grid place-items-center h-7 w-7 rounded-full text-slate-500 hover:text-[var(--brand-navy)] hover:bg-[var(--brand-cream)] transition"
          >
            <Icon name="close" size={13} />
          </button>
        </div>

        <div
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="max-h-[60vh] overflow-y-auto p-2"
        >
          {results.length === 0 && (
            <div id={statusId} role="status" aria-live="polite" className="px-3 py-8 text-center text-[13px] text-slate-500">
              Nothing matched. Try a shorter or different word.
            </div>
          )}
          {!q && results.length > 0 && (
            <div className="px-3 pt-2 pb-1 text-[10.5px] uppercase tracking-[0.14em] font-bold text-slate-500">
              Popular destinations
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={r.href}
              id={`${listboxId}-opt-${i}`}
              role="option"
              aria-selected={i === safeCursor}
              onClick={() => go(r)}
              onMouseEnter={() => setCursor(i)}
              className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                i === safeCursor ? "bg-[var(--brand-cream)]" : "hover:bg-slate-50"
              }`}
            >
              <span className="grid place-items-center h-8 w-8 rounded-lg bg-white border border-[var(--brand-rule)] text-[var(--brand-primary)] shrink-0">
                <Icon name="arrow-right" size={13} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold text-[14px] text-[var(--brand-navy)] truncate">
                  {r.title}
                </span>
                <span className="block text-[11.5px] text-slate-500 truncate">
                  {r.section} · {r.href}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--brand-rule)] text-[10.5px] text-slate-500 bg-[var(--brand-cream)]/60">
          <div className="flex items-center gap-3">
            <span>↑↓ navigate</span>
            <span>↵ open</span>
          </div>
          <Link
            href="/contact-us"
            onClick={() => closeDialog()}
            className="font-bold text-[var(--brand-primary)] hover:underline"
          >
            Can&rsquo;t find it? Ask us →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function openSearchEvent() {
  window.dispatchEvent(new Event("sssgs:open-search"));
}
