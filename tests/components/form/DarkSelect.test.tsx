import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DarkSelect from "@/components/form/DarkSelect";

const OPTIONS = ["", "Grade 1", "Grade 2", "Grade 3"];

describe("DarkSelect", () => {
  it("associates label with select via useId", () => {
    render(
      <DarkSelect label="Grade" value="" onChange={() => {}} options={OPTIONS} />
    );
    const sel = screen.getByLabelText(/grade/i);
    expect(sel.tagName).toBe("SELECT");
  });

  it("renders 'Select…' placeholder for the empty option", () => {
    render(
      <DarkSelect label="Grade" value="" onChange={() => {}} options={OPTIONS} />
    );
    const empty = screen.getByRole("option", { name: /select/i });
    expect((empty as HTMLOptionElement).value).toBe("");
  });

  it("renders all non-empty options with their own labels", () => {
    render(
      <DarkSelect label="Grade" value="" onChange={() => {}} options={OPTIONS} />
    );
    for (const o of ["Grade 1", "Grade 2", "Grade 3"]) {
      expect(screen.getByRole("option", { name: o })).toBeInTheDocument();
    }
  });

  it("fires onChange with selected value", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DarkSelect
        label="Grade"
        value=""
        onChange={onChange}
        options={OPTIONS}
      />
    );
    await user.selectOptions(screen.getByLabelText(/grade/i), "Grade 2");
    expect(onChange).toHaveBeenCalledWith("Grade 2");
  });

  it("marks required + asterisk + sr-only when required", () => {
    render(
      <DarkSelect
        label="Grade"
        value=""
        onChange={() => {}}
        options={OPTIONS}
        required
      />
    );
    expect(screen.getByLabelText(/grade/i)).toBeRequired();
    expect(screen.getByText("*", { selector: "[aria-hidden]" })).toBeInTheDocument();
    expect(screen.getByText(/\(required\)/i)).toHaveClass("sr-only");
  });

  it("renders error alert + wires aria-invalid + aria-describedby", () => {
    render(
      <DarkSelect
        label="Grade"
        value=""
        onChange={() => {}}
        options={OPTIONS}
        error="Please pick a grade"
      />
    );
    const sel = screen.getByLabelText(/grade/i);
    expect(sel).toHaveAttribute("aria-invalid", "true");
    const errId = sel.getAttribute("aria-describedby");
    expect(errId).toBeTruthy();
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(/please pick a grade/i);
    expect(alert.id).toBe(errId);
  });

  it("applies error border styling when error is set", () => {
    const { rerender } = render(
      <DarkSelect label="G" value="" onChange={() => {}} options={OPTIONS} />
    );
    expect(screen.getByLabelText(/g/i).className).toContain("border-white/15");
    rerender(
      <DarkSelect
        label="G"
        value=""
        onChange={() => {}}
        options={OPTIONS}
        error="nope"
      />
    );
    expect(screen.getByLabelText(/g/i).className).toContain("border-[#fda4af]");
  });
});
