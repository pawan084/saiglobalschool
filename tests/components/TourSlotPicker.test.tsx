import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TourSlotPicker from "@/components/TourSlotPicker";
import { ToastProvider } from "@/components/Toast";

function setup() {
  return render(
    <ToastProvider>
      <TourSlotPicker />
    </ToastProvider>
  );
}

describe("TourSlotPicker", () => {
  it("renders steps", () => {
    setup();
    expect(screen.getByText(/choose a date/i)).toBeInTheDocument();
    expect(screen.getByText(/pick a time/i)).toBeInTheDocument();
    expect(screen.getByText(/your details/i)).toBeInTheDocument();
  });

  it("Confirm tour button is disabled when no time selected", () => {
    setup();
    const btn = screen.getByRole("button", { name: /confirm tour/i });
    expect(btn).toBeDisabled();
  });

  it("submits and shows confirmation", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true, reference: "INQ-1" }), { status: 200 })
    );
    const user = userEvent.setup();
    setup();
    const timeButtons = screen.getAllByRole("button").filter((b) => /\bAM\b|\bPM\b/.test(b.textContent || ""));
    await user.click(timeButtons[0]);
    const inputs = document.querySelectorAll("input");
    await user.type(inputs[0]!, "Test");
    await user.type(inputs[1]!, "x@example.com");
    await user.click(screen.getByRole("button", { name: /confirm tour/i }));
    expect(await screen.findByText(/tour confirmed/i)).toBeInTheDocument();
  });
});
