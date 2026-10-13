import { expect, test } from "@playwright/test";

test("index page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("index.png", { fullPage: true });
});

test("blog page", async ({ page }) => {
  await page.goto("/blog");
  await expect(page).toHaveScreenshot("blog.png", { fullPage: true });
});
