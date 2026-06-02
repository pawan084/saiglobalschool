"use client";

import { useState } from "react";

export type FAQ = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-[var(--brand-rule)] border-y border-[var(--brand-rule)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left py-4 flex items-center justify-between gap-4"
            >
              <span className="font-semibold text-[var(--brand-navy)]">{item.q}</span>
              <span className="text-xl text-[var(--brand-accent)] shrink-0">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <div className="pb-4 pr-8 text-slate-700 leading-relaxed">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
