import { test, expect } from "@playwright/test";

/**
 * Golden-path verification for the application wizard:
 *  - Enter on a filled field advances to the next step
 *  - Clicking Continue on a blank step focuses the first invalid field
 *  - aria-invalid + role=alert error message appear inline
 */

test.describe("Apply wizard", () => {
  test.beforeEach(async ({ page }) => {
    // Clear any persisted draft so each test starts fresh
    await page.addInitScript(() => {
      try {
        localStorage.removeItem("sssgs:apply-draft");
      } catch {
        // noop
      }
    });
    await page.goto("/apply");
  });

  test("renders Step 1 with the form landmark", async ({ page }) => {
    await expect(page.getByRole("form", { name: /application form/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /parent \/ guardian details/i })).toBeVisible();
  });

  test("blank Continue focuses the first invalid field", async ({ page }) => {
    await page.getByRole("button", { name: /continue/i }).click();
    const nameInput = page.getByLabel(/full name/i).first();
    await expect(nameInput).toHaveAttribute("aria-invalid", "true");
    await expect(nameInput).toBeFocused();
    await expect(page.getByRole("alert").first()).toContainText(/please enter the parent name/i);
  });

  test("Enter on a valid first step advances to step 2", async ({ page }) => {
    // Scope to the application form — the newsletter footer also has an email input.
    const form = page.getByRole("form", { name: /application form/i });
    await form.getByLabel(/full name/i).fill("Alice");
    await form.getByLabel(/email/i).fill("alice@example.com");
    await form.getByLabel(/phone/i).fill("12345678");
    // Submit via Enter on the phone field
    await form.getByLabel(/phone/i).press("Enter");
    await expect(page.getByRole("heading", { name: /about your child/i })).toBeVisible();
  });

  test("error clears when user edits the offending field", async ({ page }) => {
    await page.getByRole("button", { name: /continue/i }).click();
    const nameInput = page.getByLabel(/full name/i).first();
    await expect(nameInput).toHaveAttribute("aria-invalid", "true");
    await nameInput.fill("Bob");
    await expect(nameInput).not.toHaveAttribute("aria-invalid", "true");
  });
});
