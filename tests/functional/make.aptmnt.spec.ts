import { test, expect } from "@playwright/test";
import { log } from "../helpers/loggers.js";
import pwHelper from "../helpers/pw-helper.js";

test.describe("Make Appointment", () => {
  test.beforeEach("Login with valid credentials", async ({ page }, testInfo) => {

    // Lunch URL and assert the page title and main header.
    const envConfig = testInfo.project.use as any;
    await log("info", `Launching the web app on environment: ${envConfig.envName}`);

    await log("info", "Navigating to the application URL");
    // await page.goto("https://katalon-demo-cura.herokuapp.com/");
    // Get the URL from config file
    await page.goto(envConfig.appURL);
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");

    await log("info", "Asserting the page title and main header");
    // Click on the "Make Appointment" link to navigate to the login page.
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.locator("#login")).toContainText(
      "Please login to make appointment.",
    );

    // Fill in the login form with valid credentials.
    await page.getByLabel("Username").fill(process.env.TEST_USER_NAME);
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);
    await log("info", "Take screenshot of LOGIN button");
    await pwHelper.takeElementScreenshot(page.getByRole("button", { name: "Login" }), "Login-Button");
    await page.getByRole("button", { name: "Login" }).click();


    await log("info", "Taking a full-page screenshot immediately after login");
    await pwHelper.takeFullPageScreenshot(page, "Login-Page");

    // Get login cookies
    const cookies = await page.context().cookies();
    console.log("Cookies: ", cookies);
    process.env.TEST_COOKIES = JSON.stringify(cookies);

    // Assert that the user is successfully logged in and navigated to the "Make Appointment" page.
    await log("info", "Asserting successful login and navigation to the 'Make Appointment' page");
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should make an appointment with non-default facility", async ({
    page,
  }, testInfo) => {
    // console.log(`Current config: \n${JSON.stringify(testInfo.config)}`);

    // Access the login cookies
    console.log("=>> Access Login Cookies: ", process.env.TEST_COOKIES);

    await log("info", "Selecting non-default facility");
    // Select drop-down option for facility
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");

    await log("info", "Selecting the 'Apply for hospital readmission' checkbox");
    // Select the "Apply for hospital readmission" checkbox
    await page.getByText("Apply for hospital readmission").click();

    await log("info", "Selecting the 'Medicaid' radio button");
    // Select the "Medicaid" radio button
    await page.getByText("Medicaid").click();

    await log("info", "Selecting the visit date");
    // Select the visit date
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .fill("05/10/2027");
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .press("Enter");

    await log("info", "Filling in the comment section");
    // Fill in the comment section
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This is a multi-line comments\ncaptured by Playwright codegen");

    await log("info", "Clicking the 'Book Appointment' button");
    // Click the "Book Appointment" button
    await page.getByRole("button", { name: "Book Appointment" }).click();

    await log("info", "Asserting that the appointment confirmation page is displayed");
    // Assert that the appointment confirmation page is displayed
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(
      page.getByRole("link", { name: "Go to Homepage" }),
    ).toBeVisible();
  });
});
