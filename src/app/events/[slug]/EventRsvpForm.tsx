"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useToast } from "@/components/Toast";
import { fetchWithTimeout } from "@/lib/fetch";
import DarkField from "@/components/form/DarkField";

export default function EventRsvpForm({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const { show } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [honey, setHoney] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ reference: string } | null>(null);
  const guestsGroupId = useId();
  const guestsLabelId = `${guestsGroupId}-label`;
  const guestsRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const GUEST_OPTIONS = [1, 2, 3, 4];

  function onGuestsKey(e: React.KeyboardEvent<HTMLDivElement>) {
    const idx = GUEST_OPTIONS.indexOf(guests);
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % GUEST_OPTIONS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + GUEST_OPTIONS.length) % GUEST_OPTIONS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = GUEST_OPTIONS.length - 1;
    else return;
    e.preventDefault();
    setGuests(GUEST_OPTIONS[next]);
    guestsRefs.current[next]?.focus();
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetchWithTimeout("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: `event:${slug}`,
          eventTitle: title,
          name,
          email,
          phone,
          guests,
          honey,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        show(data.error || "Couldn't reserve your spot. Please try again.", "error");
        return;
      }
      setDone({ reference: data.reference });
      show("Spot reserved. Check your inbox for the confirmation.", "success");
    } catch {
      show("Network hiccup. Please try again.", "error");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-white border border-[var(--brand-rule)] p-5 text-center" style={{ boxShadow: "var(--shadow-md)" }}>
        <span
          className="inline-grid place-items-center h-11 w-11 rounded-xl text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
          }}
          aria-hidden
        >
          <Icon name="check" size={18} />
        </span>
        <div className="news-eyebrow mt-3">You&rsquo;re in</div>
        <h3 className="font-display text-[18px] font-bold text-[var(--brand-navy)]">
          See you at the event!
        </h3>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--brand-rule)] text-[11.5px]">
          <span className="text-slate-500">Reference</span>
          <span className="font-mono text-[var(--brand-navy)] font-bold">{done.reference}</span>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <a href={`/api/events/${slug}/ics`} className="btn-secondary !py-2 !px-4 text-[12.5px] justify-center">
            <Icon name="calendar" size={12} />
            Add to your calendar
          </a>
          <Link href="/" className="text-[12px] text-slate-500 hover:text-[var(--brand-primary)]">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-[var(--brand-navy)] text-white p-5 lg:p-6 relative overflow-hidden"
      style={{ boxShadow: "0 24px 48px -16px rgba(11,29,51,0.36)" }}
    >
      <span
        aria-hidden
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(closest-side, var(--brand-accent), transparent)" }}
      />
      <div className="relative">
        <div className="text-[10.5px] uppercase tracking-[0.16em] font-bold text-[var(--brand-accent)]">
          RSVP
        </div>
        <h3 className="font-display text-[20px] font-bold leading-tight mt-1">
          Reserve your spot
        </h3>
        <p className="text-[12px] text-white/65 mt-1">It&rsquo;s free. We&rsquo;ll send confirmation by email.</p>

        <div className="mt-4 space-y-2.5">
          <DarkField label="Your name" value={name} onChange={setName} required />
          <DarkField label="Email" type="email" value={email} onChange={setEmail} required />
          <DarkField label="Phone / WhatsApp" value={phone} onChange={setPhone} />
          <div>
            <div id={guestsLabelId} className="block text-[11px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)] mb-1">
              Guests
            </div>
            <div
              role="radiogroup"
              aria-labelledby={guestsLabelId}
              onKeyDown={onGuestsKey}
              className="flex items-center gap-1"
            >
              {GUEST_OPTIONS.map((g, i) => {
                const selected = guests === g;
                return (
                  <button
                    key={g}
                    ref={(el) => {
                      guestsRefs.current[i] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setGuests(g)}
                    className={`h-9 w-9 rounded-lg text-[13px] font-bold border transition ${
                      selected
                        ? "bg-white text-[var(--brand-navy)] border-white"
                        : "bg-transparent text-white/80 border-white/20 hover:border-white/50"
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Honeypot */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
          className="absolute opacity-0 pointer-events-none w-0 h-0"
        />

        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-dark)] text-white text-[13px] font-bold transition disabled:opacity-60"
        >
          {busy ? "Reserving…" : "Reserve my spot"}
          {!busy && <Icon name="arrow-right" size={13} />}
        </button>
        <p className="mt-3 text-[10.5px] text-white/55 leading-relaxed">
          By submitting you agree to our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

