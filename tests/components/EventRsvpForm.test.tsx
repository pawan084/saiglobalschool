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
    // Guest count buttons are now role="radio" inside a radiogroup
    const radios = screen.getAllByRole("radio");
    expect(radios.map((r) => r.textContent)).toEqual(["1", "2", "3", "4"]);
    expect(screen.getByRole("radiogroup", { name: /guests/i })).toBeInTheDocument();
  });

  it("toggles guest count", async () => {
    const user = userEvent.setup();
    setup();
    const four = screen.getAllByRole("radio").find((b) => b.textContent === "4");
    if (four) await user.click(four);
    expect(four?.getAttribute("aria-checked")).toBe("true");
  });

  it("guest radios use roving tabindex (only one is tabbable)", () => {
    setup();
    const radios = screen.getAllByRole("radio");
    const tabbable = radios.filter((r) => r.getAttribute("tabindex") === "0");
    expect(tabbable.length).toBe(1);
    // Default guests=2 → "2" is the tabbable one
    expect(tabbable[0].textContent).toBe("2");
  });

  it("ArrowRight moves selection AND focus to the next radio", async () => {
    const user = userEvent.setup();
    setup();
    const radios = screen.getAllByRole("radio");
    const two = radios[1]; // "2" is default-selected
    two.focus();
    await user.keyboard("{ArrowRight}");
    const three = radios[2];
    expect(three).toHaveAttribute("aria-checked", "true");
    expect(document.activeElement).toBe(three);
    // Roving tabindex follows selection
    expect(three.getAttribute("tabindex")).toBe("0");
    expect(two.getAttribute("tabindex")).toBe("-1");
  });

  it("ArrowLeft wraps from first to last", async () => {
    const user = userEvent.setup();
    setup();
    const radios = screen.getAllByRole("radio");
    radios[1].focus(); // "2"
    await user.keyboard("{ArrowLeft}"); // → "1"
    await user.keyboard("{ArrowLeft}"); // → wrap to "4"
    expect(radios[3]).toHaveAttribute("aria-checked", "true");
    expect(document.activeElement).toBe(radios[3]);
  });

  it("Home jumps to first, End jumps to last", async () => {
    const user = userEvent.setup();
    setup();
    const radios = screen.getAllByRole("radio");
    radios[1].focus();
    await user.keyboard("{End}");
    expect(radios[3]).toHaveAttribute("aria-checked", "true");
    expect(document.activeElement).toBe(radios[3]);
    await user.keyboard("{Home}");
    expect(radios[0]).toHaveAttribute("aria-checked", "true");
    expect(document.activeElement).toBe(radios[0]);
  });

  it("radiogroup is labelled by the visible 'Guests' label", () => {
    setup();
    const group = screen.getByRole("radiogroup", { name: /guests/i });
    expect(group).toBeInTheDocument();
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
