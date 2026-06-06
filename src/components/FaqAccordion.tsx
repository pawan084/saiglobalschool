"use client";

import { useState } from "react";
import Icon from "./Icon";

export type FAQ = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `faq-q-${i}`;
        const panelId = `faq-a-${i}`;
        return (
          <div
            key={i}
            className={`relative rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
              isOpen
                ? "border-[var(--brand-primary)]/40"
                : "border-[var(--brand-rule)]"
            }`}
            style={{
              boxShadow: isOpen ? "var(--shadow-md)" : "var(--shadow-xs)",
            }}
          >
            <button
              id={btnId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left px-5 lg:px-6 py-4 lg:py-5 flex items-center justify-between gap-4 group"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <div className="flex items-start gap-3 lg:gap-4 flex-1">
                <span className="font-display text-[14px] font-bold text-[var(--brand-accent)] tabular-nums shrink-0 pt-0.5">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span
                  className={`text-[15px] lg:text-[15.5px] font-bold leading-snug tracking-tight ${
                    isOpen ? "text-[var(--brand-primary)]" : "text-[var(--brand-navy)] group-hover:text-[var(--brand-primary)]"
                  } transition-colors`}
                >
                  {item.q}
                </span>
              </div>
              <span
                className={`shrink-0 grid place-items-center h-8 w-8 rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] rotate-45"
                    : "bg-white text-[var(--brand-primary)] border-[var(--brand-primary)]/30 group-hover:bg-[var(--brand-primary-tint)]"
                }`}
                aria-hidden
              >
                <Icon name="plus" size={14} />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 lg:px-6 pb-5 pl-12 lg:pl-[68px] text-[14px] text-slate-600 leading-relaxed">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
