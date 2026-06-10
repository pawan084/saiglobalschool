"use client";

import { useEffect, useState } from "react";

/**
 * Shows "We're online now" during Singapore office hours.
 * Off-hours shows the next opening time so visitors know when to expect a reply.
 *
 * Office hours: Mon–Fri 9:00–17:00 SGT, Sat 9:00–13:00 SGT, Sun closed.
 */

function inSgtWindow(): { online: boolean; nextOpen?: string } {
  // Convert "now" to Singapore time using a fixed locale formatter.
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Singapore",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const wk = parts.find((p) => p.type === "weekday")?.value || "Mon";
  const hh = Number(parts.find((p) => p.type === "hour")?.value || "0");
  const mm = Number(parts.find((p) => p.type === "minute")?.value || "0");
  const minutes = hh * 60 + mm;

  const weekdayMap: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 0,
  };
  const day = weekdayMap[wk] ?? 1;

  function inRange(d: number, startMin: number, endMin: number) {
    return day === d && minutes >= startMin && minutes < endMin;
  }

  const online =
    inRange(1, 9 * 60, 17 * 60) ||
    inRange(2, 9 * 60, 17 * 60) ||
    inRange(3, 9 * 60, 17 * 60) ||
    inRange(4, 9 * 60, 17 * 60) ||
    inRange(5, 9 * 60, 17 * 60) ||
    inRange(6, 9 * 60, 13 * 60);

  if (online) return { online: true };

  // Compute next opening (very rough — fine for UX hint, not for billing).
  if (day === 0) return { online: false, nextOpen: "tomorrow 9:00 SGT" };
  if (day === 6 && minutes >= 13 * 60) return { online: false, nextOpen: "Monday 9:00 SGT" };
  if (day >= 1 && day <= 5 && minutes < 9 * 60) return { online: false, nextOpen: "today 9:00 SGT" };
  if (day >= 1 && day <= 5 && minutes >= 17 * 60) {
    return { online: false, nextOpen: day === 5 ? "Saturday 9:00 SGT" : "tomorrow 9:00 SGT" };
  }
  if (day === 6 && minutes < 9 * 60) return { online: false, nextOpen: "today 9:00 SGT" };
  return { online: false, nextOpen: "next business day" };
}

export default function LiveOnlineIndicator({ className = "" }: { className?: string }) {
  // SSR renders the stable offline fallback so server/client HTML match. The
  // real time-based state is read from inSgtWindow() in a callback (interval
  // tick) — no setState in effect body for the initial read.
  const [state, setState] = useState<{ online: boolean; nextOpen?: string }>({ online: false });

  useEffect(() => {
    // Intentional one-shot setState in effect: the initial value depends on
    // current time, which would mismatch between SSR and CSR if computed
    // during render. The interval tick keeps it fresh thereafter.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(inSgtWindow());
    const id = setInterval(() => setState(inSgtWindow()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] font-bold ${
        state.online
          ? "border-[var(--brand-primary)]/30 bg-[var(--brand-primary-tint)] text-[var(--brand-primary-dark)]"
          : "border-[var(--brand-rule)] bg-white text-slate-600"
      } ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {state.online && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--brand-primary)] opacity-70 animate-ping" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            state.online ? "bg-[var(--brand-primary)]" : "bg-slate-400"
          }`}
        />
      </span>
      {state.online ? "Team online now" : `Back ${state.nextOpen}`}
    </span>
  );
}
