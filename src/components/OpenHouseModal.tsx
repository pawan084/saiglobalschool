"use client";

import { useEffect, useId, useState } from "react";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";
import { safeGet, safeSet } from "@/lib/storage";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useAppDispatch } from "@/store/hooks";
import { submitInquiry } from "@/store/slices/inquirySlice";
import { useToast } from "./Toast";

const STORAGE_KEY = "sssgs:openhouse-modal-v2";
const SUPPRESS_DAYS = 7;
const SUPPRESS_PATHS = ["/open-house", "/inquire-book-a-tour", "/apply"];

const GRADES = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4",
  "Grade 5", "Grade 6", "Grade 7", "Grade 8",
];

function shouldShow(): boolean {
  if (typeof window === "undefined") return false;
  if (SUPPRESS_PATHS.some((p) => window.location.pathname.startsWith(p))) return false;
  const raw = safeGet(STORAGE_KEY);
  if (!raw) return true;
  try {
    const { at } = JSON.parse(raw) as { at: string };
    return Date.now() - new Date(at).getTime() > SUPPRESS_DAYS * 864e5;
  } catch {
    return true;
  }
}

function suppress() {
  safeSet(STORAGE_KEY, JSON.stringify({ at: new Date().toISOString() }));
}

export default function OpenHouseModal() {
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const gradeId = useId();

  useEffect(() => {
    if (!shouldShow()) return;
    const t = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  const trapRef = useFocusTrap<HTMLDivElement>(visible);

  function dismiss() {
    suppress();
    setVisible(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const phone = data.get("phone") as string;
    const email = data.get("email") as string;
    const grade = data.get("grade") as string;
    setBusy(true);
    try {
      await dispatch(submitInquiry({
        name,
        email: email || "",
        phone: phone ? `+65 ${phone}` : undefined,
        grade_interest: grade || undefined,
        inquiry_type: "OPEN_HOUSE",
        source_url: "open-house-modal",
      })).unwrap();
      suppress();
      setSubmitted(true);
    } catch {
      toast.show("Couldn't send right now — please try again.", "error");
    } finally {
      setBusy(false);
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="oh-title"
      className="fixed inset-0 z-[78] grid place-items-center bg-black/50 backdrop-blur-sm p-3 sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        ref={trapRef}
        className="relative w-full max-w-[820px] rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row"
        style={{ maxHeight: "calc(100svh - 32px)" }}
      >
        {/* ── LEFT FLYER PANEL ── */}
        <div
          className="relative flex flex-col items-center justify-between px-7 py-8 sm:w-[340px] shrink-0 text-white overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #0b1d33 0%, #122445 55%, #1a3460 100%)",
          }}
        >
          {/* Decorative circles */}
          <span aria-hidden className="absolute -top-20 -left-20 w-56 h-56 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(closest-side,#f97316,transparent)" }} />
          <span aria-hidden className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(closest-side,#7c3aed,transparent)" }} />

          {/* Top */}
          <div className="relative w-full text-center">
            <div className="inline-flex items-center justify-center mb-5">
              <BrandLogo size={110} />
            </div>

            {/* OPEN HOUSE badge */}
            <div
              className="mx-auto w-fit px-5 py-1.5 rounded-sm mb-2 border-2 border-white/30"
              style={{ letterSpacing: "0.18em" }}
            >
              <span className="font-black text-[15px] uppercase tracking-widest text-white">
                Open House
              </span>
            </div>

            <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/60 mb-1">
              Sri Sathya Sai Global School
            </div>
            <div className="text-[10px] text-white/40 italic mb-4">
              The End of Education is Character
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 mb-4">
              <span className="flex-1 h-px bg-white/15" />
              <span className="text-white/30 text-[10px]">✦</span>
              <span className="flex-1 h-px bg-white/15" />
            </div>

            {/* Date & time */}
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="flex items-center gap-1.5 text-[13px]">
                <Icon name="calendar" size={13} className="text-[var(--brand-accent)] opacity-90" />
                <span className="font-bold">Saturday</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-1.5 text-[13px]">
                <Icon name="clock" size={13} className="text-[var(--brand-accent)] opacity-90" />
                <span className="font-bold">10:30 AM</span>
              </div>
            </div>

            <div className="text-[12px] text-white/65 leading-relaxed px-2">
              Affordable, value-rooted education with personal attention
            </div>

          </div>

          {/* Bottom address */}
          <div className="relative w-full mt-5 pt-4 border-t border-white/10 flex flex-col gap-1.5">
            <div className="flex items-start gap-2 text-[11px] text-white/50">
              <Icon name="map-pin" size={11} className="mt-0.5 shrink-0" />
              <span>9 Norris Road, Singapore 208252</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              <Icon name="phone" size={11} className="shrink-0" />
              <span>+65 9062 6074</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM PANEL ── */}
        <div className="flex-1 bg-white overflow-y-auto">
          {/* Banner */}
          <div
            className="px-6 py-3.5 text-center"
            style={{ background: "linear-gradient(90deg, #ea580c 0%, #f97316 50%, #fb923c 100%)" }}
          >
            <div className="text-white font-black text-[17px] tracking-wide uppercase drop-shadow-sm">
              🎓 Admissions Open 2026–2027
            </div>
            <div className="text-white/85 text-[11px] font-bold uppercase tracking-widest mt-0.5">
              Inquire now / Book a Tour
            </div>
          </div>

          <div className="px-6 py-6">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <span className="grid place-items-center h-14 w-14 rounded-full bg-green-100 text-green-600">
                  <Icon name="check" size={26} />
                </span>
                <div>
                  <p className="font-bold text-[var(--brand-navy)] text-[17px]">Thank you!</p>
                  <p className="text-slate-500 text-[13px] mt-1">We&rsquo;ll be in touch shortly with your visit details.</p>
                </div>
                <button onClick={dismiss} className="btn-primary mt-2">
                  Close
                  <Icon name="close" size={13} />
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 id="oh-title" className="font-display font-bold text-[20px] text-[var(--brand-navy)] mb-1 leading-tight">
                  Reserve your spot
                </h2>
                <p className="text-[12.5px] text-slate-500 mb-5">
                  Limited seats. Fill in your details and we&rsquo;ll confirm your visit.
                </p>

                <div className="space-y-3.5">
                  {/* Name */}
                  <div>
                    <label htmlFor={nameId} className="block text-[11px] font-bold uppercase tracking-[0.07em] text-slate-600 mb-1">
                      Name <span className="text-red-500" aria-hidden>*</span>
                    </label>
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      required
                      placeholder="Parent / guardian name"
                      className="form-input w-full"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor={phoneId} className="block text-[11px] font-bold uppercase tracking-[0.07em] text-slate-600 mb-1">
                      Phone No <span className="text-red-500" aria-hidden>*</span>
                    </label>
                    <div className="flex rounded-lg border border-[var(--brand-rule)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)] overflow-hidden bg-white">
                      <div className="flex items-center gap-1.5 px-3 border-r border-[var(--brand-rule)] bg-slate-50 shrink-0">
                        <span className="text-[15px]">🇸🇬</span>
                        <span className="text-[12px] font-bold text-slate-600">+65</span>
                      </div>
                      <input
                        id={phoneId}
                        name="phone"
                        type="tel"
                        required
                        placeholder="9000 0000"
                        className="flex-1 px-3 py-2.5 text-[14px] outline-none bg-white text-slate-800 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor={emailId} className="block text-[11px] font-bold uppercase tracking-[0.07em] text-slate-600 mb-1">
                      Email
                    </label>
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="form-input w-full"
                    />
                  </div>

                  {/* Grade */}
                  <div>
                    <label htmlFor={gradeId} className="block text-[11px] font-bold uppercase tracking-[0.07em] text-slate-600 mb-1">
                      Grade
                    </label>
                    <select id={gradeId} name="grade" className="form-input w-full">
                      <option value="">Select grade of interest…</option>
                      {GRADES.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="btn-primary mt-5 w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {busy ? "Sending…" : "Submit"}
                  {!busy && <Icon name="arrow-right" size={14} />}
                </button>

                <p className="mt-3 text-[11px] text-slate-400 text-center">
                  Your details stay private.{" "}
                  <button type="button" onClick={dismiss} className="underline hover:text-slate-600 transition">
                    Maybe later
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50 transition z-10"
        >
          <Icon name="close" size={13} />
        </button>
      </div>
    </div>
  );
}
