"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { useAppDispatch } from "@/store/hooks";
import { unsubscribeNewsletter } from "@/store/slices/newsletterSlice";

export default function UnsubscribeForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [busy, setBusy]   = useState(false);
  const [done, setDone]   = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId  = useId();
  const errId    = `${inputId}-err`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!v || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
      setError("Please enter a valid email address.");
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setBusy(true);
    try {
      await dispatch(unsubscribeNewsletter(v.toLowerCase())).unwrap();
      setDone(true);
    } catch (err: unknown) {
      setError(typeof err === "string" ? err : "Something went wrong. Please try again.");
      inputRef.current?.focus();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-[var(--brand-navy)]/10 mx-auto mb-4">
          <Icon name="mail" size={24} className="text-[var(--brand-navy)]" />
        </div>
        <h1 className="font-display text-[28px] sm:text-[34px] font-bold text-[var(--brand-navy)] tracking-tight">
          Unsubscribe
        </h1>
        <p className="mt-2 text-[14px] text-slate-500 leading-relaxed">
          Enter your email address and we&rsquo;ll remove you from our mailing list immediately.
        </p>
      </div>

      {done ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
          <span className="inline-grid place-items-center h-12 w-12 rounded-2xl bg-green-100 mx-auto mb-4">
            <Icon name="check" size={20} className="text-green-600" />
          </span>
          <p className="font-bold text-[var(--brand-navy)] text-[16px]">You&rsquo;ve been unsubscribed.</p>
          <p className="mt-2 text-[13px] text-slate-500">
            We&rsquo;ve removed <span className="font-medium text-slate-700">{email}</span> from our mailing list.
            You won&rsquo;t receive any more emails from us.
          </p>
          <p className="mt-4 text-[12px] text-slate-400">
            Changed your mind?{" "}
            <Link href="/#newsletter" className="text-[var(--brand-primary)] hover:underline">
              Subscribe again
            </Link>
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <form onSubmit={submit} noValidate className="space-y-4">
            <div>
              <label htmlFor={inputId} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                Email address
              </label>
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
                className={`w-full form-input ${error ? "border-red-400" : ""}`}
              />
              {error && (
                <p id={errId} role="alert" className="mt-1.5 text-[12px] text-red-600">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full btn-primary justify-center disabled:opacity-60"
            >
              {busy ? "Unsubscribing…" : "Unsubscribe me"}
            </button>
          </form>

          <p className="mt-5 text-[11.5px] text-slate-400 text-center">
            Didn&rsquo;t sign up?{" "}
            <Link href="/contact-us" className="underline hover:text-[var(--brand-primary)]">
              Contact us
            </Link>{" "}
            and we&rsquo;ll investigate.
          </p>
        </div>
      )}
    </div>
  );
}
