import { test, expect, type Page } from "@playwright/test";

/**
 * Real-browser keyboard navigation through the desktop dropdown.
 * jsdom tests already cover the ARIA contract; this test catches focus
 * timing / paint / layout bugs that only show up in a real browser.
 *
 * All link queries are scoped to the Primary nav landmark because the
 * Footer also renders the same labels in its column lists.
 */

function primaryNav(page: Page) {
  return page.getByRole("navigation", { name: "Primary" });
}

test.describe("Header desktop disclosure", () => {
  test.beforeEach(async ({ page }) => {
    // The dropdown is lg:block — render at desktop width.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
  });

  test("chevron has aria-haspopup + aria-expanded", async ({ page }) => {
    const chevron = primaryNav(page).getByRole("button", { name: "About submenu" });
    await expect(chevron).toHaveAttribute("aria-haspopup", "true");
    await expect(chevron).toHaveAttribute("aria-expanded", "false");
  });

  test("Enter on chevron opens submenu and focuses first child", async ({ page }) => {
    const nav = primaryNav(page);
    const chevron = nav.getByRole("button", { name: "About submenu" });
    await chevron.focus();
    await page.keyboard.press("Enter");
    await expect(chevron).toHaveAttribute("aria-expanded", "true");
    await expect(nav.getByRole("link", { name: "About Us", exact: true })).toBeFocused();
  });

  test("ArrowDown cycles through children", async ({ page }) => {
    const nav = primaryNav(page);
    const chevron = nav.getByRole("button", { name: "About submenu" });
    await chevron.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("ArrowDown");
    await expect(nav.getByRole("link", { name: "Vision & Mission" })).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(nav.getByRole("link", { name: "Management & Governance" })).toBeFocused();
  });

  test("Escape closes submenu and returns focus to chevron", async ({ page }) => {
    const chevron = primaryNav(page).getByRole("button", { name: "About submenu" });
    await chevron.focus();
    await page.keyboard.press("Enter");
    await expect(chevron).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(chevron).toHaveAttribute("aria-expanded", "false");
    await expect(chevron).toBeFocused();
  });

  test("clicking a child link navigates", async ({ page }) => {
    const nav = primaryNav(page);
    const chevron = nav.getByRole("button", { name: "About submenu" });
    // Use keyboard to open deterministically — `chevron.click()` also fires
    // pointermove which triggers the hover-open path, occasionally racing
    // with the click handler's toggle.
    await chevron.focus();
    await page.keyboard.press("Enter");
    await expect(chevron).toHaveAttribute("aria-expanded", "true");
    await nav.getByRole("link", { name: "Vision & Mission" }).click();
    await expect(page).toHaveURL(/\/vision-mission$/);
  });

  test("hover (mouse) also opens the submenu", async ({ page }) => {
    const nav = primaryNav(page);
    const chevron = nav.getByRole("button", { name: "About submenu" });
    await chevron.hover();
    await expect(chevron).toHaveAttribute("aria-expanded", "true");
    await expect(nav.getByRole("link", { name: "Vision & Mission" })).toBeVisible();
  });
});
