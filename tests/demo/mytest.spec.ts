import { test, expect, devices } from "@playwright/test";
import constants from "../../data/constants.json";
import BasePage from "../page-objects/base-page.js";
import fileHelper from "../helpers/file-helper.js";

test("Should load homepage with correct title", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  await expect(page).toHaveTitle(/CURA Healthcare Service/);

  await expect(
    page.locator("//h1[normalize-space()='CURA Healthcare Service']"),
  ).toHaveText("CURA Healthcare Service");
});

test.skip(
  "Should do something",
  { tag: ["@smoke"] },
  async ({ page }, testInfo) => {
    // Add your test steps here
    // await page.locator("//h1").click();
  },
);

test("Should demo locators", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(page.locator("#login")).toContainText(
    "Please login to make appointment.",
  );
});

test("Should demo the fixture", async ({
  page,
  browserName,
  request,
}, testInfo) => {
  console.log(`Running test on browser: ${browserName}`);
  const response = await request.get(
    "https://katalon-demo-cura.herokuapp.com/",
  );
  console.log(`Response status: ${response.status()}`);
  expect(response.ok()).toBeTruthy();
  console.log(`Response body: ${await response.text()}`);
});

test("Should demo devices", async ({ page }, testInfo) => {
  console.log(`List of devices: ${Object.keys(devices).join(", ")}`);
  console.log(`Total number of devices: ${Object.keys(devices).length}`);
});

test(
  "Should demo parallel execution - 1",
  { tag: ["@demo"] },
  async ({ page }, testInfo) => {
    await page.goto("https://www.google.com");
  },
);

test(
  "Should demo parallel execution - 2",
  { tag: ["@demo"] },
  async ({ page }, testInfo) => {
    await page.goto("https://www.google.com");
  },
);

test("Should demo constant data", async ({ page }, testInfo) => {
  console.log(`Success status code: ${constants.STATUSCODE.success}`);
  console.log(`Error status code: ${constants.STATUSCODE.error}`);
  console.log(
    `Validation error status code: ${constants.STATUSCODE.validationError}`,
  );
});

test("Should demo click action", async ({ page }, testInfo) => {
  /*
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("link", { name: "Make Appointment" }).click();
*/
  // Base page action
  const basePage = new BasePage(page);
  await basePage.navigateTo("https://katalon-demo-cura.herokuapp.com/");
  await basePage.click(page.getByRole("link", { name: "Make Appointment" }));

  fileHelper.writeFile("test.txt", "Hello, world!");
  const fileContent = fileHelper.readFile("test.txt");
  console.log(`File content: ${fileContent}`);
});
