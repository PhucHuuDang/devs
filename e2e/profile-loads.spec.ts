import { expect, test } from "@playwright/test";

import { setupMocks } from "./support/mocks";

const E2E_EMAIL = process.env.E2E_EMAIL || "test@example.com";
const E2E_PASSWORD = process.env.E2E_PASSWORD || "Test@123";

test.describe("Profile Page", () => {
  test.beforeEach(async ({ page }) => {
    // Setup mocks
    await setupMocks(page);

    await page.goto("/auth");
    await page.waitForLoadState("networkidle");

    // If redirected already, we are done
    if (page.url().includes("/blogs") || page.url().includes("/dashboard")) {
      return;
    }

    // Fill credentials
    // Small delay to ensure hydration
    await page.waitForTimeout(1000);

    await page.getByPlaceholder("@example.com").fill(E2E_EMAIL);
    await page.getByPlaceholder("Enter your password").fill(E2E_PASSWORD);

    const submitButton = page.getByRole("button", {
      name: "Sign In",
      exact: true,
    });
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // Wait for login to complete
    await Promise.race([
      page.waitForURL(/blogs|dashboard|profile/, { timeout: 30000 }),
      page.waitForSelector("text=Welcome", { timeout: 10000 }),
      page.waitForSelector("[data-sonner-toast]", { timeout: 10000 }),
    ]).catch(() => {});
  });

  test("should navigate to profile page", async ({ page }) => {
    await page.goto("/profile");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/profile/);
  });

  test("should display user profile information", async ({ page }) => {
    await page.goto("/profile");
    await page.waitForLoadState("networkidle");

    // Profile should show specific section headers
    const personalInfoHeading = page.getByRole("heading", {
      name: /personal information/i,
    });
    await expect(personalInfoHeading).toBeVisible({ timeout: 15000 });

    // Verify the page has loaded the user name
    const userName = page.getByText("John Doe", { exact: false });
    await expect(userName.first()).toBeVisible();
  });

  test("should display user avatar or fallback", async ({ page }) => {
    await page.goto("/profile");
    await page.waitForLoadState("networkidle");

    // Check for avatar image
    const avatar = page.locator("img").first();
    await expect(avatar).toBeVisible();
  });
});
