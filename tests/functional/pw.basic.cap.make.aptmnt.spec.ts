import { test, expect } from "@playwright/test";

test.describe(
  "Make Appointment",
  { annotation: { type: "Story", description: "JIRA 1234 Make Appointment" } },
  () => {
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
      await page.getByLabel("Username").fill("John Doe");
      await page.getByLabel("Password").fill("ThisIsNotAPassword");
      await page.getByRole("button", { name: "Login" }).click();

      // Assert that the screenshot is captured after login.
      await page.screenshot({ path: "login-screenshot.png", fullPage: true });

      // Assert that the user is successfully logged in and navigated to the "Make Appointment" page.
      await expect(page.locator("h2")).toContainText("Make Appointment");
    });

    test(
      "Should make an appointment with non-default facility",
      {
        annotation: {
          type: "Bug",
          description: "JIRA 4321 Not running in Firefox",
        },
        tag: ["@smoke"]
      },
      async ({ page, browserName }) => {
        if (browserName === "firefox") {
          test.skip(true, "Not running in Firefox");
        }
        // Select from drop-down a non-default option for facility
        await page
          .getByLabel("Facility")
          .selectOption("Hongkong CURA Healthcare Center");

        // Select the "Apply for hospital readmission" checkbox
        await page.getByText("Apply for hospital readmission").click();

        // Select the "Medicaid" radio button
        await page.getByText("Medicaid").click();

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
          .fill(
            "This is a multi-line comments\ncaptured by Playwright codegen",
          );

        // Click the "Book Appointment" button
        await page.getByRole("button", { name: "Book Appointment" }).click();

        // Assert that the appointment confirmation page is displayed
        await expect(page.locator("h2")).toContainText(
          "Appointment Confirmation",
        );
        await expect(
          page.getByRole("link", { name: "Go to Homepage" }),
        ).toBeVisible();
      },
    );
  },
);
