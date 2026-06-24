"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { useToast } from "./Toast";
import DarkField from "./form/DarkField";
import { useAppDispatch } from "@/store/hooks";
import { submitInquiry } from "@/store/slices/inquirySlice";
import DarkSelect from "./form/DarkSelect";

/**
 * Visual tour-slot picker for Open House / private tour booking.
 * Generates 14 days forward, weekdays + Saturday morning.
 * Slot availability is fully client-side for now — when you integrate a real
 * calendar (Cal.com / Calendly / internal Google Cal), the slot grid stays the
 * same shape and the available[] array is fetched server-side.
 */

const SLOT_HOURS = [9, 10, 11, 14, 15, 16];

type Day = {
  iso: string; // YYYY-MM-DD
  date: Date;
  weekday: string;
  monthShort: string;
  dayNum: number;
  openSlots: number[];
};

function nextDays(n: number): Day[] {
  const out: Day[] = [];
  const today = new Date();
  // start from tomorrow
  for (let i = 1; out.length < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const wd = d.getDay();
    // 0=Sun closed, 6=Sat morning only, 1–5 normal
    if (wd === 0) continue;
    const openSlots = wd === 6 ? [9, 10, 11] : SLOT_HOURS;
    out.push({
      // Build the day key from LOCAL fields so it matches the locally-derived
      // weekday/dayNum shown to the user. toISOString() would use the UTC
      // calendar date, which is off by one for users behind UTC in the evening.
      iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      date: d,
      weekday: d.toLocaleDateString("en-SG", { weekday: "short" }),
      monthShort: d.toLocaleDateString("en-SG", { month: "short" }),
      dayNum: d.getDate(),
      openSlots,
    });
  }
  return out;
}

