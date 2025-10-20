import { fa, faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";

test("MH-17 Should submit form", { tag: "@regression" }, async ({ page }) => {
  const name = faker.person.firstName();
  const email = faker.internet.email();
  const currentAddress = faker.location.streetAddress();
  const permanentAddress = faker.location.streetAddress();

  await page.goto("/text-box");
  await page.locator('//input[@id="userName"]').fill(name);
  await page.locator('//input[@id="userEmail"]').fill(email);
  await page.locator('//textarea[@id="currentAddress"]').fill(currentAddress);
  await page
    .locator('//textarea[@id="permanentAddress"]')
    .fill(permanentAddress);
  await page.locator('//button[@id="submit"]').click();
  await expect(page.locator('//*[@id="output"]')).toBeVisible();

  await expect(page.locator('//p[@id="name"]')).toContainText(name);
  await expect(page.locator('//p[@id="email"]')).toContainText(email);
  await expect(page.locator('//p[@id="currentAddress"]')).toContainText(
    currentAddress
  );
  await expect(page.locator('//p[@id="permanentAddress"]')).toContainText(
    permanentAddress
  );
});

test(
  "MH-18 Should select all radio buttons",
  { tag: "@regression" },
  async ({ page }) => {
    await page.goto("/radio-button");
    await page.locator("//input[@id='yesRadio']").check({ force: true });
    await expect(page.locator("//*[@class='text-success']")).toContainText(
      "Yes"
    );
    await page.locator("//input[@id='impressiveRadio']").check({ force: true });
    await expect(page.locator("//*[@class='text-success']")).toContainText(
      "Impressive"
    );
  }
);

test(
  "MH-19 Should select all checkboxes",
  { tag: "@regression" },
  async ({ page }) => {
    await page.goto("/checkbox");
    await page
      .locator("//label[@for='tree-node-home']/preceding-sibling::button")
      .click();
    await page
      .locator("//label[@for='tree-node-desktop']/preceding-sibling::button")
      .click();
    await page
      .locator("//label[@for='tree-node-documents']/preceding-sibling::button")
      .click();
    await page
      .locator("//label[@for='tree-node-downloads']/preceding-sibling::button")
      .click();
    await page
      .locator("//label[@for='tree-node-workspace']/preceding-sibling::button")
      .click();
    await page
      .locator("//label[@for='tree-node-office']/preceding-sibling::button")
      .click();
    await page
      .locator("//label[@for='tree-node-home']/span[@class='rct-checkbox']")
      .click();
    await expect(page.locator("//*[@id='result'])")).toBeVisible();
  }
);
