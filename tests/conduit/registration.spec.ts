import test, { expect } from "@playwright/test";
import { fa, faker } from "@faker-js/faker";

test.describe("Registration tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  const userName = faker.person.firstName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  test("MH-0009 Should successfully register new user", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill(userName);
    await page.getByRole("textbox", { name: "Email" }).fill(email);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
  });

  test("MH-0010 Should not register with invalid email format", async ({
    page,
  }) => {
    await page.getByRole("textbox", { name: "Username" }).fill(userName);
    await page.getByRole("textbox", { name: "Email" }).fill("email");
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.locator(".error-messages")).toHaveText(
      "email is invalid"
    );
  });

  test("MH-0011 Should not register with empty email", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill(userName);
    await page.getByRole("textbox", { name: "Password" }).fill("password");
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.locator(".error-messages")).toHaveText(
      "email can't be blank"
    );
  });
});
