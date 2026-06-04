import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PwaInstall from "@/components/PwaInstall";

describe("PwaInstall", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("does not render unless prompted", () => {
    render(<PwaInstall />);
    expect(screen.queryByText(/install sssgs/i)).not.toBeInTheDocument();
  });

  it("renders an install button once beforeinstallprompt fires", () => {
    render(<PwaInstall />);
    const fakeEvent = Object.assign(new Event("beforeinstallprompt"), {
      prompt: vi.fn().mockResolvedValue(undefined),
      userChoice: Promise.resolve({ outcome: "accepted" as const }),
    });
    act(() => {
      window.dispatchEvent(fakeEvent);
    });
    expect(screen.getByText(/install sssgs/i)).toBeInTheDocument();
  });

  it("Dismiss persists suppression", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(<PwaInstall />);
    const fakeEvent = Object.assign(new Event("beforeinstallprompt"), {
      prompt: vi.fn().mockResolvedValue(undefined),
      userChoice: Promise.resolve({ outcome: "dismissed" as const }),
    });
    window.dispatchEvent(fakeEvent);
    await new Promise((r) => setTimeout(r, 50));
    const dismissBtn = screen.getByLabelText(/dismiss/i);
    await user.click(dismissBtn);
    expect(localStorage.getItem("sssgs:pwa-install-dismissed")).toBeTruthy();
  });

  it("returns null if already standalone", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: true, media: "(display-mode: standalone)",
        addEventListener: vi.fn(), removeEventListener: vi.fn(),
        addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(), onchange: null,
      }),
    });
    render(<PwaInstall />);
    expect(screen.queryByText(/install sssgs/i)).not.toBeInTheDocument();
  });

  it("Install button calls prompt() + persists dismissal", async () => {
    vi.useRealTimers();
    localStorage.clear();
    // Reset matchMedia from previous test
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: false, media: "",
        addEventListener: vi.fn(), removeEventListener: vi.fn(),
        addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(), onchange: null,
      }),
    });
    const user = userEvent.setup();
    render(<PwaInstall />);
    const promptSpy = vi.fn().mockResolvedValue(undefined);
    const fakeEvent = Object.assign(new Event("beforeinstallprompt"), {
      prompt: promptSpy,
      userChoice: Promise.resolve({ outcome: "accepted" as const }),
    });
    act(() => {
      window.dispatchEvent(fakeEvent);
    });
    await user.click(screen.getByRole("button", { name: /^install$/i }));
    expect(promptSpy).toHaveBeenCalled();
    // After accept, the dialog hides + dismissal is recorded
    await new Promise((r) => setTimeout(r, 20));
    expect(localStorage.getItem("sssgs:pwa-install-dismissed")).toBeTruthy();
  });

  it("shows iOS Add-to-Home-Screen hint after the delay on iPhone", async () => {
    localStorage.clear();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: false, media: "",
        addEventListener: vi.fn(), removeEventListener: vi.fn(),
        addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(), onchange: null,
      }),
    });
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    });
    render(<PwaInstall />);
    act(() => {
      vi.advanceTimersByTime(25_000);
    });
    expect(screen.getByText(/install sssgs/i)).toBeInTheDocument();
    expect(screen.getByText(/add to home screen/i)).toBeInTheDocument();
  });

  it("does not render if the user previously dismissed", () => {
    localStorage.setItem("sssgs:pwa-install-dismissed", new Date().toISOString());
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: false, media: "",
        addEventListener: vi.fn(), removeEventListener: vi.fn(),
        addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(), onchange: null,
      }),
    });
    render(<PwaInstall />);
    const fakeEvent = Object.assign(new Event("beforeinstallprompt"), {
      prompt: vi.fn().mockResolvedValue(undefined),
      userChoice: Promise.resolve({ outcome: "accepted" as const }),
    });
    act(() => {
      window.dispatchEvent(fakeEvent);
    });
    expect(screen.queryByText(/install sssgs/i)).not.toBeInTheDocument();
  });
});
