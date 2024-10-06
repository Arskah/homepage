import { expect, test } from "@playwright/test";

test("index page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("index.png");
});

test("blog page", async ({ page }) => {
  await page.goto("/blog");
  await expect(page).toHaveScreenshot("blog.png");
});

test("about page", async ({ page }) => {
  await page.goto("/about");
  await expect(page).toHaveScreenshot("about.png");
});
