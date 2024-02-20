import { ConfigManager } from './settings/index';
import { LaunchOptions } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';

const browserOptions: LaunchOptions = {
  slowMo: 100, //Delay ms for each step
  headless: process.env.headless === 'true' || false,
  args: [],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};
const pwConfig: PlaywrightTestConfig = {
  use: {
    testIdAttribute: 'data-testid',
  },
  expect: {
    timeout: 90 * 1000,
  },
};

export const config = {
  browser: process.env.BROWSER || 'webkit',
  pwConfig,
  browserOptions,
  viewport: null,
  BASE_URL: ConfigManager.configs.web.url,
  IMG_THRESHOLD: { threshold: 0.4 },
};
