import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import OpenHouseModal from "@/components/OpenHouseModal";

describe("OpenHouseModal", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("does not render immediately", () => {
    render(<OpenHouseModal />);
    expect(screen.queryByText(/see sssgs/i)).not.toBeInTheDocument();
  });

  it("appears after the delay", () => {
    render(<OpenHouseModal />);
    act(() => vi.advanceTimersByTime(15_000));
    expect(screen.getByText(/see sssgs/i)).toBeInTheDocument();
  });

  it("respects 7-day suppression after dismiss", () => {
    localStorage.setItem(
      "sssgs:openhouse-modal",
      JSON.stringify({ at: new Date().toISOString(), reason: "dismiss" })
    );
    render(<OpenHouseModal />);
    act(() => vi.advanceTimersByTime(15_000));
    expect(screen.queryByText(/see sssgs in motion/i)).not.toBeInTheDocument();
  });

  it("shows again after suppression expires", () => {
    const oldDate = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString();
    localStorage.setItem("sssgs:openhouse-modal", JSON.stringify({ at: oldDate, reason: "dismiss" }));
    render(<OpenHouseModal />);
    act(() => vi.advanceTimersByTime(15_000));
    expect(screen.getByText(/see sssgs/i)).toBeInTheDocument();
  });

  it("Maybe later dismisses and persists suppression", () => {
    render(<OpenHouseModal />);
    act(() => vi.advanceTimersByTime(15_000));
    const btn = screen.getByText(/maybe later/i);
    act(() => btn.click());
    expect(localStorage.getItem("sssgs:openhouse-modal")).toBeTruthy();
  });

  it("suppressed on /apply route", () => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...window.location, pathname: "/apply" },
    });
    render(<OpenHouseModal />);
    act(() => vi.advanceTimersByTime(15_000));
    expect(screen.queryByText(/see sssgs in motion/i)).not.toBeInTheDocument();
  });
});
