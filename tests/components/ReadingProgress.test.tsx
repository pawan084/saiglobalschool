import { describe, it, expect, vi } from "vitest";
import { render, act } from "@testing-library/react";
import ReadingProgress from "@/components/ReadingProgress";

describe("ReadingProgress", () => {
  it("renders nothing on short pages", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 600 });
    Object.defineProperty(document.documentElement, "clientHeight", { configurable: true, value: 800 });
    const { container } = render(<ReadingProgress />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a progress bar when document is long", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 5000 });
    Object.defineProperty(document.documentElement, "clientHeight", { configurable: true, value: 800 });
    Object.defineProperty(document.documentElement, "scrollTop", { configurable: true, writable: true, value: 1000 });
    const { container } = render(<ReadingProgress />);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(container.querySelector("[role='presentation']")).toBeInTheDocument();
  });
});
