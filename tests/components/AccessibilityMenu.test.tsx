import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccessibilityMenu from "@/components/AccessibilityMenu";

describe("AccessibilityMenu", () => {
  it("renders the launcher button", () => {
    render(<AccessibilityMenu />);
    expect(screen.getByLabelText(/accessibility options/i)).toBeInTheDocument();
  });

  it("opens panel and applies font scale to html", async () => {
    const user = userEvent.setup();
    render(<AccessibilityMenu />);
    await user.click(screen.getByLabelText(/accessibility options/i));
    expect(screen.getByText(/reading preferences/i)).toBeInTheDocument();

    const xlButton = screen.getByLabelText(/extra large/i);
    await user.click(xlButton);
    expect(document.documentElement.getAttribute("data-font-scale")).toBe("xl");
  });

  it("toggles high contrast", async () => {
    const user = userEvent.setup();
    render(<AccessibilityMenu />);
    await user.click(screen.getByLabelText(/accessibility options/i));
    const highBtn = screen.getByRole("button", { name: /^high$/i });
    await user.click(highBtn);
    expect(document.documentElement.getAttribute("data-contrast")).toBe("high");
  });

  it("reset clears applied prefs", async () => {
    const user = userEvent.setup();
    render(<AccessibilityMenu />);
    await user.click(screen.getByLabelText(/accessibility options/i));
    await user.click(screen.getByLabelText(/extra large/i));
    await user.click(screen.getByText(/reset to defaults/i));
    expect(document.documentElement.getAttribute("data-font-scale")).toBeNull();
    expect(document.documentElement.getAttribute("data-contrast")).toBeNull();
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<AccessibilityMenu />);
    await user.click(screen.getByLabelText(/accessibility options/i));
    expect(screen.getByText(/reading preferences/i)).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText(/reading preferences/i)).not.toBeInTheDocument();
  });

  it("hydrates previously-saved preferences from localStorage", () => {
    localStorage.setItem("sssgs:font-scale", "xxl");
    localStorage.setItem("sssgs:contrast", "high");
    render(<AccessibilityMenu />);
    expect(document.documentElement.getAttribute("data-font-scale")).toBe("xxl");
    expect(document.documentElement.getAttribute("data-contrast")).toBe("high");
  });
});
