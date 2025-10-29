import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Form and UI component tests", { tag: "@regression" }, () => {
  const name = faker.person.firstName();
  const email = faker.internet.email().toLowerCase();
  const currentAddress = faker.location.streetAddress();
  const permanentAddress = faker.location.streetAddress();

  test("MH-17 Should submit form", async ({ page }) => {
    const userNameInputLocator = page.locator('//input[@id="userName"]');
    const userEmailInputLocator = page.locator('//input[@id="userEmail"]');
    const currentAddressTextareaLocator = page.locator(
      '//textarea[@id="currentAddress"]'
    );
    const permanentAddressTextareaLocator = page.locator(
      '//textarea[@id="permanentAddress"]'
    );
    const submitBtnLocator = page.locator('//button[@id="submit"]');
    const outputSectionLocator = page.locator('//*[@id="output"]');
    const nameResultLocator = page.locator('//p[@id="name"]');
    const emailResultLocator = page.locator('//p[@id="email"]');
    const currentAddressResultLocator = page.locator(
      '//p[@id="currentAddress"]'
    );
    const permanentAddressResultLocator = page.locator(
      '//p[@id="permanentAddress"]'
    );

    await page.goto("/text-box");
    await userNameInputLocator.fill(name);
    await userEmailInputLocator.fill(email);
    await currentAddressTextareaLocator.fill(currentAddress);
    await permanentAddressTextareaLocator.fill(permanentAddress);
    await submitBtnLocator.click();
    await expect(outputSectionLocator).toBeVisible();
    await expect(nameResultLocator).toContainText(name);
    await expect(emailResultLocator).toContainText(email);
    await expect(currentAddressResultLocator).toContainText(currentAddress);
    await expect(permanentAddressResultLocator).toContainText(permanentAddress);
  });

  test("MH-18 Should select all radio buttons", async ({ page }) => {
    const yesRadioLocator = page.locator("//input[@id='yesRadio']");
    const successTextLocator = page.locator("//*[@class='text-success']");
    const impressiveRadioLocator = page.locator(
      "//input[@id='impressiveRadio']"
    );

    await page.goto("/radio-button");
    await yesRadioLocator.check({ force: true });
    await expect(successTextLocator).toContainText("Yes");
    await impressiveRadioLocator.check({ force: true });
    await expect(successTextLocator).toContainText("Impressive");
  });

  test("MH-19 Should select all checkboxes", async ({ page }) => {
    const expandHomeBtnLocator = page.locator(
      "//label[@for='tree-node-home']/preceding-sibling::button"
    );
    const expandDesktopBtnLocator = page.locator(
      "//label[@for='tree-node-desktop']/preceding-sibling::button"
    );
    const expandDocumentsBtnLocator = page.locator(
      "//label[@for='tree-node-documents']/preceding-sibling::button"
    );
    const expandDownloadsBtnLocator = page.locator(
      "//label[@for='tree-node-downloads']/preceding-sibling::button"
    );
    const expandWorkspaceBtnLocator = page.locator(
      "//label[@for='tree-node-workspace']/preceding-sibling::button"
    );
    const expandOfficeBtnLocator = page.locator(
      "//label[@for='tree-node-office']/preceding-sibling::button"
    );
    const homeCheckboxLocator = page.locator(
      "//label[@for='tree-node-home']/span[@class='rct-checkbox']"
    );
    const resultBlockLocator = page.locator("//*[@id='result']");

    await page.goto("/checkbox");
    await expandHomeBtnLocator.click();
    await expandDesktopBtnLocator.click();
    await expandDocumentsBtnLocator.click();
    await expandDownloadsBtnLocator.click();
    await expandWorkspaceBtnLocator.click();
    await expandOfficeBtnLocator.click();
    await homeCheckboxLocator.click();
    await expect(resultBlockLocator).toBeVisible();
  });
});
