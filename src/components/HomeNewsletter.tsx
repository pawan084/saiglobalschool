"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { useAppDispatch } from "@/store/hooks";
import { submitNewsletter } from "@/store/slices/newsletterSlice";

export default function HomeNewsletter() {
  const dispatch = useAppDispatch();
  const [email, setEmail]            = useState("");
  const [busy, setBusy]              = useState(false);
  const [done, setDone]              = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [error, setError]            = useState<string | null>(null);
  const [honey, setHoney]            = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId  = useId();
  const errId    = `${inputId}-err`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || honey) return;
    const v = email.trim();
    if (!v || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
      setError("Please enter a valid email address.");
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const result = await dispatch(submitNewsletter({ email: v.toLowerCase(), source: "homepage" })).unwrap();
      setAlreadySubscribed(result.already_subscribed === true);
      setDone(true);
      setEmail("");
    } catch (err: unknown) {
      setError(typeof err === "string" ? err : "Something went wrong. Please try again.");
      inputRef.current?.focus();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="py-16 lg:py-20 bg-[var(--brand-cream)]">
      <div className="section-shell">
        <div className="max-w-2xl mx-auto text-center">
          <div className="news-eyebrow text-[var(--brand-accent)] mb-3">Stay informed</div>
          <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-bold tracking-tight text-[var(--brand-navy)] leading-tight">
            Get school updates in your inbox
          </h2>
          <p className="mt-3 text-[15px] text-slate-600 leading-relaxed max-w-lg mx-auto">
            Monthly notes on admissions, open houses, campus events, and what students are learning — straight to your inbox.
          </p>
        </div>

        <div className="max-w-md mx-auto mt-8">
          {done ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <span className="inline-grid place-items-center h-12 w-12 rounded-2xl bg-[var(--brand-primary)] text-white">
                <Icon name="check" size={20} />
              </span>
              <p className="font-bold text-[var(--brand-navy)] text-[16px]">
                {alreadySubscribed ? "You’re already subscribed!" : "You’re on the list!"}
              </p>
              <p className="text-[13px] text-slate-500 text-center">
                {alreadySubscribed
                  ? "This email is already on our list. We’ll keep the updates coming."
                  : "We’ll be in touch with updates soon. No spam, ever."}
              </p>
              <button
                type="button"
                onClick={() => { setDone(false); setAlreadySubscribed(false); }}
                className="text-[12px] text-[var(--brand-primary)] hover:underline mt-1"
              >
                Subscribe with a different email &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-3">
              {/* honeypot */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
                aria-hidden="true"
                className="absolute opacity-0 pointer-events-none w-0 h-0"
              />

              <div className="flex gap-2">
                <label htmlFor={inputId} className="sr-only">Email address</label>
                <input
                  ref={inputRef}
                  id={inputId}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
                  placeholder="your@email.com"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errId : undefined}
                  className={`flex-1 min-w-0 form-input ${error ? "border-red-400" : ""}`}
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="btn-primary !py-2.5 !px-5 !text-[13px] shrink-0 disabled:opacity-60"
                >
                  {busy ? "Subscribing…" : "Subscribe"}
                  {!busy && <Icon name="arrow-right" size={13} />}
                </button>
              </div>

              {error && (
                <p id={errId} role="alert" className="text-[12px] text-red-600">
                  {error}
                </p>
              )}

              <p className="text-[11.5px] text-slate-400 text-center">
                By subscribing you accept our{" "}
                <Link href="/privacy" className="underline hover:text-[var(--brand-primary)]">
                  Privacy Policy
                </Link>
                .{" "}
                <Link href="/unsubscribe" className="text-[var(--brand-primary)] underline hover:opacity-75">
                  Unsubscribe anytime
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
