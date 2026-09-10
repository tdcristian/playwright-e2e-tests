import { test, expect } from "@playwright/test";

test.describe("Make Appointment", () => {
  test.beforeEach("Login with valid credentials", async ({ page }) => {
    // Lunch URL and assert the page title and main header.
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");

    // Click on the "Make Appointment" link to navigate to the login page.
    // await page.getByRole("link", { name: "Make Appointment" }).click();
    // await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
    // await page.getByRole("link", { name: "Make Appointment" }).dblclick({"button": "left"});
    // await page.getByRole("link", { name: "Make Appointment" }).hover().then(() => {
    //   console.log("Hovered over the 'Make Appointment' link");
    // });
    // await page
    //   .getByRole("link", { name: "Make Appointment" })
    //   .click({ timeout: 5000 });
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.locator("#login")).toContainText(
      "Please login to make appointment.",
    );

    // Fill in the login form with valid credentials.
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Username").clear();
    await page
      .getByLabel("Username")
      .pressSequentially("John Doe", { delay: 100 });
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert that the user is successfully logged in and navigated to the "Make Appointment" page.
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should make an appointment with non-default facility", async ({
    page,
  }) => {
    // Assert default facility is "Tokyo CURA Healthcare Center"
    await expect(page.getByLabel("Facility")).toHaveValue(
      "Tokyo CURA Healthcare Center",
    );

    // Select by value, label, or index a non-default facility from the drop-down
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page
      .getByLabel("Facility")
      .selectOption({ label: "Seoul CURA Healthcare Center" });
    await page.getByLabel("Facility").selectOption({ index: 1 });

    // Assert the count of options in the facility drop-down
    await expect(page.getByLabel("Facility").locator("option")).toHaveCount(3);

    // Get all drop-down values
    // const facilityOptions = await page
    //   .getByLabel("Facility")
    //   .locator("option")
    //   .allTextContents();
    // console.log("Facility options:", facilityOptions);

    let listOfDropDownElements = await page.getByLabel("Facility").locator("option").all();
    console.log("List of drop-down elements:", listOfDropDownElements);
    let listOfOptions = [];
    for (const element of listOfDropDownElements) {
      console.log(await element.textContent());
      listOfOptions.push(await element.textContent());
    }
    console.log("List of options:", listOfOptions);
    

    // Select the "Apply for hospital readmission" checkbox
    await page.getByText("Apply for hospital readmission").click();

    // Assert that the "Medicare" checkbox is checked
    await expect(page.getByRole('radio', { name: 'Medicare' })).toBeChecked();

    // Select the "Medicaid" radio button
    await page.getByText("Medicaid").check();

    // Assert that the "Medicaid" radio button is checked
    await expect(page.getByRole('radio', { name: 'Medicaid' })).toBeChecked();
    // Assert that the "Medicare" radio button is not checked
    await expect(page.getByRole('radio', { name: 'Medicare' })).not.toBeChecked();

    // Select the visit date
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
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
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(
      page.getByRole("link", { name: "Go to Homepage" }),
    ).toBeVisible();
  });
});
