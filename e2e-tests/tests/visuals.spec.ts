import { expect, test } from "@playwright/test";

test("index page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("index.png", { fullPage: true });
});

test("blog page", async ({ page }) => {
  await page.goto("/blog");
  await expect(page).toHaveScreenshot("blog.png", { fullPage: true });
});

test.describe("dark theme", () => {
  test.use({ colorScheme: "dark" });

  test("index page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot("index-dark.png", { fullPage: true });
  });

  test("blog page", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveScreenshot("blog-dark.png", { fullPage: true });
  });
});

test("theme toggle switches and persists the theme", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("button", { name: "Switch to light theme" }),
  ).toBeVisible();
});
