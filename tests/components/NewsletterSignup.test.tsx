import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsletterSignup from "@/components/NewsletterSignup";
import { ToastProvider } from "@/components/Toast";

function setup() {
  return render(
    <ToastProvider>
      <NewsletterSignup />
    </ToastProvider>
  );
}

describe("NewsletterSignup", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the form", () => {
    setup();
    expect(screen.getByPlaceholderText(/you@example/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  it("submits successfully", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByPlaceholderText(/you@example/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    await screen.findByText(/you're on the list/i);
  });

  it("shows error toast on API failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: "Bad" }), { status: 400 })
    );
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByPlaceholderText(/you@example/i), "bad@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    await screen.findByText(/bad/i);
  });

  it("shows hiccup toast on network error", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByPlaceholderText(/you@example/i), "x@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    await screen.findByText(/network hiccup/i);
  });

  it("shows inline error when email is empty + focuses input", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toMatch(/email is required/i);
    expect(document.activeElement).toBe(screen.getByPlaceholderText(/you@example/i));
  });

  it("shows inline error for malformed email", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByPlaceholderText(/you@example/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toMatch(/valid email/i);
  });

  it("clears the inline error once the user starts editing", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText(/you@example/i), "x");
    // Error should clear
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
