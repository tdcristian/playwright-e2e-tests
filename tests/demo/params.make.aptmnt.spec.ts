import { test, expect } from "@playwright/test";
import TestData from "../../data/test-data.js";

const makeApptTestData = TestData.makeAppointmentTestData();

// Access the data
for (const appData of makeApptTestData) {
  test.describe("Make Appointment", () => {
    test.beforeEach("Login with valid credentials", async ({ page }) => {
      // Lunch URL and assert the page title and main header.
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await expect(page).toHaveTitle("CURA Healthcare Service");
      await expect(page.locator("h1")).toContainText("CURA Healthcare Service");

      // Click on the "Make Appointment" link to navigate to the login page.
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await expect(page.locator("#login")).toContainText(
        "Please login to make appointment.",
      );

      // Fill in the login form with valid credentials.
      await page.getByLabel("Username").fill(process.env.TEST_USER_NAME);
      await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);
      await page.getByRole("button", { name: "Login" }).click();

      // Get login cookies
      const cookies = await page.context().cookies();
      console.log("Cookies: ", cookies);
      process.env.TEST_COOKIES = JSON.stringify(cookies);

      // Assert that the user is successfully logged in and navigated to the "Make Appointment" page.
      await expect(page.locator("h2")).toContainText("Make Appointment");
    });

    test(`${appData.testId} - Should make an appointment with non-default facility`, async ({
      page,
    }, testInfo) => {
      // console.log(`Current config: \n${JSON.stringify(testInfo.config)}`);

      // Access the login cookies
      console.log("=>> Access Login Cookies inside test: ", process.env.TEST_COOKIES);

      // Select drop-down option for facility
      await page
        .getByLabel("Facility")
        .selectOption(appData.facility);

      // Select the "Apply for hospital readmission" checkbox
      await page.getByText("Apply for hospital readmission").click();

      // Select the "Medicaid" radio button
      await page.getByText(appData.hcp).click();

      // Select the visit date
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .click();
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .fill("05/10/2027");
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .press("Enter");

      // Fill in the comment section
      await page.getByRole("textbox", { name: "Comment" }).click();
      await page
        .getByRole("textbox", { name: "Comment" })
        .fill("This is a multi-line comments\ncaptured by Playwright codegen");

      // Click the "Book Appointment" button
      await page.getByRole("button", { name: "Book Appointment" }).click();

      // Assert that the appointment confirmation page is displayed
      await expect(page.locator("h2")).toContainText(
        "Appointment Confirmation",
      );
      await expect(
        page.getByRole("link", { name: "Go to Homepage" }),
      ).toBeVisible();
    });
  });
}
