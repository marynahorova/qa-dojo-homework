import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const baseURL = "https://demoqa.com";

test.describe("Form and UI component tests", { tag: "@regression" }, () => {
  let name: string;
  let email: string;
  let currentAddress: string;
  let permanentAddress: string;

  let userNameInputLocator;
  let userEmailInputLocator;
  let currentAddressTextareaLocator;
  let permanentAddressTextareaLocator;
  let submitBtnLocator;
  let outputSectionLocator;
  let nameResultLocator;
  let emailResultLocator;
  let currentAddressResultLocator;
  let permanentAddressResultLocator;

  let yesRadioLocator;
  let impressiveRadioLocator;
  let successTextLocator;

  let expandHomeBtnLocator;
  let expandDesktopBtnLocator;
  let expandDocumentsBtnLocator;
  let expandDownloadsBtnLocator;
  let expandWorkspaceBtnLocator;
  let expandOfficeBtnLocator;
  let homeCheckboxLocator;
  let resultBlockLocator;

  test.beforeEach(async ({ page }) => {
    name = faker.person.firstName();
    email = faker.internet.email().toLowerCase();
    currentAddress = faker.location.streetAddress();
    permanentAddress = faker.location.streetAddress();

    userNameInputLocator = page.locator('//input[@id="userName"]');
    userEmailInputLocator = page.locator('//input[@id="userEmail"]');
    currentAddressTextareaLocator = page.locator(
      '//textarea[@id="currentAddress"]'
    );
    permanentAddressTextareaLocator = page.locator(
      '//textarea[@id="permanentAddress"]'
    );
    submitBtnLocator = page.locator('//button[@id="submit"]');
    outputSectionLocator = page.locator('//*[@id="output"]');
    nameResultLocator = page.locator('//p[@id="name"]');
    emailResultLocator = page.locator('//p[@id="email"]');
    currentAddressResultLocator = page.locator('//p[@id="currentAddress"]');
    permanentAddressResultLocator = page.locator('//p[@id="permanentAddress"]');

    yesRadioLocator = page.locator("//input[@id='yesRadio']");
    impressiveRadioLocator = page.locator("//input[@id='impressiveRadio']");
    successTextLocator = page.locator("//*[@class='text-success']");

    expandHomeBtnLocator = page.locator(
      "//label[@for='tree-node-home']/preceding-sibling::button"
    );
    expandDesktopBtnLocator = page.locator(
      "//label[@for='tree-node-desktop']/preceding-sibling::button"
    );
    expandDocumentsBtnLocator = page.locator(
      "//label[@for='tree-node-documents']/preceding-sibling::button"
    );
    expandDownloadsBtnLocator = page.locator(
      "//label[@for='tree-node-downloads']/preceding-sibling::button"
    );
    expandWorkspaceBtnLocator = page.locator(
      "//label[@for='tree-node-workspace']/preceding-sibling::button"
    );
    expandOfficeBtnLocator = page.locator(
      "//label[@for='tree-node-office']/preceding-sibling::button"
    );
    homeCheckboxLocator = page.locator(
      "//label[@for='tree-node-home']/span[@class='rct-checkbox']"
    );
    resultBlockLocator = page.locator("//*[@id='result']");
  });

  test("MH-17 Should submit form", async ({ page }) => {
    await page.goto(baseURL + "/text-box");

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
    await page.goto(baseURL + "/radio-button");
    await yesRadioLocator.check({ force: true });
    await expect(successTextLocator).toContainText("Yes");
    await impressiveRadioLocator.check({ force: true });
    await expect(successTextLocator).toContainText("Impressive");
  });

  test("MH-19 Should select all checkboxes", async ({ page }) => {
    await page.goto(baseURL + "/checkbox");
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
