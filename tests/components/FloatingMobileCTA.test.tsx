import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import FloatingMobileCTA from "@/components/FloatingMobileCTA";

describe("FloatingMobileCTA", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders the call + WhatsApp + inquire CTAs", () => {
    render(<FloatingMobileCTA />);
    expect(screen.getByLabelText(/call/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/whatsapp/i)).toBeInTheDocument();
  });

  it("hides on scroll-down past 200px and shows again on scroll-up", () => {
    const { container } = render(<FloatingMobileCTA />);
    const bar = container.firstChild as HTMLElement;
    expect(bar.className).toContain("translate-y-[120%]");

    Object.defineProperty(window, "scrollY", { configurable: true, value: 250 });
    act(() => window.dispatchEvent(new Event("scroll")));
    Object.defineProperty(window, "scrollY", { configurable: true, value: 300 });
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(bar.className).toContain("translate-y-[120%]");

    Object.defineProperty(window, "scrollY", { configurable: true, value: 180 });
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(bar.className).toContain("translate-y-0");
  });
});
