import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";

test.describe("Login tests", () => {
  const user = {
    userName: faker.person.firstName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  };

  test("MH-0006 Should successfully login with new registered user", async ({
    page,
  }) => {
    await page.goto("/register");
    await page.getByRole("textbox", { name: "Username" }).fill(user.userName);
    await page.getByRole("textbox", { name: "Email" }).fill(user.email);
    await page.getByRole("textbox", { name: "Password" }).fill(user.password);
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
    await page.goto("/settings");
    await page.getByText("Or click here to logout.").click();
    await page.goto("/login");
    await page.getByRole("textbox", { name: "Email" }).fill(user.email);
    await page.getByRole("textbox", { name: "Password" }).fill(user.password);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
  });

  test("MH-0007 Should not login with empty fields", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("email can't be blank")).toBeVisible();
  });

  test("MH-0008 Should not login with empty password", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("textbox", { name: "Email" }).fill(user.email);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("password can't be blank")).toBeVisible();
  });
});
