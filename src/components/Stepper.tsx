"use client";

import { useState } from "react";

export type Step = { title: string; body: string };

export default function Stepper({ steps }: { steps: Step[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {steps.map((s, i) => {
        const expanded = i === open;
        return (
          <div
            key={i}
            className={`border ${
              expanded ? "border-[var(--brand-primary)]" : "border-[var(--brand-rule)]"
            } bg-white rounded-md overflow-hidden transition-colors`}
          >
            <button
              onClick={() => setOpen(expanded ? -1 : i)}
              className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left"
            >
              <span
                className={`h-9 w-9 grid place-items-center shrink-0 rounded-full font-bold text-sm ${
                  expanded
                    ? "bg-[var(--brand-primary)] text-white"
                    : "bg-[var(--brand-cream)] text-[var(--brand-accent)]"
                }`}
              >
                {i + 1}
              </span>
              <div className="flex-1 font-bold text-[var(--brand-navy)]">
                Step {i + 1}: {s.title}
              </div>
              <span className="text-slate-500 text-xl">{expanded ? "−" : "+"}</span>
            </button>
            {expanded && (
              <div className="px-4 sm:px-5 pb-4 pt-1 text-slate-700 leading-relaxed border-t border-[var(--brand-rule)]">
                {s.body}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
