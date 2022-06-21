import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  // Timeout
  timeout: 120000, //using a large timeout Signup page keeps on loading and playwright throws timeout error
  reporter: [
    ["junit", { outputFile: "results.xml" }],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["dot"],
  ],
  // Two retries for each test
  // retries: 2,
  workers: 4,
  use: {
    //base url
    baseURL: process.env.BASE_URL || "https://www.saucedemo.com/",
    // Browser options
    headless: true,
    // Artifacts
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    launchOptions: {
      slowMo: 100,
    },
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    {
      name: "Chrome",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "Firefox",
      use: {
        browserName: "firefox",
      },
    },
    {
      name: "WebKit",
      use: {
        browserName: "webkit",
      },
    },
  ],
};
export default config;
