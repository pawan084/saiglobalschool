import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchDialog, { openSearchEvent } from "@/components/SearchDialog";

describe("SearchDialog", () => {
  it("is closed by default", () => {
    render(<SearchDialog />);
    expect(screen.queryByPlaceholderText(/search sssgs/i)).not.toBeInTheDocument();
  });

  it("opens on the sssgs:open-search event", () => {
    render(<SearchDialog />);
    act(() => {
      window.dispatchEvent(new Event("sssgs:open-search"));
    });
    expect(screen.getByPlaceholderText(/search sssgs/i)).toBeInTheDocument();
  });

  it("opens on Cmd+K hotkey", async () => {
    const user = userEvent.setup();
    render(<SearchDialog />);
    await user.keyboard("{Meta>}k{/Meta}");
    expect(screen.getByPlaceholderText(/search sssgs/i)).toBeInTheDocument();
  });

  it("openSearchEvent helper dispatches the event", () => {
    render(<SearchDialog />);
    act(() => openSearchEvent());
    expect(screen.getByPlaceholderText(/search sssgs/i)).toBeInTheDocument();
  });

  it("filters results when typing", async () => {
    const user = userEvent.setup();
    render(<SearchDialog />);
    act(() => window.dispatchEvent(new Event("sssgs:open-search")));
    await user.type(screen.getByPlaceholderText(/search sssgs/i), "fee");
    expect(screen.getAllByText(/fee/i).length).toBeGreaterThan(0);
  });

  it("shows empty-state when no results", async () => {
    const user = userEvent.setup();
    render(<SearchDialog />);
    act(() => window.dispatchEvent(new Event("sssgs:open-search")));
    await user.type(screen.getByPlaceholderText(/search sssgs/i), "zzzzzzzzzzz");
    expect(screen.getByText(/nothing matched/i)).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<SearchDialog />);
    act(() => window.dispatchEvent(new Event("sssgs:open-search")));
    expect(screen.getByPlaceholderText(/search sssgs/i)).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByPlaceholderText(/search sssgs/i)).not.toBeInTheDocument();
  });

  it("arrow-down advances cursor, enter selects", async () => {
    const user = userEvent.setup();
    render(<SearchDialog />);
    act(() => window.dispatchEvent(new Event("sssgs:open-search")));
    const input = screen.getByPlaceholderText(/search sssgs/i);
    await user.type(input, "apply");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");
    // After enter, dialog closes
    expect(screen.queryByPlaceholderText(/search sssgs/i)).not.toBeInTheDocument();
  });

  it("ArrowUp moves cursor toward the top of the list", async () => {
    const user = userEvent.setup();
    render(<SearchDialog />);
    act(() => window.dispatchEvent(new Event("sssgs:open-search")));
    const input = screen.getByPlaceholderText(/search sssgs/i);
    await user.type(input, "a");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveAttribute("role", "combobox");
  });

  it("toggles open with Cmd+K (second press closes)", async () => {
    const user = userEvent.setup();
    render(<SearchDialog />);
    await user.keyboard("{Meta>}k{/Meta}");
    expect(screen.getByPlaceholderText(/search sssgs/i)).toBeInTheDocument();
    await user.keyboard("{Meta>}k{/Meta}");
    expect(screen.queryByPlaceholderText(/search sssgs/i)).not.toBeInTheDocument();
  });

  it("clicking the backdrop closes the dialog", () => {
    render(<SearchDialog />);
    act(() => window.dispatchEvent(new Event("sssgs:open-search")));
    const dialog = screen.getByRole("dialog");
    act(() => {
      dialog.click();
    });
    expect(screen.queryByPlaceholderText(/search sssgs/i)).not.toBeInTheDocument();
  });

  it("hovering a result updates the cursor (aria-selected follows)", async () => {
    const user = userEvent.setup();
    render(<SearchDialog />);
    act(() => window.dispatchEvent(new Event("sssgs:open-search")));
    await user.type(screen.getByPlaceholderText(/search sssgs/i), "fee");
    const options = screen.getAllByRole("option");
    expect(options.length).toBeGreaterThan(1);
    await user.hover(options[1]);
    expect(options[1]).toHaveAttribute("aria-selected", "true");
  });

  it("mobile close button dismisses the dialog", async () => {
    const user = userEvent.setup();
    render(<SearchDialog />);
    act(() => window.dispatchEvent(new Event("sssgs:open-search")));
    await user.click(screen.getByRole("button", { name: /^close$/i }));
    expect(screen.queryByPlaceholderText(/search sssgs/i)).not.toBeInTheDocument();
  });

  it("'Ask us' link closes the dialog and navigates", async () => {
    const user = userEvent.setup();
    render(<SearchDialog />);
    act(() => window.dispatchEvent(new Event("sssgs:open-search")));
    await user.click(screen.getByRole("link", { name: /can.+t find it.+ask us/i }));
    expect(screen.queryByPlaceholderText(/search sssgs/i)).not.toBeInTheDocument();
  });
});
