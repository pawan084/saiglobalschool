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
});
