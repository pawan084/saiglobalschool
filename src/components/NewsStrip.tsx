import Link from "next/link";
import { announcements } from "@/data/announcements";
import Icon from "./Icon";
import NewsStripPauseButton from "./NewsStripPauseButton";

export default function NewsStrip() {
  return (
    <div className="relative bg-[var(--brand-navy)] text-white/90 text-[12px] overflow-hidden print:hidden">
      {/* Subtle texture */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="section-shell flex items-center gap-4 py-2 relative">
        {/* Live badge */}
        <span
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-white text-[10px] font-bold uppercase tracking-[0.14em] shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-accent) 0%, var(--brand-accent-dark) 100%)",
            boxShadow: "0 4px 10px -3px rgba(234,88,12,0.5)",
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-70 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Live
        </span>

        {/* Marquee — pauses on hover, when a child link is focused, and via
            an explicit pause control (WCAG 2.2.2). motion-reduce zeroes the
            animation entirely. */}
        <div className="overflow-hidden flex-1 relative">
          <div className="newsstrip-track flex gap-10 whitespace-nowrap animate-[scroll_60s_linear_infinite] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
            {announcements.map((a, i) => (
              <Link
                key={`a-${i}`}
                href={a.href}
                className="inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors"
              >
                <span className="text-[var(--brand-accent)]">
                  <Icon name="sparkle" size={11} />
                </span>
                <span className="tracking-wide">{a.text}</span>
              </Link>
            ))}
            {/* Visual duplicate so the marquee can loop seamlessly.
                Hidden from AT and removed from the tab order. */}
            <div aria-hidden="true" className="inline-flex gap-10" inert>
              {announcements.map((a, i) => (
                <Link
                  key={`b-${i}`}
                  href={a.href}
                  tabIndex={-1}
                  className="inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors"
                >
                  <span className="text-[var(--brand-accent)]">
                    <Icon name="sparkle" size={11} />
                  </span>
                  <span className="tracking-wide">{a.text}</span>
                </Link>
              ))}
            </div>
          </div>
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[var(--brand-navy)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--brand-navy)] to-transparent" />
        </div>
        <NewsStripPauseButton />
      </div>
    </div>
  );
}
