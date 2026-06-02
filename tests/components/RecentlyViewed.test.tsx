import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RecentlyViewed from "@/components/RecentlyViewed";

describe("RecentlyViewed", () => {
  it("renders nothing when no history", () => {
    const { container } = render(<RecentlyViewed />);
    expect(container.firstChild).toBeNull();
  });

  it("renders items present in the search index", async () => {
    localStorage.setItem(
      "sssgs:recent-paths",
      JSON.stringify(["/about-us", "/curriculum", "/fee-structure"])
    );
    render(<RecentlyViewed />);
    expect(await screen.findByText(/recently viewed/i)).toBeInTheDocument();
    expect(screen.getByText(/curriculum/i)).toBeInTheDocument();
  });

  it("silently ignores stale paths not in the index", () => {
    localStorage.setItem(
      "sssgs:recent-paths",
      JSON.stringify(["/this/does/not/exist"])
    );
    const { container } = render(<RecentlyViewed />);
    expect(container.firstChild).toBeNull();
  });
});
