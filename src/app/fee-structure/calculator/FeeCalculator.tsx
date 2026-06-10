"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useToast } from "@/components/Toast";
import {
  bandForGrade,
  getFeeLines,
  annualise,
  format,
  CURRENCIES,
  type Currency,
} from "@/lib/fees";

const GRADES = [1, 2, 3, 4, 5, 6, 7, 8];

function packState(grade: number, ccy: Currency, addonIds: string[]): string {
  const params = new URLSearchParams();
  params.set("g", String(grade));
  params.set("c", ccy);
  if (addonIds.length) params.set("a", addonIds.join(","));
  return params.toString();
}

export default function FeeCalculator() {
  const sp = useSearchParams();
  const { show } = useToast();

  const [grade, setGrade] = useState<number>(Number(sp.get("g")) || 3);
  const [currency, setCurrency] = useState<Currency>(
    ((sp.get("c") as Currency) && CURRENCIES[sp.get("c") as Currency]) ? (sp.get("c") as Currency) : "SGD"
  );
  const [addons, setAddons] = useState<string[]>(
    sp.get("a") ? sp.get("a")!.split(",").filter(Boolean) : []
  );

  const band = bandForGrade(grade);
  const lines = getFeeLines(band);

  const selected = useMemo(() => {
    return lines.filter(
      (l) => l.group === "core" || addons.includes(l.id)
    );
  }, [lines, addons]);

  const totals = useMemo(() => {
    const annual = selected.reduce((s, l) => s + annualise(l), 0);
    const monthly = Math.round(annual / 12);
    const oneTime = selected
      .filter((l) => l.frequency === "one-time")
      .reduce((s, l) => s + l.amountSgd, 0);
    const recurring = annual - oneTime;
    return { annual, monthly, oneTime, recurring };
  }, [selected]);

  // Sync URL on change
  useEffect(() => {
    const qs = packState(grade, currency, addons);
    const url = `${location.pathname}?${qs}`;
    history.replaceState(null, "", url);
  }, [grade, currency, addons]);

  function toggleAddon(id: string) {
    setAddons((arr) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]));
  }

  function share() {
    const url = `${location.origin}${location.pathname}?${packState(grade, currency, addons)}`;
    navigator.clipboard.writeText(url).then(
      () => show("Estimate link copied. Paste it anywhere.", "success"),
      () => show("Could not copy. You can copy from the address bar.", "error")
    );
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
      {/* Configurator */}
      <div className="space-y-6">
        {/* Grade picker */}
        <section
          className="rounded-2xl bg-white border border-[var(--brand-rule)] p-5 lg:p-6"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <div className="news-eyebrow text-[var(--brand-accent)]">Step 1</div>
              <h2 className="font-display text-[18px] font-bold text-[var(--brand-navy)]">
                Pick your child&rsquo;s grade
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[var(--brand-primary-tint)] text-[var(--brand-primary-dark)] text-[11px] font-bold uppercase tracking-[0.1em]">
              {band === "primary" ? "Primary band" : "Secondary band"}
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                aria-pressed={grade === g}
                className={`rounded-xl py-2.5 text-[14px] font-bold border transition ${
                  grade === g
                    ? "bg-[var(--brand-navy)] text-white border-[var(--brand-navy)]"
                    : "bg-white text-slate-700 border-[var(--brand-rule)] hover:border-[var(--brand-primary)]"
                }`}
              >
                G{g}
              </button>
            ))}
          </div>
        </section>

        {/* Add-ons */}
        <section
          className="rounded-2xl bg-white border border-[var(--brand-rule)] p-5 lg:p-6"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <div className="mb-3">
            <div className="news-eyebrow text-[var(--brand-accent)]">Step 2</div>
            <h2 className="font-display text-[18px] font-bold text-[var(--brand-navy)]">
              Optional add-ons
            </h2>
            <p className="text-[12.5px] text-slate-500 mt-0.5">
              Toggle anything you might choose. Numbers update live.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {lines
              .filter((l) => l.group === "addon")
              .map((l) => {
                const on = addons.includes(l.id);
                return (
                  <button
                    key={l.id}
                    onClick={() => toggleAddon(l.id)}
                    aria-pressed={on}
                    className={`text-left p-3 rounded-xl border transition flex items-start gap-3 ${
                      on
                        ? "border-[var(--brand-primary)] bg-[var(--brand-primary-tint)]"
                        : "border-[var(--brand-rule)] bg-white hover:border-[var(--brand-primary)]"
                    }`}
                  >
                    <span
                      className={`grid place-items-center h-5 w-5 rounded-md mt-0.5 shrink-0 ${
                        on
                          ? "bg-[var(--brand-primary)] text-white"
                          : "border border-slate-300 text-transparent"
                      }`}
                      aria-hidden
                    >
                      <Icon name="check" size={10} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-bold text-[14px] text-[var(--brand-navy)]">
                        {l.label}
                      </span>
                      {l.description && (
                        <span className="block text-[11.5px] text-slate-500 mt-0.5">
                          {l.description}
                        </span>
                      )}
                      <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="font-bold text-[var(--brand-navy)]">
                          {format(l.amountSgd, currency)}
                        </span>
                        <span>·</span>
                        <span className="capitalize">{l.frequency.replace("-", " ")}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
          </div>
        </section>

        {/* Currency switcher */}
        <section
          className="rounded-2xl bg-white border border-[var(--brand-rule)] p-5 lg:p-6"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <div className="mb-3">
            <div className="news-eyebrow text-[var(--brand-accent)]">Step 3</div>
            <h2 className="font-display text-[18px] font-bold text-[var(--brand-navy)]">
              Currency
            </h2>
            <p className="text-[11.5px] text-slate-500 mt-0.5">
              Indicative conversion only. Final billing is in SGD.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                aria-pressed={currency === c}
                className={`rounded-xl py-2.5 text-[13px] font-bold border transition ${
                  currency === c
                    ? "bg-[var(--brand-navy)] text-white border-[var(--brand-navy)]"
                    : "bg-white text-slate-700 border-[var(--brand-rule)] hover:border-[var(--brand-primary)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Summary card (sticky on desktop) */}
      <aside className="lg:sticky lg:top-28 self-start">
        <div
          className="rounded-2xl bg-[var(--brand-navy)] text-white p-6 relative overflow-hidden"
          style={{ boxShadow: "0 24px 48px -16px rgba(11,29,51,0.36)" }}
        >
          <span
            aria-hidden
            className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-25 pointer-events-none"
            style={{ background: "radial-gradient(closest-side, var(--brand-accent), transparent)" }}
          />
          {/* Announce the recomputed estimate when grade/add-ons/currency change. */}
          <div className="relative" aria-live="polite">
            <div className="text-[11px] uppercase tracking-[0.16em] font-bold text-[var(--brand-accent)]">
              Estimate · Grade {grade}
            </div>
            <div className="mt-1 font-display text-[15px] text-white/80">
              Year 1 (includes one-time fees)
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-[40px] sm:text-[44px] font-bold leading-none">
                {format(totals.annual, currency)}
              </span>
              <span className="text-[12px] font-bold text-white/60">/ year</span>
            </div>
            <div className="mt-1 text-[12px] text-white/60">
              ≈ {format(totals.monthly, currency)} / month
            </div>

            <hr className="my-5 border-white/10" />

            <div className="flex items-baseline justify-between gap-3 text-[10px] uppercase tracking-wide text-white/40 mb-1.5">
              <span>Line item</span>
              <span>Annualised</span>
            </div>
            <ul className="text-[13px] space-y-1.5 max-h-[270px] overflow-y-auto pr-1">
              {selected.map((l) => (
                <li key={l.id} className="flex items-baseline justify-between gap-3">
                  <span className="text-white/85 truncate">
                    {l.label}
                    <span className="ml-1 text-[10px] text-white/40">
                      · {l.frequency}
                    </span>
                  </span>
                  <span className="font-mono text-white/95 shrink-0">
                    {format(annualise(l), currency)}
                  </span>
                </li>
              ))}
            </ul>

            <hr className="my-5 border-white/10" />

            <dl className="text-[12px] space-y-1.5">
              <div className="flex justify-between">
                <dt className="text-white/60">One-time</dt>
                <dd className="font-mono">{format(totals.oneTime, currency)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/60">Recurring / year</dt>
                <dd className="font-mono">{format(totals.recurring, currency)}</dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-col gap-2">
              <Link
                href={`/inquire-book-a-tour?from=fee-calculator&g=${grade}`}
                className="btn-primary justify-center !py-2.5"
              >
                Send to admissions
                <Icon name="arrow-right" size={14} />
              </Link>
              <button
                onClick={share}
                className="inline-flex items-center justify-center gap-2 py-2 rounded-full border border-white/20 hover:border-white/50 text-[13px] font-bold transition"
              >
                <Icon name="document" size={13} />
                Copy share link
              </button>
            </div>

            <p className="mt-4 text-[10.5px] text-white/50 leading-relaxed">
              All numbers indicative. Final fees confirmed by admissions and subject to revision.
              See the{" "}
              <Link href="/fee-structure" className="underline">
                official Fee Structure
              </Link>
              .
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
