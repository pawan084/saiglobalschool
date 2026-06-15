"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";
import Icon from "./Icon";
import { fetchWithTimeout } from "@/lib/fetch";

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
  /** Tag the submission so the inquiry-receiver can route it (e.g. "inquire", "contact"). */
  source?: string;
};

export default function FormCard({
  title,
  subtitle,
  fields,
  submitLabel = "Submit",
  sideContent,
  source = "form",
}: Props) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const toast = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const data = new FormData(e.currentTarget);
    const payload: Record<string, FormDataEntryValue | string> = { source };
    data.forEach((v, k) => {
      payload[k] = v;
    });
    setBusy(true);
    try {
      const res = await fetchWithTimeout("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        toast.show(json.error || "Couldn't send right now. Please try again.", "error");
        return;
      }
      const params = new URLSearchParams();
      if (typeof json.reference === "string") params.set("ref", json.reference);
      params.set("source", source);
      router.push(`/thank-you?${params.toString()}`);
    } catch {
      toast.show("Network hiccup. Please try again.", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
      <form
        className="lg:col-span-2 relative rounded-2xl bg-white border border-[var(--brand-rule)] p-6 lg:p-8 overflow-hidden"
        style={{ boxShadow: "var(--shadow-sm)" }}
        onSubmit={onSubmit}
      >
        {/* Honeypot */}
        <input
          type="text"
          name="honey"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute opacity-0 pointer-events-none w-0 h-0"
        />
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

          <div className="mt-6 grid sm:grid-cols-2 gap-4 lg:gap-5">
            {fields.map((f) => (
              <FieldGroup key={f.name} field={f} />
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <button
              type="submit"
              disabled={busy}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? "Sending…" : submitLabel}
              {!busy && <Icon name="arrow-right" size={15} />}
            </button>
            <div className="inline-flex items-center gap-2 text-[12px] text-slate-500">
              <Icon name="lock" size={12} className="text-[var(--brand-primary)]" />
              <span>Your details stay private</span>
            </div>
          </div>
          <p className="mt-3 text-[12px] text-slate-500 leading-snug">
            By submitting you accept our{" "}
            <Link href="/privacy" className="text-[var(--brand-primary)] hover:underline font-bold">
              Privacy Policy
            </Link>
            .
          </p>
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
  const id = useId();
  const span = f.fullWidth || f.type === "textarea" ? "sm:col-span-2" : "";
  return (
    <div className={span}>
      <label htmlFor={id} className="block text-[12px] font-bold uppercase tracking-[0.06em] text-slate-600 mb-1.5">
        {f.label}
        {f.required && <span className="text-[var(--brand-accent)]" aria-hidden> *</span>}
        {f.required && <span className="sr-only"> (required)</span>}
      </label>
      {f.type === "textarea" ? (
        <textarea
          id={id}
          name={f.name}
          required={f.required}
          rows={4}
          placeholder={f.placeholder ?? "Tell us a bit…"}
          className="form-input w-full"
        />
      ) : f.type === "select" ? (
        <select id={id} name={f.name} required={f.required} className="form-input w-full">
          <option value="">Select…</option>
          {f.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
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
