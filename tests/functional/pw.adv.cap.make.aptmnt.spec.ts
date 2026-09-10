import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach("Go to login page", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("CURA Healthcare Service");
    // Expect the main header to contain the correct text.
    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");
    // Click on the "Make Appointment" link to navigate to the login page.
    await page.getByRole("link", { name: "Make Appointment" }).click();
    // Expect the login section to contain the correct text.
    await expect(page.locator("#login")).toContainText(
      "Please login to make appointment.",
    );
  });

  test("Should login successfully", async ({ page }) => {
    // Login with valid credentials
    await page.getByLabel("Username").click({timeout: 3_000});
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert that the user is successfully logged in and navigated to the "Make Appointment" page.
    await expect(page.locator("h2")).toContainText("Make Appointment", { timeout: 3_000 });
  });

  test("Should not login successfully", async ({ page }) => {
    // Login with invalid credentials
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("Daniel");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotACorrectPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert that the user is not successfully logged in and an error message is displayed.
    await expect(page.locator(".text-danger")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
