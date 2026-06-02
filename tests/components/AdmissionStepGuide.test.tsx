import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AdmissionStepGuide from "@/components/AdmissionStepGuide";

describe("AdmissionStepGuide", () => {
  it("renders all six steps", () => {
    render(<AdmissionStepGuide />);
    expect(screen.getAllByText(/step \d+/i).length).toBeGreaterThanOrEqual(6);
  });

  it("step headings are clickable anchors", () => {
    const { container } = render(<AdmissionStepGuide />);
    const anchors = container.querySelectorAll("a[href^='#step-']");
    expect(anchors.length).toBeGreaterThan(0);
  });
});
