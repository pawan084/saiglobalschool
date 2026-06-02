import { describe, it, expect, vi } from "vitest";
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
});
