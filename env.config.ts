import { PlaywrightTestConfig } from "@playwright/test";
import { testAccounts } from "./test_data/accounts";

interface TestConfig extends PlaywrightTestConfig {
  baseUrl: string;
  accounts: typeof testAccounts;
}

const devTestConfig: TestConfig = {
  baseUrl: "https://www.saucedemo.com/",
  accounts: testAccounts,
};

const prodTestConfig: TestConfig = {
  baseUrl: "https://www.Prod.saucedemo.com/",
  accounts: testAccounts,
};

const config: TestConfig = process.env.TEST_ENV === "prod" ? prodTestConfig : devTestConfig;

export default config;
