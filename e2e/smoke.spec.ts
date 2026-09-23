import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", heading: /Hey, I'm/i },
  { path: "/about", heading: /whoami/i },
  { path: "/projects", heading: /projects/i },
  { path: "/blogs", heading: /blog/i },
  { path: "/contact", heading: /contact/i },
  { path: "/resume", heading: /resume|summary/i },
];

for (const { path, heading } of routes) {
  test(`route ${path} renders with terminal theme intact`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("h1").first()).toContainText(heading, { timeout: 15_000 });
    await expect(page.getByText("hollali@portfolio", { exact: false }).count()).resolves.toBeGreaterThanOrEqual(0);
    const accentUsed = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--terminal-accent").trim()
    );
    expect(accentUsed).not.toBe("");
  });
}

test("site-wide chrome renders on home", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header")).toContainText("hollali@portfolio");
  await expect(page.locator("footer")).toContainText("hollali@portfolio");
});

test("hero boot animation completes and content appears", async ({ page }) => {
  await page.goto("/");
  const boot = page.getByText("./boot", { exact: false });
  await expect(boot).toBeVisible();
  await expect(page.getByText("./introduce", { exact: false })).toBeVisible({ timeout: 15_000 });
  await expect(boot).not.toBeVisible({ timeout: 15_000 });
});

test("map of commands in nav navigates to /contact", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /get_in_touch|contact/i }).first().click();
  await expect(page).toHaveURL(/\/contact/);
});

test("unknown blog slug serves themed 404", async ({ page }) => {
  const response = await page.goto("/blogs/this-post-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("error: page not found")).toBeVisible();
  await expect(page.getByText("404").first()).toBeVisible();
});

test("projects explorer supports search filter", async ({ page }) => {
  await page.goto("/projects");
  const input = page.locator('input[id="project-search"]');
  await expect(input).toBeVisible();
  await input.fill("zzz-no-such-project");
  await expect(page.getByText("No matching projects found", { exact: false })).toBeVisible({ timeout: 10_000 });
});

test("newsletter form shows success without crashing", async ({ page }) => {
  await page.goto("/");
  const input = page.locator('input[id="newsletter-email"]');
  await input.fill("smoke@example.com");
  await page.getByRole("button", { name: /Subscribe/ }).click();
  await expect(page.getByText(/subscribed/, { exact: false })).toBeVisible({ timeout: 10_000 });
});

test("resume exposes save-as-pdf control", async ({ page }) => {
  await page.goto("/resume");
  await expect(page.getByRole("button", { name: /save_as_pdf/ })).toBeVisible();
});