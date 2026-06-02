import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SharePage from "@/components/SharePage";
import { ToastProvider } from "@/components/Toast";

function setup(props: { title: string; url?: string } = { title: "Test" }) {
  return render(
    <ToastProvider>
      <SharePage {...props} />
    </ToastProvider>
  );
}

describe("SharePage", () => {
  it("renders the share buttons", () => {
    setup();
    expect(screen.getByText(/copy link/i)).toBeInTheDocument();
    expect(screen.getByText(/whatsapp/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/facebook/i)).toBeInTheDocument();
  });

  it("copy button writes URL to clipboard", async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    setup({ title: "X", url: "https://example.com/abc" });
    await user.click(screen.getByText(/copy link/i));
    expect(spy).toHaveBeenCalledWith("https://example.com/abc");
  });

  it("uses window.location as fallback URL", async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    setup({ title: "X" });
    await user.click(screen.getByText(/copy link/i));
    expect(spy).toHaveBeenCalled();
  });

  it("shows error toast when clipboard fails", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("no perm"));
    setup({ title: "X" });
    await user.click(screen.getByText(/copy link/i));
    await screen.findByText(/couldn't copy/i);
  });
});
