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
