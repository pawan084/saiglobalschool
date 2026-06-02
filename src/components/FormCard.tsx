"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import Icon from "./Icon";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "date" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  /** Span 2 cols on the desktop grid (full width). Default: single col. */
  fullWidth?: boolean;
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
    <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
      <form
        className="lg:col-span-2 relative rounded-2xl bg-white border border-[var(--brand-rule)] p-6 lg:p-8 overflow-hidden"
        style={{ boxShadow: "var(--shadow-sm)" }}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          toast.show("Thanks — we'll be in touch within one business day.", "success");
        }}
      >
        {/* Decorative corner orb */}
        <span
          aria-hidden
          className="absolute -top-24 -right-24 w-[260px] h-[260px] rounded-full pointer-events-none opacity-60"
          style={{ background: "radial-gradient(closest-side, var(--brand-cream), transparent)" }}
        />

        <div className="relative">
          {title && (
            <h3 className="font-display text-[20px] lg:text-[22px] font-bold text-[var(--brand-navy)] tracking-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-slate-500 text-[13px] mt-1">{subtitle}</p>
          )}

          {submitted && (
            <div className="mt-5 p-4 rounded-lg bg-[var(--brand-primary-tint)] border border-[var(--brand-primary)]/30 flex items-start gap-3">
              <span className="grid place-items-center h-7 w-7 rounded-full bg-[var(--brand-primary)] text-white shrink-0">
                <Icon name="check" size={14} />
              </span>
              <div>
                <div className="font-bold text-[var(--brand-navy)] text-[14px]">
                  Inquiry received
                </div>
                <p className="mt-0.5 text-[13px] text-slate-700 leading-snug">
                  Thanks — we&rsquo;ll be in touch within one business day. For urgent
                  questions, WhatsApp us.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 grid sm:grid-cols-2 gap-4 lg:gap-5">
            {fields.map((f) => (
              <FieldGroup key={f.name} field={f} />
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <button
              type="submit"
              className="btn-primary"
            >
              {submitLabel}
              <Icon name="arrow-right" size={15} />
            </button>
            <div className="inline-flex items-center gap-2 text-[12px] text-slate-500">
              <Icon name="lock" size={12} className="text-[var(--brand-primary)]" />
              <span>Your details stay private</span>
            </div>
          </div>
        </div>
      </form>

      {sideContent && (
        <aside className="space-y-5 lg:border-l lg:border-[var(--brand-rule)] lg:pl-8">
          {sideContent}
        </aside>
      )}
    </div>
  );
}

function FieldGroup({ field: f }: { field: Field }) {
  const span = f.fullWidth || f.type === "textarea" ? "sm:col-span-2" : "";
  return (
    <div className={span}>
      <label className="block text-[12px] font-bold uppercase tracking-[0.06em] text-slate-600 mb-1.5">
        {f.label}
        {f.required && <span className="text-[var(--brand-accent)]"> *</span>}
      </label>
      {f.type === "textarea" ? (
        <textarea
          name={f.name}
          required={f.required}
          rows={4}
          placeholder={f.placeholder ?? "Tell us a bit…"}
          className="form-input w-full"
        />
      ) : f.type === "select" ? (
        <select name={f.name} required={f.required} className="form-input w-full">
          <option value="">Select…</option>
          {f.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={f.type || "text"}
          name={f.name}
          required={f.required}
          placeholder={f.placeholder ?? ""}
          className="form-input w-full"
        />
      )}
    </div>
  );
}
