import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render } from "@testing-library/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

function Probe({ onValue }: { onValue: (v: boolean) => void }) {
  const v = useReducedMotion();
  onValue(v);
  return null;
}

/** Build a settable mock MediaQueryList with controllable .matches and a
 *  listener registry so we can simulate change events. */
function buildMatchMedia(initial: boolean) {
  const listeners = new Set<(e: { matches: boolean }) => void>();
  const mq = {
    matches: initial,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: vi.fn((_: string, cb: (e: { matches: boolean }) => void) => listeners.add(cb)),
    removeEventListener: vi.fn((_: string, cb: (e: { matches: boolean }) => void) => listeners.delete(cb)),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  };
  return {
    mq,
    fire(matches: boolean) {
      mq.matches = matches;
      listeners.forEach((l) => l({ matches }));
    },
  };
}

describe("useReducedMotion", () => {
  let originalMM: typeof window.matchMedia;
  beforeEach(() => {
    originalMM = window.matchMedia;
  });
  afterEach(() => {
    window.matchMedia = originalMM;
  });

  it("returns false when matchMedia does not match reduce", () => {
    let v: boolean | undefined;
    const { mq } = buildMatchMedia(false);
    window.matchMedia = vi.fn().mockReturnValue(mq);
    render(<Probe onValue={(x) => (v = x)} />);
    expect(v).toBe(false);
  });

  it("returns true when matchMedia matches reduce", () => {
    let v: boolean | undefined;
    const { mq } = buildMatchMedia(true);
    window.matchMedia = vi.fn().mockReturnValue(mq);
    render(<Probe onValue={(x) => (v = x)} />);
    expect(v).toBe(true);
  });

  it("updates when the media query changes", () => {
    const captured: boolean[] = [];
    const { mq, fire } = buildMatchMedia(false);
    window.matchMedia = vi.fn().mockReturnValue(mq);
    render(<Probe onValue={(x) => captured.push(x)} />);
    act(() => fire(true));
    expect(captured[captured.length - 1]).toBe(true);
    act(() => fire(false));
    expect(captured[captured.length - 1]).toBe(false);
  });

  it("falls back to false when window.matchMedia is missing", () => {
    let v: boolean | undefined;
    // @ts-expect-error simulating older environment
    delete window.matchMedia;
    render(<Probe onValue={(x) => (v = x)} />);
    expect(v).toBe(false);
  });
});
