import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const password = process.env.PASSWORD!;

export const testAccounts = {
  standardUser: {
    username: "standard_user",
    password,
  },
  lockedUser: {
    username: "locked_out_user",
    password,
  },
  problemUser: {
    username: "problem_user",
    password,
  },
  performanceGlitchUser: {
    username: "performance_glitch_user",
    password,
  },
} as const;

const baseUrls = {
  dev: "https://www.saucedemo.com/",
  prod: "https://www.prod.saucedemo.com/",
} as const;

const environment = process.env.TEST_ENV === "prod" ? "prod" : "dev";

const config = {
  baseUrl: baseUrls[environment],
  ...testAccounts,
};

export default config;
