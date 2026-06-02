import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
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
});
