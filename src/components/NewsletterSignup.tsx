"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { useToast } from "./Toast";
import Icon from "./Icon";
import { fetchWithTimeout } from "@/lib/fetch";

export default function NewsletterSignup() {
  const { show } = useToast();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [honey, setHoney] = useState(""); // bot honeypot
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const errId = `${inputId}-err`;

  function validate(): string | null {
    const v = email.trim();
    if (!v) return "Email is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return "Please enter a valid email.";
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    const v = validate();
    if (v) {
      setError(v);
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const res = await fetchWithTimeout("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honey }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const msg = data.error || "Something went wrong. Please try again.";
        setError(msg);
        inputRef.current?.focus();
      } else {
        show("You're on the list — see you in your inbox.", "success");
        setEmail("");
      }
    } catch {
      setError("Network hiccup. Please try again.");
      inputRef.current?.focus();
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2" aria-labelledby="newsletter-title" noValidate>
      <div id="newsletter-title" className="font-display text-[15px] font-bold text-white">
        Stay in the loop
      </div>
      <p className="text-[12px] text-white/70 leading-snug">
        Monthly notes on admissions, open houses, and what students are up to.
      </p>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className="mt-1 flex gap-2">
        <input
          ref={inputRef}
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          className={`flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/10 border text-white placeholder:text-white/40 text-[13px] focus:outline-none focus:border-white/40 ${error ? "border-[#fda4af]" : "border-white/15"}`}
        />
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
          name="company"
          aria-hidden="true"
          className="absolute opacity-0 pointer-events-none w-0 h-0"
        />
        <button
          type="submit"
          disabled={busy}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-dark)] text-white text-[12.5px] font-bold transition disabled:opacity-60"
        >
          {busy ? "Subscribing…" : "Subscribe"}
          {!busy && <Icon name="arrow-right" size={12} />}
        </button>
      </div>
      {error && (
        <p id={errId} role="alert" className="text-[11.5px] text-[#fecaca]">
          {error}
        </p>
      )}
      <p className="mt-1 text-[11px] text-white/55 leading-snug">
        By subscribing you accept our{" "}
        <Link href="/privacy" className="underline hover:text-white">
          Privacy Policy
        </Link>
        . Unsubscribe anytime.
      </p>
    </form>
  );
}
