import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplyWizard from "@/app/apply/ApplyWizard";
import { ToastProvider } from "@/components/Toast";

function setup() {
  return render(
    <ToastProvider>
      <ApplyWizard />
    </ToastProvider>
  );
}

describe("ApplyWizard", () => {
  it("renders Step 1", () => {
    setup();
    expect(screen.getByText(/parent \/ guardian details/i)).toBeInTheDocument();
  });

  it("blocks Continue when fields are blank", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByText(/continue/i));
    // Error is announced both inline (role=alert next to the field) and in the toast.
    const alerts = await screen.findAllByRole("alert");
    expect(alerts.some((el) => /please enter the parent name/i.test(el.textContent || ""))).toBe(true);
    // Inline error is wired to the field via aria-describedby / aria-invalid.
    const nameInput = screen.getByLabelText(/^full name/i);
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput.getAttribute("aria-describedby")).toBe("apply-parentName-err");
  });

  it("advances to step 2 with valid data", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.type(screen.getByLabelText(/^email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/phone/i), "12345678");
    await user.click(screen.getByText(/continue/i));
    expect(await screen.findByText(/about your child/i)).toBeInTheDocument();
  });

  it("Back button returns to the previous step", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.type(screen.getByLabelText(/^email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/phone/i), "12345678");
    await user.click(screen.getByText(/continue/i));
    await screen.findByText(/about your child/i);
    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByText(/parent \/ guardian details/i)).toBeInTheDocument();
  });

  it("step 2 validation requires child name + dob", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.type(screen.getByLabelText(/^email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/phone/i), "12345678");
    await user.click(screen.getByText(/continue/i));
    await screen.findByText(/about your child/i);
    // Empty step 2 fails on child name
    await user.click(screen.getByText(/continue/i));
    const alerts = await screen.findAllByRole("alert");
    expect(alerts.some((el) => /child.+name/i.test(el.textContent || ""))).toBe(true);
  });

  it("step 3 validation requires grade selection", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.type(screen.getByLabelText(/^email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/phone/i), "12345678");
    await user.click(screen.getByText(/continue/i));
    await user.type(await screen.findByLabelText(/^full name/i), "Bob");
    await user.type(screen.getByLabelText(/date of birth/i), "2018-04-12");
    await user.click(screen.getByText(/continue/i));
    // On step 3 — leave grade blank
    await screen.findByRole("heading", { name: /schooling/i });
    await user.click(screen.getByText(/continue/i));
    const alerts = await screen.findAllByRole("alert");
    expect(alerts.some((el) => /grade/i.test(el.textContent || ""))).toBe(true);
  });

  it("submit fails without consent ticked", async () => {
    const user = userEvent.setup();
    setup();
    // Walk through to step 5
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.type(screen.getByLabelText(/^email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/phone/i), "12345678");
    await user.click(screen.getByText(/continue/i));
    await user.type(await screen.findByLabelText(/^full name/i), "Bob");
    await user.type(screen.getByLabelText(/date of birth/i), "2018-04-12");
    await user.click(screen.getByText(/continue/i));
    await user.selectOptions(await screen.findByLabelText(/grade applying for/i), "Grade 3");
    await user.click(screen.getByText(/continue/i));
    await screen.findByRole("heading", { name: /^documents$/i });
    await user.click(screen.getByText(/continue/i));
    await screen.findByText(/review & submit/i);
    // Click submit without checking consent
    await user.click(screen.getByText(/submit application/i));
    const alerts = await screen.findAllByRole("alert");
    expect(alerts.some((el) => /consent/i.test(el.textContent || ""))).toBe(true);
  }, 15000);

  it("shows network-hiccup error when fetch rejects", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.type(screen.getByLabelText(/^email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/phone/i), "12345678");
    await user.click(screen.getByText(/continue/i));
    await user.type(await screen.findByLabelText(/^full name/i), "Bob");
    await user.type(screen.getByLabelText(/date of birth/i), "2018-04-12");
    await user.click(screen.getByText(/continue/i));
    await user.selectOptions(await screen.findByLabelText(/grade applying for/i), "Grade 3");
    await user.click(screen.getByText(/continue/i));
    await screen.findByRole("heading", { name: /^documents$/i });
    await user.click(screen.getByText(/continue/i));
    await screen.findByText(/review & submit/i);
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByText(/submit application/i));
    // Toast surfaces the network error
    await screen.findByText(/network hiccup/i);
  }, 15000);

  it("API error response surfaces in the toast", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: "Server boom" }), { status: 400 })
    );
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.type(screen.getByLabelText(/^email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/phone/i), "12345678");
    await user.click(screen.getByText(/continue/i));
    await user.type(await screen.findByLabelText(/^full name/i), "Bob");
    await user.type(screen.getByLabelText(/date of birth/i), "2018-04-12");
    await user.click(screen.getByText(/continue/i));
    await user.selectOptions(await screen.findByLabelText(/grade applying for/i), "Grade 3");
    await user.click(screen.getByText(/continue/i));
    await screen.findByRole("heading", { name: /^documents$/i });
    await user.click(screen.getByText(/continue/i));
    await screen.findByText(/review & submit/i);
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByText(/submit application/i));
    await screen.findByText(/server boom/i);
  }, 15000);

  it("toggling a document selects/deselects it", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.type(screen.getByLabelText(/^email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/phone/i), "12345678");
    await user.click(screen.getByText(/continue/i));
    await user.type(await screen.findByLabelText(/^full name/i), "Bob");
    await user.type(screen.getByLabelText(/date of birth/i), "2018-04-12");
    await user.click(screen.getByText(/continue/i));
    await user.selectOptions(await screen.findByLabelText(/grade applying for/i), "Grade 3");
    await user.click(screen.getByText(/continue/i));
    await screen.findByRole("heading", { name: /^documents$/i });
    const docBtn = screen.getAllByRole("button", { pressed: false })[0];
    await user.click(docBtn);
    expect(docBtn).toHaveAttribute("aria-pressed", "true");
    await user.click(docBtn);
    expect(docBtn).toHaveAttribute("aria-pressed", "false");
  }, 15000);

  it("clear draft button removes saved state (uses native confirm)", async () => {
    const confirmSpy = vi.spyOn(globalThis, "confirm").mockReturnValue(true);
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    // The sidebar clear-draft button
    const clearBtn = screen.getByRole("button", { name: /clear saved draft/i });
    await user.click(clearBtn);
    expect(confirmSpy).toHaveBeenCalled();
    // Form is back to empty Step 1
    expect((screen.getByLabelText(/^full name/i) as HTMLInputElement).value).toBe("");
  });

  it("clear draft cancelled keeps the form intact", async () => {
    vi.spyOn(globalThis, "confirm").mockReturnValue(false);
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.click(screen.getByRole("button", { name: /clear saved draft/i }));
    expect((screen.getByLabelText(/^full name/i) as HTMLInputElement).value).toBe("Alice");
  });

  it("submits and shows success state", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true, reference: "SSSGS-XYZ" }), { status: 200 })
    );
    const user = userEvent.setup();
    setup();
    // Step 1
    await user.type(screen.getByLabelText(/^full name/i), "Alice");
    await user.type(screen.getByLabelText(/^email/i), "alice@example.com");
    await user.type(screen.getByLabelText(/phone/i), "12345678");
    await user.click(screen.getByText(/continue/i));
    // Step 2
    await user.type(await screen.findByLabelText(/^full name/i), "Bob Child");
    await user.type(screen.getByLabelText(/date of birth/i), "2018-04-12");
    await user.click(screen.getByText(/continue/i));
    // Step 3
    await user.selectOptions(await screen.findByLabelText(/grade applying for/i), "Grade 3");
    await user.click(screen.getByText(/continue/i));
    // Step 4 — Documents (skip the heading collision by finding the section heading)
    await screen.findByRole("heading", { name: /^documents$/i });
    await user.click(screen.getByText(/continue/i));
    // Step 5 — Review
    await screen.findByText(/review & submit/i);
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByText(/submit application/i));
    expect(await screen.findByText(/application received/i)).toBeInTheDocument();
    expect(screen.getByText(/SSSGS-XYZ/)).toBeInTheDocument();
  }, 15000);
});
