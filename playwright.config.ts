/// <reference types="node" />
// import process from 'process';
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
   testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ['html'], // keep the built-in HTML report
    ['allure-playwright', {
      detail: true,                    // include steps
      outputFolder: 'allure-results',  // raw results written here
      suiteTitle: false
    }],
  ],

  use: {
    trace: 'on-first-retry',
    // (Optional) enable these for richer Allure artifacts:
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },


  /* Configure projects for major browsers */
  projects: [
    
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],

  
});