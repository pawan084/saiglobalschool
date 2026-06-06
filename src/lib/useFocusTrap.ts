"use client";

import { useEffect, useRef } from "react";

/**
 * Trap focus inside a container while it is mounted/active.
 *
 * - Auto-focuses the first focusable element (or the container itself).
 * - Tab / Shift+Tab cycle within the container.
 * - Returns focus to the previously focused element when deactivated.
 *
 * Usage:
 *   const ref = useFocusTrap<HTMLDivElement>(open);
 *   return open ? <div ref={ref} role="dialog">…</div> : null;
 */
const FOCUSABLE_SELECTOR = [
  "a[href]:not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "input:not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "[contenteditable='true']:not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const containerRef = useRef<T | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    // Remember where focus was so we can restore it
    lastActiveRef.current = (document.activeElement as HTMLElement | null) ?? null;

    function getFocusable(): HTMLElement[] {
      if (!container) return [];
      return Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => {
        if (el.hidden) return false;
        if (el.getAttribute("aria-hidden") === "true") return false;
        if ("disabled" in el && (el as HTMLButtonElement).disabled) return false;
        return true;
      });
    }

    // Initial focus
    let rafId = 0;
    const focusables = getFocusable();
    if (focusables.length > 0) {
      // Use rAF so the dialog has time to paint (avoids jumping past invisible-during-mount elements)
      rafId = requestAnimationFrame(() => focusables[0]?.focus());
    } else {
      container.setAttribute("tabindex", "-1");
      container.focus();
    }

    function onKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const list = getFocusable();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !container?.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !container?.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      // Cancel the pending initial-focus rAF so it can't steal focus into an
      // element that is being unmounted if the trap closes within the same frame.
      cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", onKey);
      lastActiveRef.current?.focus?.();
    };
  }, [active]);

  return containerRef;
}
