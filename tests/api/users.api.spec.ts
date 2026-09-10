import { test, expect, request } from "@playwright/test";

test.describe("Users API", () => {
  const baseURL = "https://reqres.in/api";

  test("Should get list of users - GET request", async ({ request }) => {
    const response = await request.get(`${baseURL}/users?page=2`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres_89df44caef5f4805b7238f1a761a6475",
      },
    });

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

  test("Should create a user - POST request", async ({ request }) => {
    const response = await request.post(`${baseURL}/users`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres_89df44caef5f4805b7238f1a761a6475",
      },
      data: {
        name: "Morpheus",
        job: "Team Leader",
      },
    });

    expect(response.ok()).toBeTruthy();
    const user = await response.json();
    expect(user.name).toBe("Morpheus");
    expect(user.job).toBe("Team Leader");
    console.log("**********Created User:**********\n", user);
  });

  test("Should update a user - PUT request", async ({ request }) => {
    const response = await request.put(`${baseURL}/users/2`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres_89df44caef5f4805b7238f1a761a6475",
      },
      data: {
        name: "Morpheus",
        job: "Developer",
      },
    });

    expect(response.ok()).toBeTruthy();
    const user = await response.json();
    expect(user.name).toBe("Morpheus");
    expect(user.job).toBe("Developer");
    console.log("**********Updated User:**********\n", user);
  });

  test("Should partially update a user - PATCH request", async ({ request }) => {
    const response = await request.patch(`${baseURL}/users/2`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres_89df44caef5f4805b7238f1a761a6475",
      },
      data: {
        name: "Morpheus",
        job: "Senior Developer", // job updated
      },
    });

    expect(response.ok()).toBeTruthy();
    const user = await response.json();
    expect(user.name).toBe("Morpheus");
    expect(user.job).toBe("Senior Developer");
    console.log("**********Patched User:**********\n", user);
  });
});
