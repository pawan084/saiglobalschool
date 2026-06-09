"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { searchIndex, type SearchEntry } from "@/data/search-index";
import { safeGet } from "@/lib/storage";

const STORAGE_KEY = "sssgs:recent-paths";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return safeGet(STORAGE_KEY, "[]") ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

function itemsFromSnapshot(snapshot: string): SearchEntry[] {
  let paths: string[];
  try {
    paths = JSON.parse(snapshot) as string[];
  } catch {
    paths = [];
  }

  return paths
    .map((p) => searchIndex.find((s) => s.href === p))
    .filter((x): x is SearchEntry => !!x)
    .slice(0, 4);
}

type IconName = React.ComponentProps<typeof Icon>["name"];

/** Per-section icon + accent treatment. Keeps card identity at a glance
 *  instead of relying on text-only chips. */
const SECTION_THEME: Record<string, { icon: IconName; tint: string; ring: string }> = {
  Academics:  { icon: "book-open",  tint: "bg-[var(--brand-primary-tint)] text-[var(--brand-primary)]",  ring: "from-[var(--brand-primary)]/30" },
  About:      { icon: "heart",      tint: "bg-rose-50 text-rose-600",                                     ring: "from-rose-400/30" },
  Campus:     { icon: "map-pin",    tint: "bg-amber-50 text-amber-600",                                   ring: "from-amber-400/30" },
  Admissions: { icon: "graduation", tint: "bg-[var(--brand-accent)]/10 text-[var(--brand-accent)]",       ring: "from-[var(--brand-accent)]/30" },
  Resources:  { icon: "sparkle",    tint: "bg-indigo-50 text-indigo-600",                                 ring: "from-indigo-400/30" },
};

const FALLBACK_THEME = { icon: "arrow-right" as IconName, tint: "bg-slate-100 text-slate-600", ring: "from-slate-400/30" };

export default function RecentlyViewed() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const items = useMemo(() => itemsFromSnapshot(snapshot), [snapshot]);

  if (!items.length) return null;

  return (
    // Cream background so the white testimonials above flow into the navy CTA
    // below via a warmer mid-tone rather than a stark white→navy edge.
    <section className="py-10 lg:py-14 bg-[var(--brand-cream)]">
      <div className="section-shell">
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="news-eyebrow">Pick up where you left off</div>
            <h2 className="font-display text-[22px] lg:text-[26px] font-bold text-[var(--brand-navy)] tracking-tight">
              Recently viewed
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {items.map((e) => {
            const theme = SECTION_THEME[e.section] ?? FALLBACK_THEME;
            return (
              <Link
                key={e.href}
                href={e.href}
                className="card-fancy relative block p-4 rounded-2xl bg-white border border-[var(--brand-rule)] group overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition-all"
                style={{ boxShadow: "var(--shadow-xs)" }}
              >
                {/* Soft section-coloured wash on hover so each card carries its
                    section identity even with similar titles. */}
                <span
                  aria-hidden
                  className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${theme.ring} to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                />
                <div className="relative flex items-start gap-3">
                  <span className={`shrink-0 grid place-items-center h-9 w-9 rounded-xl ${theme.tint}`}>
                    <Icon name={theme.icon} size={15} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
                      {e.section}
                    </div>
                    <div className="mt-0.5 font-bold text-[13.5px] text-[var(--brand-navy)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug truncate">
                      {e.title}
                    </div>
                  </div>
                </div>
                <div className="relative mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 group-hover:text-[var(--brand-primary)] transition-colors">
                  Open
                  <Icon name="arrow-right" size={10} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
