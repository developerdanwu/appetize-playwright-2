import { defineConfig } from '@playwright/test';
import { devices } from '@appetize/playwright';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'iPhone 14',
      use: { 
        ...devices['iPhone 14'],
        appetize: {
          token: process.env.APPETIZE_TOKEN,
          device: 'iphone14',
          osVersion: '16.2',
        }
      },
    },
    {
      name: 'Pixel 6',
      use: { 
        ...devices['Pixel 6'],
        appetize: {
          token: process.env.APPETIZE_TOKEN,
          device: 'pixel6',
          osVersion: '12.0',
        }
      },
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});