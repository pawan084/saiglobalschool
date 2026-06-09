import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";

// user-event's click() also dispatches pointerenter/mouseenter to simulate
// a realistic pointer journey, which triggers the menu's hover-open then
// the click toggles it back closed (correct UX, awkward to assert).
// fireEvent.click skips the pointer choreography so the click handler is
// tested in isolation — a closer model of touch-tap behavior.
function tap(el: Element) {
  fireEvent.click(el);
}

/**
 * Covers the WAI-ARIA Disclosure pattern on the desktop nav.
 * The chevron button next to each parent link is the disclosure trigger.
 * The parent link itself still navigates on click. Tests focus on the
 * keyboard contract — hover (mouse) is hard to assert in jsdom.
 */
function setup() {
  return render(<Header />);
}

function aboutChevron() {
  return screen.getByRole("button", { name: /About submenu/i });
}

describe("Header desktop disclosure dropdown", () => {
  it("exposes aria-haspopup/aria-expanded on each parent with children", () => {
    setup();
    const triggers = screen.getAllByRole("button", { name: /submenu$/i });
    // 5 of 7 nav items have children (Home + Contact don't).
    expect(triggers.length).toBe(5);
    for (const t of triggers) {
      expect(t).toHaveAttribute("aria-haspopup", "true");
      expect(t).toHaveAttribute("aria-expanded", "false");
      expect(t).toHaveAttribute("aria-controls");
    }
  });

  it("opens submenu on click and exposes child links", async () => {
    setup();
    const btn = aboutChevron();
    tap(btn);
    await waitFor(() => expect(btn).toHaveAttribute("aria-expanded", "true"));
    expect(await screen.findByRole("link", { name: /vision & mission/i })).toBeInTheDocument();
  });

  it("Enter on the chevron opens AND focuses the first child", async () => {
    const user = userEvent.setup();
    setup();
    const btn = aboutChevron();
    btn.focus();
    await user.keyboard("{Enter}");
    const firstChild = await screen.findByRole("link", { name: /^about us$/i });
    await waitFor(() => expect(document.activeElement).toBe(firstChild));
  });

  it("ArrowUp on the chevron opens AND focuses the last child", async () => {
    const user = userEvent.setup();
    setup();
    const btn = aboutChevron();
    btn.focus();
    await user.keyboard("{ArrowUp}");
    const lastChild = await screen.findByRole("link", { name: /^parent community$/i });
    await waitFor(() => expect(document.activeElement).toBe(lastChild));
  });

  it("ArrowDown inside the panel cycles through children", async () => {
    const user = userEvent.setup();
    setup();
    const btn = aboutChevron();
    btn.focus();
    await user.keyboard("{Enter}");
    // Wait for first child to gain focus
    const first = await screen.findByRole("link", { name: /^about us$/i });
    await waitFor(() => expect(document.activeElement).toBe(first));
    await user.keyboard("{ArrowDown}");
    const second = screen.getByRole("link", { name: /vision & mission/i });
    await waitFor(() => expect(document.activeElement).toBe(second));
  });

  it("Escape closes the submenu and restores focus to the chevron", async () => {
    const user = userEvent.setup();
    setup();
    const btn = aboutChevron();
    tap(btn);
    await waitFor(() => expect(btn).toHaveAttribute("aria-expanded", "true"));
    await user.keyboard("{Escape}");
    await waitFor(() => expect(btn).toHaveAttribute("aria-expanded", "false"));
    expect(document.activeElement).toBe(btn);
  });

  it("mobile toggle exposes aria-expanded + aria-controls", async () => {
    const user = userEvent.setup();
    setup();
    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-nav");
    await user.click(toggle);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute(
        "aria-expanded",
        "true"
      );
    });
  });

  it("clicking outside the dropdown closes it (was: chevron-toggle)", async () => {
    // The chevron's onClick used to toggle. That meant when the menu was
    // already open via hover, clicking the chevron flipped it closed — which
    // surfaced as "I clicked the chevron and nothing opens." Now the chevron
    // is open-only; close is by clicking outside, Esc, or tab-out.
    setup();
    const btn = aboutChevron();
    tap(btn);
    await waitFor(() => expect(btn).toHaveAttribute("aria-expanded", "true"));
    // Clicking outside the container closes via the document pointerdown listener.
    fireEvent.pointerDown(document.body);
    await waitFor(() => expect(btn).toHaveAttribute("aria-expanded", "false"));
  });

  it("nav landmarks have aria-label", () => {
    setup();
    expect(screen.getByRole("navigation", { name: /^primary$/i })).toBeInTheDocument();
    // Mobile nav only mounts when open; assert primary desktop nav for now.
  });

  it("submenu links exist for every parent with children", async () => {
    setup();
    const triggers = screen.getAllByRole("button", { name: /submenu$/i });
    for (const t of triggers) {
      tap(t);
      await waitFor(() => expect(t).toHaveAttribute("aria-expanded", "true"));
      const controlledId = t.getAttribute("aria-controls")!;
      const panel = document.getElementById(controlledId);
      expect(panel).not.toBeNull();
      expect(within(panel!).getAllByRole("link").length).toBeGreaterThan(0);
      // Close before the next iteration via outside pointerdown (chevron click
      // no longer toggles closed — it's open-only by design).
      fireEvent.pointerDown(document.body);
      await waitFor(() => expect(t).toHaveAttribute("aria-expanded", "false"));
    }
  });
});
