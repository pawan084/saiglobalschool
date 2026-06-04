"use client";

import { useId } from "react";

/**
 * Text/email/tel/etc. input on a navy/dark card background.
 * Used by TourSlotPicker (Open House booking) and EventRsvpForm (event RSVP).
 * Label is programmatically associated via useId; errors are announced
 * inline (role="alert") and wired through aria-invalid + aria-describedby.
 */
type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
};

export default function DarkField({
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
}: Props) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)] mb-1">
        {label}
        {required && <span aria-hidden> *</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white/10 border rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 ${
          error ? "border-[#fda4af]" : "border-white/15"
        }`}
      />
      {error && (
        <p id={errId} role="alert" className="mt-1 text-[11.5px] text-[#fecaca]">
          {error}
        </p>
      )}
    </div>
  );
}
