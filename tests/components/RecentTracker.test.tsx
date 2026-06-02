import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import RecentTracker from "@/components/RecentTracker";

const useMockPath = vi.fn(() => "/");
vi.mock("next/navigation", async () => {
  const real = await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return { ...real, usePathname: () => useMockPath() };
});

describe("RecentTracker", () => {
  it("does not record the root path", () => {
    useMockPath.mockReturnValue("/");
    render(<RecentTracker />);
    expect(localStorage.getItem("sssgs:recent-paths")).toBeNull();
  });

  it("records a known route", () => {
    useMockPath.mockReturnValue("/curriculum");
    render(<RecentTracker />);
    const arr = JSON.parse(localStorage.getItem("sssgs:recent-paths") || "[]");
    expect(arr).toContain("/curriculum");
  });

  it("does not record unknown routes", () => {
    useMockPath.mockReturnValue("/garbage");
    render(<RecentTracker />);
    expect(localStorage.getItem("sssgs:recent-paths")).toBeNull();
  });

  it("does not record API paths", () => {
    useMockPath.mockReturnValue("/api/whatever");
    render(<RecentTracker />);
    expect(localStorage.getItem("sssgs:recent-paths")).toBeNull();
  });
});
