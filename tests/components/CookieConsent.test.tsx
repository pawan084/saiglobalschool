import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CookieConsent from "@/components/CookieConsent";

describe("CookieConsent", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("does not appear immediately", () => {
    render(<CookieConsent />);
    expect(screen.queryByText(/we value your privacy/i)).not.toBeInTheDocument();
  });

  it("appears after a delay if no consent stored", () => {
    render(<CookieConsent />);
    act(() => { vi.advanceTimersByTime(1200); });
    expect(screen.getByText(/we value your privacy/i)).toBeInTheDocument();
  });

  it("stays hidden if consent is already stored", () => {
    localStorage.setItem("sssgs:cookie-consent", "accepted");
    render(<CookieConsent />);
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.queryByText(/we value your privacy/i)).not.toBeInTheDocument();
  });

  it("Accept all dismisses + writes accepted", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(<CookieConsent />);
    await new Promise((r) => setTimeout(r, 1300));
    await user.click(screen.getByText(/accept all/i));
    expect(localStorage.getItem("sssgs:cookie-consent")).toBe("accepted");
    expect(screen.queryByText(/we value your privacy/i)).not.toBeInTheDocument();
  });

  it("Essential only writes rejected", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(<CookieConsent />);
    await new Promise((r) => setTimeout(r, 1300));
    await user.click(screen.getByText(/essential only/i));
    expect(localStorage.getItem("sssgs:cookie-consent")).toBe("rejected");
  });
});
