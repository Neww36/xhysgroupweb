import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  // 为避免并发带来的样式/HMR抖动，串行执行
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3004',
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light',
    timezoneId: 'Asia/Shanghai',
    locale: 'zh-CN',
    contextOptions: { reducedMotion: 'reduce' },
  },
  webServer: {
    // 使用生产构建与启动，避免 dev HMR 导致的非确定性
    command: 'npx next build && npx next start -p 3004',
    port: 3004,
    reuseExistingServer: !process.env.CI,
    timeout: 2 * 60 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});