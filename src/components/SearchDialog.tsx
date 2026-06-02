"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchIndex, type SearchEntry } from "@/data/search-index";
import Icon from "./Icon";

/**
 * SearchDialog — Cmd/Ctrl+K to open, fuzzy substring rank with section/tag weighting.
 * Designed to be light: index lives client-side, no network.
 */

function score(entry: SearchEntry, q: string): number {
  const t = entry.title.toLowerCase();
  const s = entry.section.toLowerCase();
  const tag = entry.tags.toLowerCase();
  let best = 0;
  if (t.startsWith(q)) best = 100;
  else if (t.includes(q)) best = 70;
  else if (tag.includes(q)) best = 45;
  else if (s.includes(q)) best = 25;
  // Reward shorter titles slightly so "Apply" beats "Application Process Form"
  return best - Math.min(t.length, 50) * 0.1;
}

export default function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Open hotkey
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (open && e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQ("");
      setCursor(0);
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

  // Keep cursor in range
  useEffect(() => {
    if (cursor >= results.length) setCursor(Math.max(0, results.length - 1));
  }, [results, cursor]);

  function go(entry: SearchEntry) {
    setOpen(false);
    router.push(entry.href);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(results.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter" && results[cursor]) {
      e.preventDefault();
      go(results[cursor]);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search SSSGS"
      className="fixed inset-0 z-[85] bg-black/40 backdrop-blur-sm grid items-start justify-center p-4 pt-[12vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
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
            className="flex-1 bg-transparent outline-none text-[15px] text-[var(--brand-navy)] placeholder:text-slate-400"
            aria-label="Search"
          />
          <kbd className="hidden sm:inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded border border-[var(--brand-rule)] text-slate-500">
            ESC
          </kbd>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="sm:hidden grid place-items-center h-7 w-7 rounded-full text-slate-400 hover:text-[var(--brand-navy)] hover:bg-[var(--brand-cream)] transition"
          >
            <Icon name="close" size={13} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <div className="px-3 py-8 text-center text-[13px] text-slate-500">
              Nothing matched. Try a shorter or different word.
            </div>
          )}
          {!q && results.length > 0 && (
            <div className="px-3 pt-2 pb-1 text-[10.5px] uppercase tracking-[0.14em] font-bold text-slate-400">
              Popular destinations
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={r.href}
              onClick={() => go(r)}
              onMouseEnter={() => setCursor(i)}
              className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                i === cursor ? "bg-[var(--brand-cream)]" : "hover:bg-slate-50"
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
            onClick={() => setOpen(false)}
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
