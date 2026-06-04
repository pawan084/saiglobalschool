import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatBot from "@/components/ChatBot";
import { ToastProvider } from "@/components/Toast";

/**
 * Verifies the AbortController wiring on the chat panel:
 *   - signal is passed to fetch
 *   - panel close fires abort
 *   - AbortError is swallowed (no error toast)
 *   - "new conversation" aborts in-flight stream
 */

function setup() {
  return render(
    <ToastProvider>
      <ChatBot />
    </ToastProvider>
  );
}

/** Build a Response whose body never settles until the signal aborts. */
function pendingStreamResponse(signal: AbortSignal): Response {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      // Yield one chunk immediately so the read loop enters its body,
      // then leave the stream open until aborted.
      controller.enqueue(new TextEncoder().encode("Hi"));
      signal.addEventListener("abort", () => {
        controller.error(new DOMException("Aborted", "AbortError"));
      });
    },
  });
  return new Response(body, { status: 200, headers: { "content-type": "text/plain" } });
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
    const signal = init?.signal as AbortSignal;
    return Promise.resolve(pendingStreamResponse(signal));
  });
  vi.stubGlobal("fetch", fetchMock);
  localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ChatBot AbortController wiring", () => {
  it("passes a signal to fetch", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: /open chat/i }));
    await user.click(await screen.findByRole("button", { name: /what grades does sssgs offer/i }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect(init.signal).toBeInstanceOf(AbortSignal);
    expect(init.signal!.aborted).toBe(false);
  });

  it("aborts the in-flight stream when the panel closes", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: /open chat/i }));
    await user.click(await screen.findByRole("button", { name: /what grades does sssgs offer/i }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const signal = (fetchMock.mock.calls[0][1] as RequestInit).signal as AbortSignal;

    // Close the panel
    await user.click(screen.getByRole("button", { name: /^close$/i }));
    await waitFor(() => expect(signal.aborted).toBe(true));
  });

  it("swallows AbortError — no error toast after abort", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: /open chat/i }));
    await user.click(await screen.findByRole("button", { name: /what grades does sssgs offer/i }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("button", { name: /^close$/i }));
    // Re-open the panel and confirm no error message is visible
    await user.click(screen.getByRole("button", { name: /open chat/i }));
    // Give React a tick for any error state to potentially render
    await new Promise((r) => setTimeout(r, 0));
    // Error UI in ChatBot would say "Something went wrong" or echo the error message.
    // If AbortError leaked, it'd say "The user aborted a request." or similar.
    expect(screen.queryByText(/aborted|something went wrong/i)).toBeNull();
  });

  it("'new conversation' aborts the current stream and resets messages", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: /open chat/i }));
    await user.click(await screen.findByRole("button", { name: /what grades does sssgs offer/i }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const signal = (fetchMock.mock.calls[0][1] as RequestInit).signal as AbortSignal;

    await user.click(screen.getByRole("button", { name: /start new conversation/i }));
    await waitFor(() => expect(signal.aborted).toBe(true));
    // Welcome view re-renders (suggestions visible again)
    expect(
      await screen.findByRole("button", { name: /what grades does sssgs offer/i })
    ).toBeInTheDocument();
  });

});
