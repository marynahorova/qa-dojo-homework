import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test(
  "MH-6 Should order an Espresso",
  { tag: "@regression" },
  async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.getByRole("textbox", { name: "Name" }).fill("Maryna");
    await page.getByRole("textbox", { name: "Email" }).fill("test@test.com");
    await page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.locator("#app")).toContainText(
      "Thanks for your purchase. Please check your email for payment."
    );
  }
);

test(
  "MH-7 Should add discounted Mocha after adding 3 items when accepted",
  { tag: "@regression" },
  async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await expect(page.locator("#app")).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );
    await page.getByRole("button", { name: "Yes, of course!" }).click();
    await expect(page.getByLabel("Cart page")).toContainText("cart (4)");
    await page.getByRole("link", { name: "Cart page" }).click();
    await expect(page.locator("#app")).toContainText("(Discounted) Mocha");
    await expect(page.locator("#app")).toContainText("Cappuccino");
    await expect(page.locator("#app")).toContainText("Espresso");
    await expect(page.locator("#app")).toContainText("Espresso Macchiato");
  }
);

test(
  "MH-8 Should skip discounted Mocha after adding 3 items",
  { tag: "@regression" },
  async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.getByRole("button", { name: "Nah, I'll skip." }).click();
    await expect(page.getByLabel("Cart page")).toContainText("cart (3)");
  }
);

test(
  "MH-9 Should update item quantity in cart",
  { tag: "@regression" },
  async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.getByRole("link", { name: "Cart page" }).click();
    await expect(page.locator("#app")).toContainText("$10.00 x 1");
    await page.getByRole("button", { name: "Add one Espresso" }).click();
    await expect(page.locator("#app")).toContainText("$10.00 x 2");
    await page.getByRole("button", { name: "Remove one Espresso" }).click();
    await expect(page.locator("#app")).toContainText("$10.00 x 1");
  }
);

test(
  "MH-10 Should remove item from cart",
  { tag: "@regression" },
  async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.getByRole("link", { name: "Cart page" }).click();
    await page.getByRole("button", { name: "Remove all Espresso" }).click();
    await expect(page.getByRole("paragraph")).toContainText(
      "No coffee, go add some."
    );
  }
);
