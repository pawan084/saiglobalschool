import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import LiveOnlineIndicator from "@/components/LiveOnlineIndicator";

describe("LiveOnlineIndicator", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders online during weekday office hours (SGT 10am Tue)", () => {
    // Tuesday 2026-06-02 02:00Z = 10:00 SGT
    vi.setSystemTime(new Date("2026-06-02T02:00:00Z"));
    render(<LiveOnlineIndicator />);
    expect(screen.getByText(/team online now/i)).toBeInTheDocument();
  });

  it("renders offline late-night", () => {
    // Tuesday 2026-06-02 22:00Z = Wed 06:00 SGT
    vi.setSystemTime(new Date("2026-06-02T22:00:00Z"));
    render(<LiveOnlineIndicator />);
    expect(screen.getByText(/back/i)).toBeInTheDocument();
  });

  it("accepts a custom className", () => {
    vi.setSystemTime(new Date("2026-06-02T02:00:00Z"));
    const { container } = render(<LiveOnlineIndicator className="custom-class" />);
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });

  it("Saturday morning is online", () => {
    // Saturday 2026-06-06 02:00Z = 10:00 SGT
    vi.setSystemTime(new Date("2026-06-06T02:00:00Z"));
    render(<LiveOnlineIndicator />);
    expect(screen.getByText(/team online now/i)).toBeInTheDocument();
  });

  it("Saturday afternoon shows 'back Monday'", () => {
    // Saturday 2026-06-06 06:00Z = 14:00 SGT (after Sat 13:00 close)
    vi.setSystemTime(new Date("2026-06-06T06:00:00Z"));
    render(<LiveOnlineIndicator />);
    expect(screen.getByText(/back monday/i)).toBeInTheDocument();
  });

  it("Sunday shows 'back tomorrow'", () => {
    // Sunday 2026-06-07 02:00Z = 10:00 SGT
    vi.setSystemTime(new Date("2026-06-07T02:00:00Z"));
    render(<LiveOnlineIndicator />);
    expect(screen.getByText(/back tomorrow/i)).toBeInTheDocument();
  });

  it("Weekday morning before 9 SGT shows 'back today'", () => {
    // Tuesday 2026-06-02 00:00Z = 08:00 SGT
    vi.setSystemTime(new Date("2026-06-02T00:00:00Z"));
    render(<LiveOnlineIndicator />);
    expect(screen.getByText(/back today/i)).toBeInTheDocument();
  });

  it("Friday evening shows 'back Saturday'", () => {
    // Friday 2026-06-05 12:00Z = 20:00 SGT (after Fri 18:00 close)
    vi.setSystemTime(new Date("2026-06-05T12:00:00Z"));
    render(<LiveOnlineIndicator />);
    expect(screen.getByText(/back saturday/i)).toBeInTheDocument();
  });

  it("re-evaluates state on a minute interval", () => {
    vi.setSystemTime(new Date("2026-06-02T00:00:00Z")); // 08:00 SGT — offline
    render(<LiveOnlineIndicator />);
    expect(screen.getByText(/back today/i)).toBeInTheDocument();
    // Advance to 10:00 SGT — should flip online
    vi.setSystemTime(new Date("2026-06-02T02:00:00Z"));
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.getByText(/team online now/i)).toBeInTheDocument();
  });
});
