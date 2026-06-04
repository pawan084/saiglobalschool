import { test, expect } from "@playwright/test";

/**
 * Smoke test for the chat panel.
 * Verifies the panel opens, suggestion buttons render, and a click on a
 * suggestion fires a request to /api/chat. Full abort semantics are
 * covered by tests/components/ChatBot.test.tsx where we can build a
 * proper ReadableStream mock with jsdom — Playwright's route.fulfill
 * doesn't easily simulate a slow stream.
 */

test("chat panel opens and triggers /api/chat on a suggestion click", async ({ page }) => {
  // Stub /api/chat so this doesn't depend on a real OPENAI_API_KEY.
  let requested = false;
  await page.route("**/api/chat", async (route) => {
    requested = true;
    await route.fulfill({
      status: 200,
      contentType: "text/plain; charset=utf-8",
      body: "Hello from the test stub.",
    });
  });

  await page.goto("/");
  await page.getByRole("button", { name: /open chat/i }).click();
  // Welcome screen renders the SUGGESTIONS array
  const suggestion = page.getByRole("button", { name: /what grades does sssgs offer/i });
  await expect(suggestion).toBeVisible();
  await suggestion.click();
  await expect.poll(() => requested, { timeout: 5_000 }).toBe(true);
  // No error banner should appear
  await expect(page.getByText(/something went wrong/i)).toHaveCount(0);
});

test("closing the chat panel hides it without surfacing an error", async ({ page }) => {
  // Stub the API to return a streamed-looking body
  await page.route("**/api/chat", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/plain; charset=utf-8",
      body: "Hi there, this is the assistant reply.",
    })
  );

  await page.goto("/");
  await page.getByRole("button", { name: /open chat/i }).click();
  await page.getByRole("button", { name: /what grades does sssgs offer/i }).click();
  // Close mid-conversation
  await page.getByRole("button", { name: /^close$/i }).click();
  // Re-open and confirm no error UI appeared
  await page.getByRole("button", { name: /open chat/i }).click();
  await expect(page.getByText(/something went wrong/i)).toHaveCount(0);
  await expect(page.getByText(/aborted/i)).toHaveCount(0);
});
