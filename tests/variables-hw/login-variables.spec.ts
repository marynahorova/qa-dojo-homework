import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const baseURL = "https://demo.learnwebdriverio.com";

test.describe("Login tests", { tag: "@regression" }, () => {
  const user = {
    userName: faker.person.firstName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  };

  test("MH-11 Should successfully login with new registered user", async ({
    page,
  }) => {
    const emailInputLocator = page.getByRole("textbox", { name: "Email" });
    const passwordInputLocator = page.getByRole("textbox", {
      name: "Password",
    });
    const signInBtnLocator = page.getByRole("button", { name: "Sign in" });
    const signUpBtnLocator = page.getByRole("button", { name: "Sign up" });
    const userNameInputLocator = page.getByRole("textbox", {
      name: "Username",
    });
    const settingsLinkLocator = page.getByRole("link", { name: "Settings" });
    const logoutBtnLocator = page.getByText("Or click here to logout.");

    await page.goto(baseURL + "/register");
    await userNameInputLocator.fill(user.userName);
    await emailInputLocator.fill(user.email);
    await passwordInputLocator.fill(user.password);
    await signUpBtnLocator.click();
    await expect(settingsLinkLocator).toBeVisible();
    await page.goto(baseURL + "/settings");
    await logoutBtnLocator.click();
    await page.goto(baseURL + "/login");
    await emailInputLocator.fill(user.email);
    await passwordInputLocator.fill(user.password);
    await signInBtnLocator.click();

    await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
  });

  test("MH-12 Should not login with empty fields", async ({ page }) => {
    const emailInputLocator = page.getByRole("textbox", { name: "Email" });
    const passwordInputLocator = page.getByRole("textbox", {
      name: "Password",
    });
    const signInBtnLocator = page.getByRole("button", { name: "Sign in" });
    const errorMessageLocator = page.locator(".error-messages");

    await page.goto(baseURL + "/login");
    await signInBtnLocator.click();
    await expect(errorMessageLocator).toContainText("email can't be blank");
  });

  test("MH-13 Should not login with empty password", async ({ page }) => {
    const emailInputLocator = page.getByRole("textbox", { name: "Email" });
    const signInBtnLocator = page.getByRole("button", { name: "Sign in" });
    const errorMessageLocator = page.locator(".error-messages");

    await page.goto(baseURL + "/login");
    await emailInputLocator.fill(user.email);
    await signInBtnLocator.click();
    await expect(errorMessageLocator).toContainText("password can't be blank");
  });
});
