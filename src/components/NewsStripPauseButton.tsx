"use client";

import { useState } from "react";

/** Pause/play toggle for the marquee. Required by WCAG 2.2.2: any moving
 *  content that lasts more than 5 seconds must offer a mechanism to pause,
 *  stop, or hide. The button toggles a data attribute consumed by CSS in
 *  globals.css (`[data-newsstrip-paused="true"] .newsstrip-track {
 *  animation-play-state: paused; }`). */
export default function NewsStripPauseButton() {
  const [paused, setPaused] = useState(false);
  function toggle() {
    const next = !paused;
    setPaused(next);
    document.body.dataset.newsstripPaused = next ? "true" : "false";
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={paused ? "Resume scrolling announcements" : "Pause scrolling announcements"}
      aria-pressed={paused}
      className="shrink-0 grid place-items-center h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 text-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {paused ? (
          <path d="M6 4l14 8L6 20z" />
        ) : (
          <>
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </>
        )}
      </svg>
    </button>
  );
}
