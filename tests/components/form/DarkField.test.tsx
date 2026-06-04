import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DarkField from "@/components/form/DarkField";

describe("DarkField", () => {
  it("associates label with input via useId", () => {
    render(<DarkField label="Your name" value="" onChange={() => {}} />);
    const input = screen.getByLabelText(/your name/i);
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });

  it("renders required asterisk + sr-only text when required", () => {
    render(<DarkField label="Email" value="" onChange={() => {}} required />);
    // Visible asterisk has aria-hidden so screen readers don't read it
    const asterisk = screen.getByText("*", { selector: "[aria-hidden]" });
    expect(asterisk).toBeInTheDocument();
    expect(screen.getByText(/\(required\)/i)).toHaveClass("sr-only");
    expect(screen.getByLabelText(/email/i)).toBeRequired();
  });

  it("does not render error UI when error prop absent", () => {
    render(<DarkField label="Phone" value="" onChange={() => {}} />);
    const input = screen.getByLabelText(/phone/i);
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("renders error with role=alert and wires aria-invalid + aria-describedby", () => {
    render(<DarkField label="Email" value="x" onChange={() => {}} error="Bad email" />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    const errId = input.getAttribute("aria-describedby");
    expect(errId).toBeTruthy();
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Bad email");
    expect(alert.id).toBe(errId);
  });

  it("honors the type prop (email/tel/etc.)", () => {
    render(<DarkField label="Mail" type="email" value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/mail/i)).toHaveAttribute("type", "email");
  });

  it("fires onChange with new value when the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DarkField label="Name" value="" onChange={onChange} />);
    await user.type(screen.getByLabelText(/name/i), "Ab");
    expect(onChange).toHaveBeenCalledWith("A");
    expect(onChange).toHaveBeenLastCalledWith("b");
  });

  it("applies error border styling when error is set", () => {
    const { rerender } = render(
      <DarkField label="X" value="" onChange={() => {}} />
    );
    expect(screen.getByLabelText(/x/i).className).toContain("border-white/15");
    rerender(<DarkField label="X" value="" onChange={() => {}} error="nope" />);
    expect(screen.getByLabelText(/x/i).className).toContain("border-[#fda4af]");
  });
});
