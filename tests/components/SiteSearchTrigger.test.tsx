import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SiteSearchTrigger from "@/components/SiteSearchTrigger";

describe("SiteSearchTrigger", () => {
  it("dispatches sssgs:open-search on click", async () => {
    const spy = vi.fn();
    window.addEventListener("sssgs:open-search", spy);
    const user = userEvent.setup();
    render(<SiteSearchTrigger />);
    await user.click(screen.getByText(/search the site/i));
    expect(spy).toHaveBeenCalled();
    window.removeEventListener("sssgs:open-search", spy);
  });
});
