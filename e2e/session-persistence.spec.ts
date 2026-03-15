import { expect, test } from "@playwright/test";

import { setupMocks } from "./support/mocks";

const E2E_EMAIL = process.env.E2E_EMAIL || "test@example.com";
const E2E_PASSWORD = process.env.E2E_PASSWORD || "Test@123";

test.describe("Session Persistence", () => {
  test("should maintain authentication after page reload", async ({ page }) => {
    // Setup mocks
    await setupMocks(page);

    // Step 1: Login
    await page.goto("/auth");
    await page.waitForLoadState("networkidle");

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
      page.waitForURL(/blogs|dashboard/, { timeout: 30000 }),
      page.waitForSelector("[data-sonner-toast]", { timeout: 10000 }),
    ]).catch(() => {});

    // Step 2: Reload the page
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Step 3: Verify still authenticated
    // After reload, authenticated users should NOT see the "Sign In" link
    // or should see user-specific elements
    const signInLink = page.getByText("Sign In", { exact: true });
    const userAvatar = page.locator("img[src*='image']");

    // Either user avatar is visible (authenticated) or Sign In is not visible
    const isStillAuth =
      (await userAvatar.count()) > 0 || (await signInLink.count()) === 0;

    expect(isStillAuth).toBeTruthy();
  });
});
