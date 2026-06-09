import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import ExitIntentCapture from "@/components/ExitIntentCapture";

describe("ExitIntentCapture", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("does not show without trigger", () => {
    render(<ExitIntentCapture />);
    expect(screen.queryByText(/don.t lose your spot/i)).not.toBeInTheDocument();
  });

  it("does not show if suppression flag is fresh", () => {
    localStorage.setItem("sssgs:exit-intent", new Date().toISOString());
    render(<ExitIntentCapture />);
    act(() => vi.advanceTimersByTime(120_000));
    expect(screen.queryByText(/don.t lose your spot/i)).not.toBeInTheDocument();
  });

  it("respects past-expiry suppression", () => {
    localStorage.setItem(
      "sssgs:exit-intent",
      new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    );
    render(<ExitIntentCapture />);
    act(() => vi.advanceTimersByTime(9_000));
    act(() => {
      const ev = new MouseEvent("mouseleave");
      Object.defineProperty(ev, "clientY", { value: 0 });
      Object.defineProperty(ev, "relatedTarget", { value: null });
      document.dispatchEvent(ev);
    });
    expect(screen.getByText(/don.t lose your spot/i)).toBeInTheDocument();
  });

  it("dismiss persists suppression", () => {
    render(<ExitIntentCapture />);
    act(() => vi.advanceTimersByTime(9_000));
    act(() => {
      const ev = new MouseEvent("mouseleave");
      Object.defineProperty(ev, "clientY", { value: 0 });
      Object.defineProperty(ev, "relatedTarget", { value: null });
      document.dispatchEvent(ev);
    });
    // The prior test proves the modal opens on synthetic mouseleave; assert it
    // hard here (getByText throws if absent) so a future regression can't slip
    // past as a silent skip.
    const btn = screen.getByText(/continue without saving/i);
    act(() => btn.click());
    expect(localStorage.getItem("sssgs:exit-intent")).toBeTruthy();
  });
});
