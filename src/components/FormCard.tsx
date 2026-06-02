"use client";

import { useState } from "react";
import { useToast } from "./Toast";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "date" | "select";
  required?: boolean;
  options?: string[]; // for select
  placeholder?: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  fields: Field[];
  submitLabel?: string;
  sideContent?: React.ReactNode;
};

export default function FormCard({
  title,
  subtitle,
  fields,
  submitLabel = "Submit",
  sideContent,
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();
  return (
    <div className="grid lg:grid-cols-3 gap-10">
      <form
        className="lg:col-span-2 grid gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          toast.show("Thanks — we'll be in touch within one business day.", "success");
        }}
      >
        {title && <h3 className="text-xl font-bold text-[var(--brand-navy)]">{title}</h3>}
        {subtitle && <p className="text-slate-600 text-sm -mt-3">{subtitle}</p>}
        {submitted && (
          <div className="p-4 bg-[var(--brand-cream)] border border-[var(--brand-accent)] text-[var(--brand-accent-dark)] rounded">
            Thanks! We&rsquo;ll be in touch within one business day.
          </div>
        )}
        {fields.map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {f.label}
              {f.required && <span className="text-[var(--brand-accent)]"> *</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea
                name={f.name}
                required={f.required}
                rows={4}
                placeholder={f.placeholder}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 outline-none"
              />
            ) : f.type === "select" ? (
              <select
                name={f.name}
                required={f.required}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 outline-none"
              >
                <option value="">Select…</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                type={f.type || "text"}
                name={f.name}
                required={f.required}
                placeholder={f.placeholder}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 outline-none"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="self-start px-7 py-3.5 rounded-full bg-[var(--brand-accent)] text-white font-bold hover:bg-[var(--brand-accent-dark)] transition shadow"
        >
          {submitLabel}
        </button>
        <p className="text-xs text-slate-500">
          By submitting you agree to be contacted regarding your inquiry. We do not share your data.
        </p>
      </form>
      {sideContent && (
        <aside className="space-y-5 lg:border-l lg:border-[var(--brand-rule)] lg:pl-8">{sideContent}</aside>
      )}
    </div>
  );
}
