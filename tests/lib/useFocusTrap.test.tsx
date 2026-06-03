import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { useFocusTrap } from "@/lib/useFocusTrap";

function Modal({ open, label = "Modal" }: { open: boolean; label?: string }) {
  const ref = useFocusTrap<HTMLDivElement>(open);
  if (!open) return <div data-testid="closed" />;
  return (
    <div ref={ref} role="dialog" aria-label={label}>
      <button data-testid="first">First</button>
      <button data-testid="second">Second</button>
      <button data-testid="last">Last</button>
    </div>
  );
}

describe("useFocusTrap", () => {
  it("focuses the first focusable element on open", async () => {
    render(<Modal open />);
    // useFocusTrap focuses inside a rAF; flush
    await new Promise((r) => requestAnimationFrame(() => r(undefined)));
    expect(document.activeElement?.getAttribute("data-testid")).toBe("first");
  });

  it("Tab cycles forward and Shift+Tab cycles backward within the trap", async () => {
    const user = userEvent.setup();
    render(<Modal open />);
    await new Promise((r) => requestAnimationFrame(() => r(undefined)));
    // first focused; press Tab — should land on second
    await user.tab();
    expect(document.activeElement?.getAttribute("data-testid")).toBe("second");
    await user.tab();
    expect(document.activeElement?.getAttribute("data-testid")).toBe("last");
    // from last, Tab wraps to first
    await user.tab();
    expect(document.activeElement?.getAttribute("data-testid")).toBe("first");
    // Shift+Tab from first wraps to last
    await user.tab({ shift: true });
    expect(document.activeElement?.getAttribute("data-testid")).toBe("last");
  });

  it("restores focus to the previously-focused element after close", async () => {
    function Outer() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button data-testid="opener" onClick={() => setOpen(true)}>
            Open
          </button>
          <button onClick={() => setOpen(false)} data-testid="close-toggle">
            Close
          </button>
          <Modal open={open} />
        </>
      );
    }
    const user = userEvent.setup();
    const { getByTestId } = render(<Outer />);
    const opener = getByTestId("opener");
    opener.focus();
    expect(document.activeElement).toBe(opener);
    await user.click(opener);
    await new Promise((r) => requestAnimationFrame(() => r(undefined)));
    expect(document.activeElement?.getAttribute("data-testid")).toBe("first");
    // close via the second button (outside the trap)
    await user.click(getByTestId("close-toggle"));
    // focus should restore back to the opener
    expect(document.activeElement).toBe(opener);
  });

  it("does nothing when inactive", () => {
    render(<Modal open={false} />);
    // body should be the active element (default)
    expect(document.activeElement).toBe(document.body);
  });
});
