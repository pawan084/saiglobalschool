"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useToast } from "@/components/Toast";

const STORAGE_KEY = "sssgs:apply-draft";

type FormState = {
  // Parent
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  relation: string;

  // Child
  childName: string;
  childDob: string;
  childGender: string;
  childNationality: string;

  // Schooling
  childGrade: string;
  intakeTerm: string;
  prevSchool: string;
  prevCurriculum: string;

  // Documents (mock — file names only)
  docs: string[];

  // Notes
  notes: string;
  consent: boolean;
  honey: string;
};

const empty: FormState = {
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  relation: "Mother",
  childName: "",
  childDob: "",
  childGender: "",
  childNationality: "",
  childGrade: "",
  intakeTerm: "",
  prevSchool: "",
  prevCurriculum: "",
  docs: [],
  notes: "",
  consent: false,
  honey: "",
};

const STEPS = [
  { id: 1, label: "Parent" },
  { id: 2, label: "Child" },
  { id: 3, label: "Schooling" },
  { id: 4, label: "Documents" },
  { id: 5, label: "Review" },
];

function load(): FormState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return { ...empty, ...(JSON.parse(raw) as Partial<FormState>) };
  } catch {
    return null;
  }
}

function save(state: FormState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function ApplyWizard() {
  const { show } = useToast();
  const [state, setState] = useState<FormState>(empty);
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState<{ reference: string } | null>(null);

  useEffect(() => {
    const saved = load();
    if (saved) {
      setState(saved);
      show("Draft restored from this device.", "info");
    }
    // We intentionally show the toast only on mount with a saved draft.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save on change (debounced via microtask)
  useEffect(() => {
    if (submitted) return;
    save(state);
  }, [state, submitted]);

  const progress = useMemo(() => (step - 1) / (STEPS.length - 1), [step]);

  function patch(p: Partial<FormState>) {
    setState((s) => ({ ...s, ...p }));
  }

  function canAdvance(): { ok: boolean; msg?: string } {
    if (step === 1) {
      if (!state.parentName.trim()) return { ok: false, msg: "Please enter the parent name." };
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.parentEmail)) return { ok: false, msg: "Please enter a valid email." };
      if (state.parentPhone.replace(/[^\d]/g, "").length < 7) return { ok: false, msg: "Please enter a contact number." };
    }
    if (step === 2) {
      if (!state.childName.trim()) return { ok: false, msg: "Please enter the child's name." };
      if (!state.childDob) return { ok: false, msg: "Please enter date of birth." };
    }
    if (step === 3) {
      if (!state.childGrade) return { ok: false, msg: "Please select a grade." };
    }
    if (step === 5) {
      if (!state.consent) return { ok: false, msg: "Please confirm the privacy consent." };
    }
    return { ok: true };
  }

  function next() {
    const v = canAdvance();
    if (!v.ok) {
      show(v.msg!, "error");
      return;
    }
    setStep((s) => Math.min(STEPS.length, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearDraft() {
    if (confirm("Clear this saved draft? You can't undo this.")) {
      localStorage.removeItem(STORAGE_KEY);
      setState(empty);
      setStep(1);
      show("Draft cleared.", "info");
    }
  }

  async function submit() {
    const v = canAdvance();
    if (!v.ok) {
      show(v.msg!, "error");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        show(data.error || "Submission failed. Please try again.", "error");
        return;
      }
      setSubmitted({ reference: data.reference });
      localStorage.removeItem(STORAGE_KEY);
      show("Application submitted successfully.", "success");
    } catch {
      show("Network hiccup. Please try again.", "error");
    } finally {
      setBusy(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto">
        <div
          className="rounded-3xl bg-white border border-[var(--brand-rule)] p-8 lg:p-10 text-center relative overflow-hidden"
          style={{ boxShadow: "0 24px 48px -16px rgba(11,29,51,0.30)" }}
        >
          <span
            aria-hidden
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-25 pointer-events-none"
            style={{ background: "radial-gradient(closest-side, var(--brand-primary), transparent)" }}
          />
          <span
            className="relative inline-grid place-items-center h-14 w-14 rounded-2xl text-white mb-4"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
            }}
            aria-hidden
          >
            <Icon name="check" size={22} />
          </span>
          <div className="relative">
            <div className="news-eyebrow text-[var(--brand-accent)]">Application received</div>
            <h2 className="font-display text-[28px] font-bold text-[var(--brand-navy)] mt-1">
              Thank you, {state.parentName.split(" ")[0] || "parent"}.
            </h2>
            <p className="mt-2 text-[14px] text-slate-600 leading-relaxed">
              We&rsquo;ll be in touch within one business day at{" "}
              <span className="font-bold text-[var(--brand-navy)]">{state.parentEmail}</span>.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--brand-rule)] text-[12px]">
              <span className="text-slate-500">Reference</span>
              <span className="font-mono text-[var(--brand-navy)] font-bold">{submitted.reference}</span>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Link href="/" className="btn-secondary">
                Back to home
              </Link>
              <Link href="/open-house" className="btn-primary">
                RSVP for open house
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-6 lg:gap-8">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <div className="text-[11px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)] mb-2">
            Application
          </div>
          <ol className="space-y-1.5">
            {STEPS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => s.id <= step && setStep(s.id)}
                  disabled={s.id > step}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-left transition ${
                    s.id === step
                      ? "bg-[var(--brand-navy)] text-white"
                      : s.id < step
                      ? "text-[var(--brand-navy)] hover:bg-[var(--brand-cream)]"
                      : "text-slate-400"
                  }`}
                >
                  <span
                    className={`grid place-items-center h-6 w-6 rounded-full text-[11px] font-bold ${
                      s.id < step
                        ? "bg-[var(--brand-primary-tint)] text-[var(--brand-primary-dark)]"
                        : s.id === step
                        ? "bg-white text-[var(--brand-navy)]"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {s.id < step ? <Icon name="check" size={11} /> : s.id}
                  </span>
                  <span className="text-[13.5px] font-bold">{s.label}</span>
                </button>
              </li>
            ))}
          </ol>
          <button
            onClick={clearDraft}
            className="mt-5 text-[12px] text-slate-500 hover:text-[var(--brand-accent)] underline-offset-2 hover:underline"
          >
            Clear saved draft
          </button>
        </div>
      </aside>

      {/* Form */}
      <section
        className="rounded-3xl bg-white border border-[var(--brand-rule)] p-5 lg:p-8 relative"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        {/* Mobile progress */}
        <div className="lg:hidden mb-5">
          <div className="flex justify-between text-[10.5px] uppercase tracking-[0.14em] font-bold text-slate-500">
            <span>Step {step} of {STEPS.length}</span>
            <span>{STEPS[step - 1].label}</span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full transition-[width] duration-300"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, var(--brand-primary) 0%, var(--brand-accent) 100%)",
              }}
            />
          </div>
        </div>

        {/* Hidden honeypot */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={state.honey}
          onChange={(e) => patch({ honey: e.target.value })}
          className="absolute opacity-0 pointer-events-none w-0 h-0"
        />

        {step === 1 && (
          <Step title="Parent / guardian details" subtitle="We'll respond to this contact.">
            <Field label="Full name" value={state.parentName} onChange={(v) => patch({ parentName: v })} required />
            <Field label="Email" type="email" value={state.parentEmail} onChange={(v) => patch({ parentEmail: v })} required />
            <Field label="Phone / WhatsApp" value={state.parentPhone} onChange={(v) => patch({ parentPhone: v })} required />
            <Select
              label="Relation to child"
              value={state.relation}
              onChange={(v) => patch({ relation: v })}
              options={["Mother", "Father", "Guardian", "Other"]}
            />
          </Step>
        )}

        {step === 2 && (
          <Step title="About your child">
            <Field label="Full name" value={state.childName} onChange={(v) => patch({ childName: v })} required />
            <Field label="Date of birth" type="date" value={state.childDob} onChange={(v) => patch({ childDob: v })} required />
            <Select
              label="Gender"
              value={state.childGender}
              onChange={(v) => patch({ childGender: v })}
              options={["", "Female", "Male", "Prefer not to say"]}
            />
            <Field label="Nationality" value={state.childNationality} onChange={(v) => patch({ childNationality: v })} />
          </Step>
        )}

        {step === 3 && (
          <Step title="Schooling & intake">
            <Select
              label="Grade applying for"
              value={state.childGrade}
              onChange={(v) => patch({ childGrade: v })}
              options={["", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"]}
              required
            />
            <Select
              label="Preferred intake term"
              value={state.intakeTerm}
              onChange={(v) => patch({ intakeTerm: v })}
              options={["", "Term 1 (April)", "Term 2 (July)", "Term 3 (October)", "Mid-term / ASAP"]}
            />
            <Field label="Previous school" value={state.prevSchool} onChange={(v) => patch({ prevSchool: v })} />
            <Select
              label="Previous curriculum"
              value={state.prevCurriculum}
              onChange={(v) => patch({ prevCurriculum: v })}
              options={["", "CBSE", "ICSE", "IB", "Cambridge", "MOE Singapore", "Other"]}
            />
          </Step>
        )}

        {step === 4 && (
          <Step
            title="Documents"
            subtitle="Mark which documents you can share. We'll request uploads or originals as we progress."
          >
            <DocList
              docs={[
                "Birth certificate (or passport bio page)",
                "Most recent report card / academic record",
                "Passport-size photographs (recent)",
                "Parents' photo ID (NRIC / passport)",
                "Vaccination / health record",
                "Reference letter (if available)",
              ]}
              selected={state.docs}
              onChange={(d) => patch({ docs: d })}
            />
          </Step>
        )}

        {step === 5 && (
          <Step
            title="Review & submit"
            subtitle="A quick check before we send this to our admissions team."
          >
            <ReviewBlock state={state} />
            <Field
              label="Anything we should know? (optional)"
              type="textarea"
              value={state.notes}
              onChange={(v) => patch({ notes: v })}
            />
            <label className="mt-2 flex items-start gap-3 text-[13px] text-slate-700 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                checked={state.consent}
                onChange={(e) => patch({ consent: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
              />
              <span>
                I consent to SSSGS contacting me about this application and processing my
                personal data in line with the{" "}
                <Link href="/privacy" className="text-[var(--brand-primary)] hover:underline font-bold">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </Step>
        )}

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-between gap-3 pt-5 border-t border-[var(--brand-rule)]">
          <button
            onClick={back}
            disabled={step === 1}
            className="btn-secondary !py-2 !px-4 text-[13px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Icon name="arrow-left" size={13} />
            Back
          </button>
          <span className="hidden sm:inline-block text-[11px] text-slate-400">
            Saved automatically to this device.
          </span>
          {step < STEPS.length ? (
            <button onClick={next} className="btn-primary !py-2 !px-4 text-[13px]">
              Continue
              <Icon name="arrow-right" size={13} />
            </button>
          ) : (
            <button onClick={submit} disabled={busy} className="btn-primary !py-2 !px-4 text-[13px]">
              {busy ? "Submitting…" : "Submit application"}
              {!busy && <Icon name="check" size={13} />}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

/* ───────────────────────── primitives ───────────────────────── */

function Step({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="news-eyebrow text-[var(--brand-accent)]">Step</div>
      <h2 className="font-display text-[22px] lg:text-[26px] font-bold text-[var(--brand-navy)] tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-[13.5px] text-slate-500">{subtitle}</p>}
      <div className="mt-5 grid sm:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = `f-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  if (type === "textarea") {
    return (
      <div className="sm:col-span-2">
        <label htmlFor={id} className="block text-[12px] font-bold text-[var(--brand-navy)] mb-1">
          {label}
          {required && <span className="text-[var(--brand-accent)]"> *</span>}
        </label>
        <textarea
          id={id}
          rows={3}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-input w-full"
        />
      </div>
    );
  }
  return (
    <div>
      <label htmlFor={id} className="block text-[12px] font-bold text-[var(--brand-navy)] mb-1">
        {label}
        {required && <span className="text-[var(--brand-accent)]"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input w-full"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  const id = `s-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="block text-[12px] font-bold text-[var(--brand-navy)] mb-1">
        {label}
        {required && <span className="text-[var(--brand-accent)]"> *</span>}
      </label>
      <select
        id={id}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="form-input w-full"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o || "Select…"}
          </option>
        ))}
      </select>
    </div>
  );
}

function DocList({
  docs,
  selected,
  onChange,
}: {
  docs: string[];
  selected: string[];
  onChange: (d: string[]) => void;
}) {
  function toggle(d: string) {
    onChange(selected.includes(d) ? selected.filter((x) => x !== d) : [...selected, d]);
  }
  return (
    <div className="sm:col-span-2 grid sm:grid-cols-2 gap-2">
      {docs.map((d) => {
        const on = selected.includes(d);
        return (
          <button
            key={d}
            type="button"
            onClick={() => toggle(d)}
            aria-pressed={on}
            className={`text-left p-3 rounded-xl border flex items-center gap-3 transition ${
              on
                ? "border-[var(--brand-primary)] bg-[var(--brand-primary-tint)]"
                : "border-[var(--brand-rule)] bg-white hover:border-[var(--brand-primary)]"
            }`}
          >
            <span
              className={`grid place-items-center h-5 w-5 rounded-md shrink-0 ${
                on
                  ? "bg-[var(--brand-primary)] text-white"
                  : "border border-slate-300 text-transparent"
              }`}
              aria-hidden
            >
              <Icon name="check" size={10} />
            </span>
            <span className="text-[13px] text-[var(--brand-navy)]">{d}</span>
          </button>
        );
      })}
    </div>
  );
}

function ReviewBlock({ state }: { state: FormState }) {
  const rows: [string, string][] = [
    ["Parent", `${state.parentName || "—"} (${state.relation})`],
    ["Contact", `${state.parentEmail || "—"} · ${state.parentPhone || "—"}`],
    ["Child", `${state.childName || "—"} · DOB ${state.childDob || "—"}`],
    ["Demographics", `${state.childGender || "—"} · ${state.childNationality || "—"}`],
    ["Applying for", `${state.childGrade || "—"} · ${state.intakeTerm || "—"}`],
    ["Previous", `${state.prevSchool || "—"} · ${state.prevCurriculum || "—"}`],
    ["Documents", state.docs.length ? state.docs.join(", ") : "—"],
  ];
  return (
    <div className="sm:col-span-2 rounded-2xl border border-[var(--brand-rule)] bg-[var(--brand-cream)]/40 p-4">
      <dl className="grid sm:grid-cols-2 gap-y-2 gap-x-4 text-[13px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-col">
            <dt className="text-[10.5px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
              {k}
            </dt>
            <dd className="text-[var(--brand-navy)]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
