"use client";

import { useId } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
};

export default function DarkSelect({
  label,
  value,
  onChange,
  options,
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
      <select
        id={id}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white/10 border rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/40 ${
          error ? "border-[#fda4af]" : "border-white/15"
        }`}
      >
        {options.map((o) => (
          <option key={o} value={o} className="text-[var(--brand-navy)]">
            {o || "Select…"}
          </option>
        ))}
      </select>
      {error && (
        <p id={errId} role="alert" className="mt-1 text-[11.5px] text-[#fecaca]">
          {error}
        </p>
      )}
    </div>
  );
}
