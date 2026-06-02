import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Icon from "@/components/Icon";

describe("Icon", () => {
  it("renders an SVG with the requested size", () => {
    const { container } = render(<Icon name="check" size={20} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("width")).toBe("20");
    expect(svg?.getAttribute("height")).toBe("20");
  });

  it("applies a custom className", () => {
    const { container } = render(<Icon name="arrow-right" className="text-rose-500" />);
    expect(container.querySelector("svg")?.className.baseVal).toContain("text-rose-500");
  });

  it("renders many icon variants without crashing", () => {
    const names = [
      "arrow-right", "arrow-left", "arrow-up-right", "check", "plus", "minus",
      "close", "phone", "whatsapp", "mail", "map-pin", "calendar", "clock",
      "shield", "sparkle", "users", "book-open", "graduation", "flask",
      "calculator", "monitor", "heart", "ribbon", "microphone",
    ] as const;
    for (const n of names) {
      const { container } = render(<Icon name={n} />);
      expect(container.querySelector("svg")).toBeTruthy();
    }
  });
});
