import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Registration tests", { tag: "@regression" }, () => {
  const userName = faker.person.firstName();
  const email = faker.internet.email().toLowerCase();
  const password = faker.internet.password();
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("MH-14 Should successfully register new user", async ({ page }) => {
    const userNameInputLocator = page.getByRole("textbox", {
      name: "Username",
    });
    const emailInputLocator = page.getByRole("textbox", { name: "Email" });
    const passwordInputLocator = page.getByRole("textbox", {
      name: "Password",
    });
    const signUpBtnLocator = page.getByRole("button", { name: "Sign up" });
    const settingsLinkLocator = page.getByRole("link", { name: "Settings" });

    await userNameInputLocator.fill(userName);
    await emailInputLocator.fill(email);
    await passwordInputLocator.fill(password);
    await signUpBtnLocator.click();
    await expect(settingsLinkLocator).toBeVisible();
  });

  test("MH-15 Should not register with invalid email format", async ({
    page,
  }) => {
    const userNameInputLocator = page.getByRole("textbox", {
      name: "Username",
    });
    const emailInputLocator = page.getByRole("textbox", { name: "Email" });
    const passwordInputLocator = page.getByRole("textbox", {
      name: "Password",
    });
    const signUpBtnLocator = page.getByRole("button", { name: "Sign up" });
    const errorMessageLocator = page.locator(".error-messages");

    await userNameInputLocator.fill(userName);
    await emailInputLocator.fill("email");
    await passwordInputLocator.fill(password);
    await signUpBtnLocator.click();
    await expect(errorMessageLocator).toHaveText("email is invalid");
  });

  test("MH-16 Should not register with empty email", async ({ page }) => {
    const userNameInputLocator = page.getByRole("textbox", {
      name: "Username",
    });
    const passwordInputLocator = page.getByRole("textbox", {
      name: "Password",
    });
    const signUpBtnLocator = page.getByRole("button", { name: "Sign up" });
    const errorMessageLocator = page.locator(".error-messages");

    await userNameInputLocator.fill(userName);
    await passwordInputLocator.fill(password);
    await signUpBtnLocator.click();
    await expect(errorMessageLocator).toHaveText("email can't be blank");
  });
});
