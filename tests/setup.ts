import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi, afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "";
  thresholds = [];
}
globalThis.IntersectionObserver = MockIntersectionObserver as never;

class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
globalThis.ResizeObserver = MockResizeObserver as never;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) =>
    React.createElement("a", { href, ...props }, children),
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt } = props as { src: string; alt?: string };
    const rest: Record<string, unknown> = { ...props };
    for (const k of ["fill", "sizes", "priority", "placeholder", "blurDataURL", "src", "alt"]) {
      delete rest[k];
    }
    return React.createElement("img", { src, alt: alt || "", ...rest });
  },
}));

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-sans" }),
  Fraunces: () => ({ variable: "--font-display" }),
}));

vi.mock("next/navigation", () => {
  const mockSearchParams = new URLSearchParams();
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: () => "/",
    useSearchParams: () => mockSearchParams,
    notFound: () => {
      throw new Error("NEXT_NOT_FOUND");
    },
    redirect: vi.fn(),
  };
});

beforeEach(() => {
  try { localStorage.clear(); } catch { /* ignore */ }
  try { sessionStorage.clear(); } catch { /* ignore */ }
  document.documentElement.removeAttribute("data-font-scale");
  document.documentElement.removeAttribute("data-contrast");
});
