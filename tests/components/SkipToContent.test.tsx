import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SkipToContent from "@/components/SkipToContent";

describe("SkipToContent", () => {
  it("renders an anchor to #main", () => {
    render(<SkipToContent />);
    const link = screen.getByText(/skip to main content/i);
    expect(link.getAttribute("href")).toBe("#main");
  });
});
