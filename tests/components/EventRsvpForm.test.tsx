import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventRsvpForm from "@/app/events/[slug]/EventRsvpForm";
import { ToastProvider } from "@/components/Toast";

function setup() {
  return render(
    <ToastProvider>
      <EventRsvpForm slug="open-house-june-2026" title="Open House" />
    </ToastProvider>
  );
}

describe("EventRsvpForm", () => {
  it("renders RSVP heading + guest options", () => {
    setup();
    expect(screen.getByText(/reserve your spot/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button").some((b) => b.textContent === "1")).toBe(true);
  });

  it("toggles guest count", async () => {
    const user = userEvent.setup();
    setup();
    const four = screen.getAllByRole("button").find((b) => b.textContent === "4");
    if (four) await user.click(four);
    expect(four?.getAttribute("aria-pressed")).toBe("true");
  });

  it("submits successfully and shows confirmation", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true, reference: "INQ-OPEN" }), { status: 200 })
    );
    const user = userEvent.setup();
    setup();
    const inputs = document.querySelectorAll("input");
    await user.type(inputs[0]!, "Test");
    await user.type(inputs[1]!, "x@example.com");
    await user.click(screen.getByRole("button", { name: /reserve my spot/i }));
    expect(await screen.findByText(/see you at the event/i)).toBeInTheDocument();
    expect(screen.getByText(/INQ-OPEN/)).toBeInTheDocument();
  });

  it("shows error toast on API failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: "Bad" }), { status: 400 })
    );
    const user = userEvent.setup();
    setup();
    const inputs = document.querySelectorAll("input");
    await user.type(inputs[0]!, "Test");
    await user.type(inputs[1]!, "x@example.com");
    await user.click(screen.getByRole("button", { name: /reserve my spot/i }));
    await screen.findByText(/bad/i);
  });

  it("shows network hiccup on fetch reject", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("net"));
    const user = userEvent.setup();
    setup();
    const inputs = document.querySelectorAll("input");
    await user.type(inputs[0]!, "Test");
    await user.type(inputs[1]!, "x@example.com");
    await user.click(screen.getByRole("button", { name: /reserve my spot/i }));
    await screen.findByText(/network hiccup/i);
  });
});
