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
  await page.goto("/blog/");
  await expect(page).toHaveScreenshot("blog.png", { fullPage: true });
});

test.describe("dark theme", () => {
  test.use({ colorScheme: "dark" });

  test("index page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot("index-dark.png", { fullPage: true });
  });

  test("blog page", async ({ page }) => {
    await page.goto("/blog/");
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
  test("clicking the background brings cells to life", async ({ page }) => {
    await page.goto("/blog/");
    const canvas = page.locator("[data-life]");
    await expect(canvas).toHaveAttribute("data-generation", "0");
    const before = Number(await canvas.getAttribute("data-alive"));

    // Each click sets three cells alive; some may have been alive already.
    await page.mouse.click(40, 400);
    await page.mouse.click(600, 500);
    await page.mouse.click(1100, 300);

    await expect(canvas).not.toHaveAttribute("data-alive", String(before));
    const after = Number(await canvas.getAttribute("data-alive"));
    expect(after).toBeGreaterThan(before);
    expect(after).toBeLessThanOrEqual(before + 9);
    await expect(canvas).toHaveAttribute("data-generation", "0");

    // Clicking a spot that is already alive changes nothing.
    await page.mouse.click(40, 400);
    await expect(canvas).toHaveAttribute("data-alive", String(after));
  });

  test("clicking a link does not add cells", async ({ page }) => {
    await page.goto("/");
    const canvas = page.locator("[data-life]");
    const before = await canvas.getAttribute("data-alive");

    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL(/\/blog\/?$/);

    await expect(canvas).toHaveAttribute("data-alive", before ?? "");
  });

  test("navigation links end in a slash", async ({ page }) => {
    // Apache redirects a slashless directory URL, and behind the TLS proxy
    // that redirect points to http: the client router cannot follow it and
    // falls back to a full page load.
    await page.goto("/");
    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL(/\/blog\/$/);

    await page.getByRole("link", { name: "Home" }).click();
    await page.getByRole("link", { name: "All posts" }).click();
    await expect(page).toHaveURL(/\/blog\/$/);
  });

  test("the pattern survives navigation", async ({ page }) => {
    await page.goto("/");
    const canvas = page.locator("[data-life]");
    await expect(canvas).toHaveAttribute("data-generation", "0");
    const seeded = await canvas.getAttribute("data-alive");

    await page.mouse.click(40, 400);
    await page.mouse.click(600, 500);
    await page.mouse.click(1100, 300);
    await expect(canvas).not.toHaveAttribute("data-alive", seeded ?? "");
    const drawn = await canvas.getAttribute("data-alive");

    // A fresh page load would be back at the seeded count.
    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
    await expect(canvas).toHaveAttribute("data-alive", drawn ?? "");

    await page.goBack();
    await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
    await expect(canvas).toHaveAttribute("data-alive", drawn ?? "");
    await expect(canvas).toHaveCSS("position", "fixed");
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
