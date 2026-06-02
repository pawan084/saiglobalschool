import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FeeCalculator from "@/app/fee-structure/calculator/FeeCalculator";
import { ToastProvider } from "@/components/Toast";

function setup() {
  return render(
    <ToastProvider>
      <FeeCalculator />
    </ToastProvider>
  );
}

describe("FeeCalculator", () => {
  it("renders steps + summary card", () => {
    setup();
    expect(screen.getByText(/pick your child/i)).toBeInTheDocument();
    expect(screen.getByText(/optional add-ons/i)).toBeInTheDocument();
    expect(screen.getByText(/year 1/i)).toBeInTheDocument();
  });

  it("switches grade band when grade 6 is picked", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: "G6" }));
    expect(screen.getByText(/secondary band/i)).toBeInTheDocument();
  });

  it("toggles add-on selection", async () => {
    const user = userEvent.setup();
    setup();
    const transportBtn = screen.getAllByRole("button").find((b) =>
      /school transport/i.test(b.textContent || "")
    );
    if (transportBtn) {
      await user.click(transportBtn);
      expect(transportBtn.getAttribute("aria-pressed")).toBe("true");
    }
  });

  it("currency switcher updates symbols", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: "USD" }));
    expect(screen.getAllByText(/US\$/).length).toBeGreaterThan(0);
  });

  it("share link copies the URL to clipboard", async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    setup();
    await user.click(screen.getByText(/copy share link/i));
    expect(spy).toHaveBeenCalled();
  });
});
