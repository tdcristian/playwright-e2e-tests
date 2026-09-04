import { test, expect } from "@playwright/test";

test("Should load homepage with correct title", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  await expect(page).toHaveTitle(/CURA Healthcare Service/);

  await expect(
    page.locator("//h1[normalize-space()='CURA Healthcare Service']"),
  ).toHaveText("CURA Healthcare Service");
});

test("Should do something", { tag: ["@smoke"] }, async ({ page }, testInfo) => {
  // Add your test steps here
  // await page.locator("//h1").click();
});

test.only("Should demo locators", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(page.locator("#login")).toContainText(
    "Please login to make appointment.",
  );
});
