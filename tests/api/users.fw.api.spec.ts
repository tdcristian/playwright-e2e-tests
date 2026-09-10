import { test, expect, request } from "@playwright/test";
import constants from "../../data/constants.json";
import TestData from "../../data/test-data";

test.describe("Users API", () => {
  let envConfig: any;

  test.beforeEach(({ request }, testInfo) => {
    envConfig = testInfo.project.use as any;
  });

  test("Should get list of users - GET request", async ({
    request,
  }, testInfo) => {
    const response = await request.get(
      `${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.X_API_KEY,
        },
      },
    );

    expect(response.ok()).toBeTruthy();
    const users = await response.json();
    console.log("**********Users:**********\n", users.data);
    for (const user of users.data) {
      console.log(
        "First name:",
        user.first_name,
        " Last name:",
        user.last_name,
      );
    }
    expect(Array.isArray(users.data)).toBe(true);
  });

  test("Should create a user - POST request", async ({ request }, testInfo) => {
    const payload = TestData.apiUserCreation()[0];

    const response = await request.post(
      `${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.POST_USER}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.X_API_KEY,
        },
        data: payload,
      },
    );

    expect(response.ok()).toBeTruthy();
    const user = await response.json();
    expect(user.name).toBe("Morpheus");
    expect(user.job).toBe("Team Leader");
    console.log("**********Created User:**********\n", user);
  });

  test("Should update a user - PUT request", async ({ request }, testInfo) => {
    const response = await request.put(
      `${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.PUT_USER}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.X_API_KEY,
        },
        data: {
          name: "Morpheus", // name remains the same
          job: "Developer", // job updated
        },
      },
    );

    expect(response.ok()).toBeTruthy();
    const user = await response.json();
    expect(user.name).toBe("Morpheus");
    expect(user.job).toBe("Developer");
    console.log("**********Updated User:**********\n", user);
  });

  test("Should partially update a user - PATCH request", async ({
    request,
  }, testInfo) => {
    const response = await request.patch(
      `${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.PATCH_USER}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.X_API_KEY,
        },
        data: {
          name: "Morpheus",
          job: "Senior Developer", // job updated
        },
      },
    );

    expect(response.ok()).toBeTruthy();
    const user = await response.json();
    expect(user.name).toBe("Morpheus");
    expect(user.job).toBe("Senior Developer");
    console.log("**********Patched User:**********\n", user);
  });
});
