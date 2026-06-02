import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LegalPage from "@/components/LegalPage";

describe("LegalPage", () => {
  const props = {
    eyebrow: "Legal",
    title: "Test policy",
    lead: "What we cover",
    updated: "1 Jun 2026",
    breadcrumb: [{ label: "Privacy", href: "/privacy" }],
    sections: [
      {
        id: "intro",
        heading: "Introduction",
        body: <p>Intro body</p>,
      },
      {
        id: "data",
        heading: "Data we collect",
        body: <p>Data body</p>,
      },
    ],
  };

  it("renders title + headings + sections", () => {
    render(<LegalPage {...props} />);
    expect(screen.getByText(/test policy/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /introduction/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /data we collect/i })).toBeInTheDocument();
  });

  it("renders TOC anchors for each section", () => {
    const { container } = render(<LegalPage {...props} />);
    expect(container.querySelector("a[href='#intro']")).toBeInTheDocument();
    expect(container.querySelector("a[href='#data']")).toBeInTheDocument();
  });

  it("shows last-updated date", () => {
    render(<LegalPage {...props} />);
    expect(screen.getAllByText(/1 jun 2026/i).length).toBeGreaterThan(0);
  });
});
