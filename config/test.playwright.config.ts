import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config.ts";
import { EnvConfig } from "../tests/helpers/config-fixtures.ts";
import path from "path";

console.log("----- RUNNING TESTS IN TEST ENVIRONMENT -----");
console.log("Current working directory: ", process.cwd());
console.log("Directory name of the current module: ", __dirname);

export default defineConfig<EnvConfig>({
  ...baseConfig,
  // testDir: path.join(__dirname, '../tests'),
  testDir: path.resolve(process.cwd(), "tests"),
  use: {
    ...baseConfig.use,
    envName: "test",
    appURL: "https://katalon-demo-cura.herokuapp.com/",
    nopCommerceWeb: "https://admin-demo.nopcommerce.com",
    apiURL: "https://reqres.in/api",
    dbConfig: {
      server: "",
      dbname: "",
      connectionString: "",
    },
  },
});
