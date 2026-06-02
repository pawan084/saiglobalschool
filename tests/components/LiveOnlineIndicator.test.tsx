import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
