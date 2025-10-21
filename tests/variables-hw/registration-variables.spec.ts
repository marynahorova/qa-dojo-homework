import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const baseURL = "https://demo.learnwebdriverio.com";

test.describe("Registration tests", { tag: "@regression" }, () => {
  let userName;
  let email;
  let password;

  let userNameInputLocator;
  let emailInputLocator;
  let passwordInputLocator;
  let signUpBtnLocator;
  let errorMessageLocator;
  let settingsLinkLocator;

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL + "/register");

    userName = faker.person.firstName();
    email = faker.internet.email().toLowerCase();
    password = faker.internet.password();

    userNameInputLocator = page.getByRole("textbox", { name: "Username" });
    emailInputLocator = page.getByRole("textbox", { name: "Email" });
    passwordInputLocator = page.getByRole("textbox", { name: "Password" });
    signUpBtnLocator = page.getByRole("button", { name: "Sign up" });
    errorMessageLocator = page.locator(".error-messages");
    settingsLinkLocator = page.getByRole("link", { name: "Settings" });
  });

  test("MH-14 Should successfully register new user", async () => {
    await userNameInputLocator.fill(userName);
    await emailInputLocator.fill(email);
    await passwordInputLocator.fill(password);
    await signUpBtnLocator.click();
    await expect(settingsLinkLocator).toBeVisible();
  });

  test("MH-15 Should not register with invalid email format", async () => {
    await userNameInputLocator.fill(userName);
    await emailInputLocator.fill("email");
    await passwordInputLocator.fill(password);
    await signUpBtnLocator.click();
    await expect(errorMessageLocator).toHaveText("email is invalid");
  });

  test("MH-16 Should not register with empty email", async () => {
    await userNameInputLocator.fill(userName);
    await passwordInputLocator.fill(password);
    await signUpBtnLocator.click();
    await expect(errorMessageLocator).toHaveText("email can't be blank");
  });
});
