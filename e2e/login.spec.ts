import { expect, test } from "@playwright/test";

import { setupMocks } from "./support/mocks";

const E2E_EMAIL = process.env.E2E_EMAIL || "test@example.com";
const E2E_PASSWORD = process.env.E2E_PASSWORD || "Test@123";

test.beforeEach(async ({ page }) => {
  await setupMocks(page);
});

test.describe("Login Flow", () => {
  test("should navigate to sign-in page", async ({ page }) => {
    await page.goto("/auth");
    await expect(page).toHaveURL(/auth/);
  });

  test("should show sign-in form with email and password fields", async ({
    page,
  }) => {
    await page.goto("/auth");

    // Look for email and password inputs
    const emailInput = page.getByPlaceholder("@example.com");
    const passwordInput = page.getByPlaceholder("Enter your password");

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test("should show sign-in submit button", async ({ page }) => {
    await page.goto("/auth");
    await page.waitForLoadState("networkidle");

    const submitButton = page.getByRole("button", {
      name: "Sign In",
      exact: true,
    });
    await expect(submitButton).toBeVisible({ timeout: 15000 });
  });

  test("should fill credentials and submit sign-in form", async ({ page }) => {
    await page.goto("/auth");
    await page.waitForLoadState("networkidle");

    // Fill in the form
    await page.getByPlaceholder("@example.com").fill(E2E_EMAIL);
    await page.getByPlaceholder("Enter your password").fill(E2E_PASSWORD);

    // Submit the form
    const submitButton = page.getByRole("button", {
      name: "Sign In",
      exact: true,
    });
    await submitButton.click();

    // Wait for the response - either navigation or error toast
    // We wait for either the URL to change or a toast to appear
    await Promise.race([
      page.waitForURL(/blogs|dashboard/, { timeout: 15000 }),
      page.waitForSelector("[data-sonner-toast]", { timeout: 15000 }),
      page.waitForTimeout(5000), // Fallback
    ]);

    // Either we've been redirected (success) or we see an error
    const currentUrl = page.url();
    const isRedirected = !currentUrl.includes("/auth");
    const hasError = await page.locator("[data-sonner-toast]").count();

    // Assert that either redirect happened or error is shown
    expect(isRedirected || hasError > 0).toBeTruthy();
  });
});
