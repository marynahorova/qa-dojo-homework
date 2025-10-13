import test, { expect } from "@playwright/test";

test.describe("Login tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });
  test("MH-0006 Should successfully login", async ({ page }) => {
    await page
      .getByRole("textbox", { name: "Email" })
      .fill("test1310@test.com");
    await page.getByRole("textbox", { name: "Password" }).fill("password");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
  });

  test("MH-0007 Should not login with empty fields", async ({ page }) => {
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("email can't be blank")).toBeVisible();
  });

  test("MH-0008 Should not login with invalid password", async ({ page }) => {
    await page.getByRole("textbox", { name: "Email" }).fill("test@test.com");
    await page.getByRole("textbox", { name: "Password" }).fill("password1");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("email or password is invalid")).toBeVisible();
  });
});
