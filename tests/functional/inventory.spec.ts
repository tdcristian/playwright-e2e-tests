import { test, expect } from "@playwright/test";

test.describe("Inventory Tests", () => {
  test.beforeEach("Login with valid credentials", async ({ page }) => {
    // Launch the application and navigate to the login page
    await page.goto("https://www.saucedemo.com/");

    // Login with valid credentials
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="username"]').press("Tab");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Assertion to have the correct URL
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveTitle("Swag Labs");
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("Should confirm all prices are non-zero values", async ({ page }) => {
    // Get list of products
    let productsElms = await page.locator(".inventory_item");
    // Assert we have 6 elements
    await expect(productsElms).toHaveCount(6);

    let priceArray: number[] = [];

    let totalProducts = await productsElms.count();
    for (let i = 0; i < totalProducts; i++) {
      let priceText = await productsElms
        .nth(i)
        .locator(".inventory_item_price")
        .textContent();
      let price = parseFloat(priceText?.replace("$", "") || "0");
      console.log(`Product ${i + 1} price: $${price}`);
      // Assert that all the product prices are greater than 0
      expect(price).toBeGreaterThan(0);
      priceArray.push(price);
    }
    console.log("Original product prices:", priceArray);

    let modifiedArrPrices = priceArray.map((price) =>
      parseFloat(price.toString().replace("$", "")),
    );
    console.log("Modified product prices:", modifiedArrPrices);

    let zeroOrNegativePrices = modifiedArrPrices.filter((price) => price <= 0);
    console.log("Zero or negative product prices:", zeroOrNegativePrices);
    expect(zeroOrNegativePrices.length).toBe(0);
  });

  test("1. Pick up the first product displayed on the page \n    2. Click on 'Add to Cart' 3. Proceed until checkout 4. Assert the confirmation message", async ({
    page,
  }) => {
    // Pick up the first product displayed on the page
    let firstProduct = page.locator(".inventory_item").first();
    await firstProduct.locator("button").click();

    // Proceed to the cart
    await page.locator(".shopping_cart_link").click();

    // Proceed to checkout
    await page.locator('[data-test="checkout"]').click();

    // Fill in checkout information
    await page.locator('[data-test="firstName"]').fill("John");
    await page.locator('[data-test="lastName"]').fill("Doe");
    await page.locator('[data-test="postalCode"]').fill("12345");
    await page.locator('[data-test="continue"]').click();

    // Finish checkout
    await page.locator('[data-test="finish"]').click();

    // Assert the confirmation message
    await expect(page.locator(".complete-header")).toHaveText(
      "Thank you for your order!",
    );
  });
});
