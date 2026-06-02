"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { searchIndex, type SearchEntry } from "@/data/search-index";

const STORAGE_KEY = "sssgs:recent-paths";

export default function RecentlyViewed() {
  const [items, setItems] = useState<SearchEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const paths: string[] = raw ? JSON.parse(raw) : [];
      const found = paths
        .map((p) => searchIndex.find((s) => s.href === p))
        .filter((x): x is SearchEntry => !!x);
      setItems(found.slice(0, 4));
    } catch {
      /* ignore */
    }
  }, []);

  if (!items.length) return null;

  return (
    <section className="py-10 lg:py-12 bg-white">
      <div className="section-shell">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="news-eyebrow">Pick up where you left off</div>
            <h2 className="font-display text-[22px] lg:text-[26px] font-bold text-[var(--brand-navy)] tracking-tight">
              Recently viewed
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {items.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="card-fancy block p-3 rounded-xl bg-white border border-[var(--brand-rule)] group"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              <div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
                {e.section}
              </div>
              <div className="mt-0.5 font-bold text-[13.5px] text-[var(--brand-navy)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
                {e.title}
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-slate-500">
                Open
                <Icon name="arrow-right" size={10} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
