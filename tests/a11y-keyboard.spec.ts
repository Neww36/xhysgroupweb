import { test, expect } from '@playwright/test';

// 键盘可达性与 ARIA 行为用例

test.describe('可访问性: 锚点导航与键盘', () => {
  test('Skip Link 可聚焦并跳转主内容', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 直接聚焦 Skip Link（更稳定，避免 Tab 顺序受环境影响）
    const skipLink = page.locator('a[href="#main-content"]');
    await skipLink.focus();

    // 检查 Skip Link 可见且已获得焦点
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toBeFocused();

    // Enter 激活后检查 URL hash（部分浏览器不会自动将焦点置于目标）
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main-content/);
  });

  test('Dock 导航 Enter/Space 触发 #about，aria-current=page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 使用 aria-label 定位内层元素（NavDock 中的图标包裹 span）
    const aboutControl = page.getByLabel('关于我们');
    await expect(aboutControl).toBeVisible();

    // 键盘触发（先聚焦，再按下 Space）
    await aboutControl.focus();
    await page.keyboard.press('Space');

    // 等待 hash 与滚动完成
    await page.waitForTimeout(300);

    // 校验 URL hash
    await expect(page).toHaveURL(/#about/);

    // aria-current 断言：在 NavDock 的可点击控件上
    await expect(aboutControl).toHaveAttribute('aria-current', /^(page|true)$/);

    // #about 节点可见
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
  });
});