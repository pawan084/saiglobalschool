"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import Icon from "./Icon";
import { fetchWithTimeout } from "@/lib/fetch";

export default function NewsletterSignup() {
  const { show } = useToast();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [honey, setHoney] = useState(""); // bot honeypot

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetchWithTimeout("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honey }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        show(data.error || "Something went wrong. Please try again.", "error");
      } else {
        show("You're on the list — see you in your inbox.", "success");
        setEmail("");
      }
    } catch {
      show("Network hiccup. Please try again.", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2" aria-labelledby="newsletter-title">
      <div id="newsletter-title" className="font-display text-[15px] font-bold text-white">
        Stay in the loop
      </div>
      <p className="text-[12px] text-white/70 leading-snug">
        Monthly notes on admissions, open houses, and what students are up to.
      </p>
      <div className="mt-1 flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-[13px] focus:outline-none focus:border-white/40"
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
    </form>
  );
}