function fmtSlot(h: number) {
  const hh = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${hh}:00 ${ampm}`;
}

export default function TourSlotPicker() {
  const { show } = useToast();
  // Days depend on the current date and would mismatch between SSR and CSR if
  // computed at render. We flip a hydrated flag on mount, then derive `days` and
  // the default `day` at render time so there's no setState-in-effect for the
  // derived values.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // Intentional one-shot hydration flag in effect: the `days` array below
    // derives from current time and would mismatch between SSR and CSR if
    // computed at render. Flipping `hydrated` here triggers the derived
    // re-render on the client only.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);
  const days = useMemo(() => (hydrated ? nextDays(14) : []), [hydrated]);
  const [pickedDay, setPickedDay] = useState<string | null>(null);
  const day = pickedDay ?? days[0]?.iso ?? "";
  const [hour, setHour] = useState<number | null>(null);
  const [timeError, setTimeError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [honey, setHoney] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ reference: string } | null>(null);
  const dispatch = useAppDispatch();

  // Picking a new day resets the hour selection.
  function pickDay(iso: string) {
    setPickedDay(iso);
    setHour(null);
  }

  const dayObj = days.find((d) => d.iso === day);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (!hour) {
      setTimeError(true);
      show("Please pick a time.", "error");
      return;
    }
    setBusy(true);
    try {
      const result = await dispatch(
        submitInquiry({
          name,
          email,
          phone: phone || undefined,
          grade_interest: grade || undefined,
          inquiry_type: "TOUR",
          message: `Preferred slot: ${day} ${hour}:00 SGT`,
          source_url: "tour-slot-picker",
        })
      ).unwrap();
      setDone({ reference: result.reference });
      show("Tour booked — check your inbox for confirmation.", "success");
    } catch (err: unknown) {
      show(
        typeof err === "string" ? err : "Couldn't book that slot. Please try again.",
        "error"
      );
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div
        className="rounded-3xl bg-white border border-[var(--brand-rule)] p-8 lg:p-10 text-center relative overflow-hidden max-w-2xl mx-auto"
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
          <div className="news-eyebrow text-[var(--brand-accent)]">Tour confirmed</div>
          <h3 className="font-display text-[26px] font-bold text-[var(--brand-navy)] mt-1">
            See you on {dayObj?.weekday}, {dayObj?.monthShort} {dayObj?.dayNum}
          </h3>
          <p className="mt-2 text-[14px] text-slate-600">
            at <strong>{fmtSlot(hour!)} SGT</strong>. We&rsquo;ll send a calendar invite to{" "}
            <strong>{email}</strong>.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--brand-rule)] text-[12px]">
            <span className="text-slate-500">Reference</span>
            <span className="font-mono text-[var(--brand-navy)] font-bold">{done.reference}</span>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link href="/" className="btn-secondary">
              Back to home
            </Link>
            <Link href="/apply" className="btn-primary">
              Start an application
              <Icon name="arrow-right" size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-6 lg:gap-8">
      {/* Calendar */}
      <div
        className="rounded-2xl bg-white border border-[var(--brand-rule)] p-5 lg:p-6"
        style={{ boxShadow: "var(--shadow-sm)" }}
      >
        <div className="news-eyebrow text-[var(--brand-accent)]">Step 1</div>
        <h3 className="font-display text-[20px] font-bold text-[var(--brand-navy)]">
          Choose a date
        </h3>
        <p className="text-[12px] text-slate-500 mt-0.5">
          Weekdays 9 AM – 4 PM, Saturday mornings.
        </p>

        <div role="group" aria-label="Choose a day" className="mt-4 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-1.5">
          {days.map((d) => {
            const sel = d.iso === day;
            return (
              <button
                key={d.iso}
                type="button"
                onClick={() => pickDay(d.iso)}
                aria-pressed={sel}
                className={`rounded-xl py-2 text-center border transition ${
                  sel
                    ? "bg-[var(--brand-navy)] text-white border-[var(--brand-navy)]"
                    : "bg-white border-[var(--brand-rule)] hover:border-[var(--brand-primary)]"
                }`}
              >
                <div
                  className={`text-[9.5px] uppercase tracking-[0.14em] font-bold ${
                    sel ? "text-[var(--brand-accent)]" : "text-slate-500"
                  }`}
                >
                  {d.weekday}
                </div>
                <div className={`font-display text-[18px] font-bold leading-none ${sel ? "" : "text-[var(--brand-navy)]"}`}>
                  {d.dayNum}
                </div>
                <div className={`text-[9.5px] mt-0.5 ${sel ? "text-white/70" : "text-slate-500"}`}>
                  {d.monthShort}
                </div>
              </button>
            );
          })}
        </div>

        {dayObj && (
          <div className="mt-6">
            <div className="news-eyebrow text-[var(--brand-accent)]">Step 2</div>
            <h3 className="font-display text-[20px] font-bold text-[var(--brand-navy)]">
              Pick a time
            </h3>
            <div
              role="group"
              aria-label="Choose a time"
              aria-describedby={timeError ? "tour-time-error" : undefined}
              className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-1.5"
            >
              {SLOT_HOURS.map((h) => {
                const open = dayObj.openSlots.includes(h);
                const sel = h === hour;
                return (
                  <button
                    key={h}
                    type="button"
                    disabled={!open}
                    onClick={() => { setHour(h); setTimeError(false); }}
                    aria-pressed={sel}
                    className={`rounded-lg py-2.5 text-[12.5px] font-bold border transition ${
                      sel
                        ? "bg-[var(--brand-accent)] text-white border-[var(--brand-accent)]"
                        : open
                        ? "bg-white border-[var(--brand-rule)] text-[var(--brand-navy)] hover:border-[var(--brand-accent)]"
                        : "bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    {fmtSlot(h)}
                  </button>
                );
              })}
            </div>
            {timeError ? (
              <p id="tour-time-error" role="alert" className="mt-2 text-[11px] font-bold text-[#d4574d]">
                Please pick a time to continue.
              </p>
            ) : hour === null ? (
              <p className="mt-2 text-[11px] text-slate-500">
                All times shown in Singapore Time.
              </p>
            ) : null}
          </div>
        )}
      </div>

      {/* Contact */}
      <aside className="lg:sticky lg:top-28 self-start">
        <div
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
              Step 3 · Your details
            </div>
            <h3 className="font-display text-[19px] font-bold mt-1 leading-tight">
              Last bit — and you&rsquo;re done
            </h3>
            <div className="mt-4 space-y-2.5">
              <DarkField label="Your name" value={name} onChange={setName} required />
              <DarkField label="Email" type="email" value={email} onChange={setEmail} required />
              <DarkField label="Phone / WhatsApp" value={phone} onChange={setPhone} />
              <DarkSelect
                label="Grade interested in"
                value={grade}
                onChange={setGrade}
                options={["", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"]}
              />
            </div>

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

            {dayObj && hour !== null && (
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-[12px]">
                <div className="text-white/60 text-[10.5px] uppercase tracking-[0.14em] font-bold">
                  You picked
                </div>
                <div className="mt-0.5 font-bold">
                  {dayObj.weekday}, {dayObj.monthShort} {dayObj.dayNum} · {fmtSlot(hour)}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={busy || !hour}
              className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-dark)] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13px] font-bold transition"
            >
              {busy ? "Booking…" : "Confirm tour"}
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
        </div>
      </aside>
    </form>
  );
}

