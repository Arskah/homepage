import { expect, test } from "@playwright/test";

// The Game of Life background seeds its start pattern from `Math.random()`.
// Pin it so every run draws the same first generation.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
});

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

test.describe("life background", () => {
  test("clicking the background flips one cell", async ({ page }) => {
    await page.goto("/blog");
    const canvas = page.locator("[data-life]");
    await expect(canvas).toHaveAttribute("data-generation", "0");
    const before = Number(await canvas.getAttribute("data-alive"));

    await page.mouse.click(40, 400);

    await expect(canvas).not.toHaveAttribute("data-alive", String(before));
    const after = Number(await canvas.getAttribute("data-alive"));
    expect(Math.abs(after - before)).toBe(1);
    await expect(canvas).toHaveAttribute("data-generation", "0");
  });

  test("clicking a link does not flip a cell", async ({ page }) => {
    await page.goto("/");
    const canvas = page.locator("[data-life]");
    const before = await canvas.getAttribute("data-alive");

    await page.getByRole("link", { name: "Blog" }).click();
    await page.goBack();

    await expect(canvas).toHaveAttribute("data-alive", before ?? "");
  });

  test("play and pause control the animation", async ({ page }) => {
    await page.goto("/");
    const canvas = page.locator("[data-life]");
    await expect(canvas).toHaveAttribute("data-generation", "0");

    await page
      .getByRole("button", { name: "Play background animation" })
      .click();
    await expect(canvas).not.toHaveAttribute("data-generation", "0");

    await page
      .getByRole("button", { name: "Pause background animation" })
      .click();
    const stopped = await canvas.getAttribute("data-generation");
    // Let about a second of animation frames pass; a running loop would tick.
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          let frames = 0;
          const next = () => {
            if (++frames > 60) resolve();
            else requestAnimationFrame(next);
          };
          next();
        }),
    );
    await expect(canvas).toHaveAttribute("data-generation", stopped ?? "");
  });
});
