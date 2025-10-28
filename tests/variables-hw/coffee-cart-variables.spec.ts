import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const baseURL = "https://coffee-cart.app/";

test.describe("Coffee cart tests", { tag: "@regression" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);

    const userName = faker.person.firstName();
    const email = faker.internet.email();
  });

  test("MH-6 Should order an Espresso", async ({ page }) => {
    const userName = faker.person.firstName();
    const email = faker.internet.email();
    const espressoLocator = page.locator('[data-test="Espresso"]');
    const checkoutLocator = page.locator('[data-test="checkout"]');
    const nameInputLocator = page.getByRole("textbox", { name: "Name" });
    const emailInputLocator = page.getByRole("textbox", { name: "Email" });
    const promoCheckboxLocator = page.getByRole("checkbox", {
      name: "Promotion checkbox",
    });
    const submitBtnLocator = page.getByRole("button", { name: "Submit" });
    const appPageLocator = page.locator("#app");

    await espressoLocator.click();
    await checkoutLocator.click();
    await nameInputLocator.fill(userName);
    await emailInputLocator.fill(email);
    await promoCheckboxLocator.check();
    await submitBtnLocator.click();
    await expect(appPageLocator).toContainText(
      "Thanks for your purchase. Please check your email for payment."
    );
  });

  test("MH-7 Should add discounted Mocha after adding 3 items when accepted", async ({
    page,
  }) => {
    const espressoLocator = page.locator('[data-test="Espresso"]');
    const espressoMacchiatoLocator = page.locator(
      '[data-test="Espresso_Macchiato"]'
    );
    const cartPageLocator = page.getByLabel("Cart page");
    const cappuccinoLocator = page.locator('[data-test="Cappuccino"]');
    const appPageLocator = page.locator("#app");
    const yesBtnLocator = page.getByRole("button", { name: "Yes, of course!" });
    const cartLinkLocator = page.getByRole("link", { name: "Cart page" });

    await espressoLocator.click();
    await espressoMacchiatoLocator.click();
    await cappuccinoLocator.click();
    await expect(appPageLocator).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );
    await yesBtnLocator.click();
    await expect(cartPageLocator).toContainText("cart (4)");
    await cartLinkLocator.click();
    await expect(appPageLocator).toContainText("(Discounted) Mocha");
    await expect(appPageLocator).toContainText("Cappuccino");
    await expect(appPageLocator).toContainText("Espresso");
    await expect(appPageLocator).toContainText("Espresso Macchiato");
  });

  test("MH-8 Should skip discounted Mocha after adding 3 items", async ({
    page,
  }) => {
    const espressoLocator = page.locator('[data-test="Espresso"]');
    const espressoMacchiatoLocator = page.locator(
      '[data-test="Espresso_Macchiato"]'
    );
    const cappuccinoLocator = page.locator('[data-test="Cappuccino"]');
    const noBtnLocator = page.getByRole("button", { name: "Nah, I'll skip." });
    const cartPageLocator = page.getByLabel("Cart page");

    await espressoLocator.click();
    await espressoMacchiatoLocator.click();
    await cappuccinoLocator.click();
    await noBtnLocator.click();
    await expect(cartPageLocator).toContainText("cart (3)");
  });

  test("MH-9 Should update item quantity in cart", async ({ page }) => {
    const espressoLocator = page.locator('[data-test="Espresso"]');
    const cartLinkLocator = page.getByRole("link", { name: "Cart page" });
    const listLocator = page.locator(".list");
    const addEspressoBtnLocator = page.getByRole("button", {
      name: "Add one Espresso",
    });
    const removeEspressoBtnLocator = page.getByRole("button", {
      name: "Remove one Espresso",
    });

    await espressoLocator.click();
    await cartLinkLocator.click();
    await expect(listLocator).toContainText("$10.00 x 1");
    await addEspressoBtnLocator.click();
    await expect(listLocator).toContainText("$10.00 x 2");
    await removeEspressoBtnLocator.click();
    await expect(listLocator).toContainText("$10.00 x 1");
  });

  test("MH-10 Should remove item from cart", async ({ page }) => {
    const espressoLocator = page.locator('[data-test="Espresso"]');
    const cartPageLocator = page.getByLabel("Cart page");
    const removeAllEspressoLocator = page.getByRole("button", {
      name: "Remove all Espresso",
    });
    const paragraphLocator = page.getByRole("paragraph");

    await espressoLocator.click();
    await cartPageLocator.click();
    await removeAllEspressoLocator.click();
    await expect(paragraphLocator).toContainText("No coffee, go add some.");
  });
});
