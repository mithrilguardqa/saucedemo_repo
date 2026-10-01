export interface Account {
  username: string;
  password: string;
}

export const testAccounts: Record<string, Account> = {
  standard: {
    username: "standard_user",
    password: process.env.PASSWORD!,
  },
  locked_out: {
    username: "locked_out_user",
    password: process.env.PASSWORD!,
  },
  problem: {
    username: "problem_user",
    password: process.env.PASSWORD!,
  },
  performance_glitch: {
    username: "performance_glitch_user",
    password: process.env.PASSWORD!,
  },
};
