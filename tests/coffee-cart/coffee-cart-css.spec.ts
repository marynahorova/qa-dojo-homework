import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test("MH-0001 Should order an Espresso", async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator("input#name").fill("Maryna");
  await page.locator("input#email").fill("test@test.com");
  await page.locator('[aria-label="Promotion checkbox"]').check();
  await page.locator("button#submit-payment").click();
  await expect(page.locator("#app")).toContainText(
    "Thanks for your purchase. Please check your email for payment."
  );
});

test("MH-0002 Should add discounted Mocha after adding 3 items when accepted", async ({
  page,
}) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator("#app")).toContainText(
    "It's your lucky day! Get an extra cup of Mocha for $4."
  );
  await page.locator(".yes").click();
  await expect(page.locator('[aria-label="Cart page"]')).toContainText(
    "cart (4)"
  );
  await page.locator('[aria-label="Cart page"]').click();
  await expect(page.locator(".list")).toContainText("(Discounted) Mocha");
  await expect(page.locator(".list")).toContainText("Cappuccino");
  await expect(page.locator(".list")).toContainText("Espresso");
  await expect(page.locator(".list")).toContainText("Espresso Macchiato");
});

test("MH-0003 Should skip discounted Mocha after adding 3 items", async ({
  page,
}) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.getByRole("button", { name: "Nah, I'll skip." }).click();
  await expect(page.locator('[aria-label="Cart page"]')).toContainText(
    "cart (3)"
  );
});

test("MH-0004 Should update item quantity in cart", async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[aria-label="Cart page"]').click();
  await expect(page.locator("#app")).toContainText("$10.00 x 1");
  await page.getByRole("button", { name: "Add one Espresso" }).click();
  await expect(page.locator("#app")).toContainText("$10.00 x 2");
  await page.getByRole("button", { name: "Remove one Espresso" }).click();
  await expect(page.locator("#app")).toContainText("$10.00 x 1");
});

test("MH-0005 Should remove item from cart", async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[aria-label="Cart page"]').click();
  await page.locator(".delete").click();
  await expect(page.locator(".list")).toContainText("No coffee, go add some.");
});
