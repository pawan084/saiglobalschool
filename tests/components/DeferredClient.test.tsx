import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import DeferredClient from "@/components/DeferredClient";

/**
 * DeferredClient defers rendering its children until idle OR interaction OR
 * a custom wake event. Tests use the setTimeout fallback path (jsdom doesn't
 * implement requestIdleCallback).
 */

const originalRic = (window as unknown as { requestIdleCallback?: unknown }).requestIdleCallback;

beforeEach(() => {
  // Force the setTimeout fallback for deterministic timing
  delete (window as unknown as { requestIdleCallback?: unknown }).requestIdleCallback;
});

afterEach(() => {
  if (originalRic) {
    (window as unknown as { requestIdleCallback?: unknown }).requestIdleCallback = originalRic;
  }
});

describe("DeferredClient", () => {
  it("renders nothing initially", () => {
    render(
      <DeferredClient>
        <span>deferred content</span>
      </DeferredClient>
    );
    expect(screen.queryByText("deferred content")).toBeNull();
  });

  it("renders children after the idle timeout", async () => {
    vi.useFakeTimers();
    try {
      render(
        <DeferredClient idleTimeoutMs={500}>
          <span>deferred content</span>
        </DeferredClient>
      );
      expect(screen.queryByText("deferred content")).toBeNull();
      act(() => {
        vi.advanceTimersByTime(600);
      });
      expect(screen.getByText("deferred content")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("renders children on pointerdown (user interaction)", async () => {
    render(
      <DeferredClient idleTimeoutMs={60_000}>
        <span>deferred content</span>
      </DeferredClient>
    );
    expect(screen.queryByText("deferred content")).toBeNull();
    fireEvent.pointerDown(window);
    await waitFor(() => expect(screen.getByText("deferred content")).toBeInTheDocument());
  });

  it("renders children on keydown", async () => {
    render(
      <DeferredClient idleTimeoutMs={60_000}>
        <span>deferred content</span>
      </DeferredClient>
    );
    fireEvent.keyDown(window, { key: "Tab" });
    await waitFor(() => expect(screen.getByText("deferred content")).toBeInTheDocument());
  });

  it("renders children on a custom wake event", async () => {
    render(
      <DeferredClient idleTimeoutMs={60_000} wakeOn={["sssgs:open-search"]}>
        <span>deferred content</span>
      </DeferredClient>
    );
    expect(screen.queryByText("deferred content")).toBeNull();
    act(() => {
      window.dispatchEvent(new Event("sssgs:open-search"));
    });
    await waitFor(() => expect(screen.getByText("deferred content")).toBeInTheDocument());
  });
});
