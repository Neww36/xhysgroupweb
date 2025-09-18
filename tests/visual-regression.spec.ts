import { test, expect, Page } from '@playwright/test';

// 利用 baseURL + 视口 1440x900，保证与设计验收一致

const installDeterministicRuntime = async (page: Page) => {
  await page.addInitScript({
    content: `
      (function(){
        const FIXED_NOW = 1700000000000;
        const FIXED_PERF = 0;
        const FIXED_RANDOM = 0.42;
        // 固定时间与随机
        const _Date = Date;
        class FixedDate extends _Date {
          constructor(...args){
            if (args.length === 0) { super(FIXED_NOW); }
            else { super(...args as any); }
          }
          static now(){ return FIXED_NOW; }
        }
        // @ts-ignore
        window.Date = FixedDate;
        // @ts-ignore
        if (window.performance && window.performance.now) {
          // @ts-ignore
          window.performance.now = () => FIXED_PERF;
        }
        Math.random = () => FIXED_RANDOM;
        // 稳定动画帧
        let __rafId = 0;
        // @ts-ignore
        window.requestAnimationFrame = (cb) => { cb(FIXED_PERF); return ++__rafId; };
        // @ts-ignore
        window.cancelAnimationFrame = () => {};
        // 清理 Web Storage，避免跨测试状态泄露
        try { localStorage.clear(); } catch {}
        try { sessionStorage.clear(); } catch {}
      })();
    `,
  });
};

const resetClientState = async (page: Page) => {
  // 清理 cookies，确保没有跨测试的登录/主题/偏好等状态
  await page.context().clearCookies();
  // 下一个导航前已注入的 init script 会清理 Web Storage
};

const disableAnimations = async (page: Page) => {
  await page.addStyleTag({
    content: `
      *, *::before, *::after { transition: none !important; animation: none !important; }
      html { scroll-behavior: auto !important; }
      :focus { caret-color: transparent !important; }
    `,
  });
};

const waitForStableRendering = async (page: Page) => {
  // 在 dev server (HMR/WebSocket) 下，networkidle 可能永远不触发，做短超时尝试
  try {
    // @ts-ignore: playwright types allow timeout via options
    await page.waitForLoadState('networkidle', { timeout: 2000 });
  } catch {
    // 忽略 networkidle 超时
  }
  // 兜底等待完整 load 状态
  try {
    // @ts-ignore
    await page.waitForLoadState('load', { timeout: 10000 });
  } catch {
    // 若 load 已发生或因某些资源阻塞则忽略
  }
  // 等待字体加载完成，避免文字跳动
  await page.evaluate(async () => {
    // @ts-ignore
    if (document.fonts && document.fonts.ready) {
      // @ts-ignore
      await document.fonts.ready;
    }
  });
  // 小延时确保最后一帧渲染
  await page.waitForTimeout(80);
};

test.describe('视觉回归: 首页与 About 区块', () => {
  test('首页快照 1440x900', async ({ page }) => {
    await installDeterministicRuntime(page);
    await resetClientState(page);
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await disableAnimations(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await waitForStableRendering(page);
    // 等待 Dock 渲染与 Beams 背景稳定
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('home-1440x900.png', { fullPage: false, maxDiffPixelRatio: 0.02 });
  });

  test('About 区块快照 1440x900', async ({ page }) => {
    await installDeterministicRuntime(page);
    await resetClientState(page);
    await page.goto('/#about');
    await page.waitForLoadState('domcontentloaded');
    await disableAnimations(page);
    // 确保滚动定位到 #about 且渲染稳定
    const about = page.locator('#about');
    await about.scrollIntoViewIfNeeded();
    await waitForStableRendering(page);
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('about-1440x900.png', { fullPage: false, maxDiffPixelRatio: 0.02 });
  });
});