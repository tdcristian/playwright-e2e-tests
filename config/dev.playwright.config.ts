import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config.ts";
import { EnvConfig } from "../tests/helpers/config-fixtures.ts";
import path from 'path';

console.log("----- RUNNING TESTS IN DEV ENVIRONMENT -----");

export default defineConfig<EnvConfig>({
  ...baseConfig,
  // testDir: path.join(__dirname, '../tests'),
  testDir: path.resolve(process.cwd(), "tests"),
  use: {
    ...baseConfig.use,
    envName: "dev",
    appURL: "https://katalon-demo-cura.herokuapp.com/",
    dbConfig: {
      server: "",
      dbname: "",
      connectionString: "",
    },
  },
});
