import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Coffe cart tests", { tag: "@regression" }, () => {
  const userName = faker.person.firstName();
  const email = faker.internet.email();

  let espressoLocator;
  let appPageLocator;
  let espressoMacchiatoLocator;
  let cappuccinoLocator;
  let cartPageLocator;
  let cartLinkLocator;
  let checkoutLocator;
  let nameInputLocator;
  let emailInputLocator;
  let promoCheckboxLocator;
  let submitBtnLocator;
  let yesBtnLocator;
  let noBtnLocator;
  let addEspressoBtnLocator;
  let removeEspressoBtnLocator;
  let listLocator;
  let removeAllEspressoLocator;
  let paragraphLocator;

  test.beforeEach(async ({ page }) => {
    await page.goto("");

    espressoLocator = page.locator('[data-test="Espresso"]');
    appPageLocator = page.locator("#app");
    espressoMacchiatoLocator = page.locator('[data-test="Espresso_Macchiato"]');
    cappuccinoLocator = page.locator('[data-test="Cappuccino"]');
    cartPageLocator = page.getByLabel("Cart page");
    cartLinkLocator = page.getByRole("link", { name: "Cart page" });
    checkoutLocator = page.locator('[data-test="checkout"]');
    nameInputLocator = page.getByRole("textbox", { name: "Name" });
    emailInputLocator = page.getByRole("textbox", { name: "Email" });
    promoCheckboxLocator = page.getByRole("checkbox", {
      name: "Promotion checkbox",
    });
    submitBtnLocator = page.getByRole("button", { name: "Submit" });
    yesBtnLocator = page.getByRole("button", { name: "Yes, of course!" });
    noBtnLocator = page.getByRole("button", { name: "Nah, I'll skip." });
    addEspressoBtnLocator = page.getByRole("button", {
      name: "Add one Espresso",
    });
    removeEspressoBtnLocator = page.getByRole("button", {
      name: "Remove one Espresso",
    });
    listLocator = page.locator(".list");
    removeAllEspressoLocator = page.getByRole("button", {
      name: "Remove all Espresso",
    });
    paragraphLocator = page.getByRole("paragraph");
  });

  test("MH-6 Should order an Espresso", async ({ page }) => {
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
    await espressoLocator.click();
    await espressoMacchiatoLocator.click();
    await cappuccinoLocator.click();
    await noBtnLocator.click();
    await expect(cartPageLocator).toContainText("cart (3)");
  });

  test("MH-9 Should update item quantity in cart", async ({ page }) => {
    await espressoLocator.click();
    await cartLinkLocator.click();
    await expect(listLocator).toContainText("$10.00 x 1");
    await addEspressoBtnLocator.click();
    await expect(listLocator).toContainText("$10.00 x 2");
    await removeEspressoBtnLocator.click();
    await expect(listLocator).toContainText("$10.00 x 1");
  });

  test("MH-10 Should remove item from cart", async ({ page }) => {
    await espressoLocator.click();
    await cartPageLocator.click();
    await removeAllEspressoLocator.click();
    await expect(paragraphLocator).toContainText("No coffee, go add some.");
  });
});
