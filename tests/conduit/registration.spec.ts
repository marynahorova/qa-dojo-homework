import test, { expect } from "@playwright/test";

test.describe("Registration tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  const userName = "user" + Date.now();
  const email = "test" + Date.now() + "@test.com";

  test("MH-0009 Should successfully register new user", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill(userName);
    await page.getByRole("textbox", { name: "Email" }).fill(email);
    await page.getByRole("textbox", { name: "Password" }).fill("password");
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
  });

  test("MH-0010 Should not register with invalid email format", async ({
    page,
  }) => {
    await page.getByRole("textbox", { name: "Username" }).fill(userName);
    await page.getByRole("textbox", { name: "Email" }).fill("email");
    await page.getByRole("textbox", { name: "Password" }).fill("password");
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByText("email is invalid")).toBeVisible();
  });

  test("MH-0011 Should not register with already registered email", async ({
    page,
  }) => {
    await page.getByRole("textbox", { name: "Username" }).fill(userName);
    await page.getByRole("textbox", { name: "Email" }).fill("test@test.com");
    await page.getByRole("textbox", { name: "Password" }).fill("password");
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByText("email is already taken")).toBeVisible();
  });
});
