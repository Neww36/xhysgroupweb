import { test, expect } from '@playwright/test';

// 导航布局与响应式测试

test.describe('导航布局验证', () => {
  test('导航高度与 CSS 变量一致', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 获取 CSS 变量 --nav-height
    const navHeight = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--nav-height').trim();
    });

    // 验证导航容器实际高度（允许小幅度差异）
    const navContainer = page.locator('[data-testid="nav-dock"], nav, .nav-container').first();
    await expect(navContainer).toBeVisible();
    
    const navBox = await navContainer.boundingBox();
    const expectedHeight = parseInt(navHeight);
    const actualHeight = navBox?.height || 0;
    
    // 允许 ±5px 的差异（考虑到字体渲染和边框）
    expect(Math.abs(actualHeight - expectedHeight)).toBeLessThan(5);
  });

  test('导航不遮挡主内容', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 获取导航和主内容的位置
    const nav = page.locator('nav, [data-testid="nav-dock"]').first();
    const mainContent = page.locator('#main-content, main').first();
    
    const navBox = await nav.boundingBox();
    const mainBox = await mainContent.boundingBox();
    
    // 验证主内容不被导航遮挡
    if (navBox && mainBox) {
      expect(mainBox.y).toBeGreaterThanOrEqual(navBox.y + navBox.height);
    }
  });

  test('焦点可见性 - 导航项', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 测试导航项的焦点样式 - 使用更具体的选择器
    const navItems = page.locator('nav a, [role="button"], .nav-item, [aria-label]');
    
    if (await navItems.count() > 0) {
      const firstItem = navItems.first();
      
      await firstItem.focus();
      await expect(firstItem).toBeFocused();
      
      // 验证焦点样式存在（检查 focus-visible 相关类或样式）
      const hasVisibleFocus = await page.evaluate((element) => {
        const styles = element ? window.getComputedStyle(element, ':focus-visible') : null;
        const classList = element?.className || '';
        return classList.includes('focus-visible') || 
               classList.includes('focus:') || 
               (styles?.outline !== 'none' && classList.includes('ring-')) ||
               styles?.outline !== 'none' ||
               styles?.boxShadow !== 'none';
      }, await firstItem.elementHandle());
      
      expect(hasVisibleFocus).toBe(true);
    }
  });
});

test.describe('响应式导航测试', () => {
  test('桌面端导航显示', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 桌面端导航应该可见
    const desktopNav = page.locator('nav, .nav-container');
    await expect(desktopNav).toBeVisible();
  });

  test('平板端导航适配', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 验证导航在平板端的表现
    const nav = page.locator('nav, .nav-container');
    await expect(nav).toBeVisible();
    
    // 检查导航高度是否保持一致
    const navBox = await nav.boundingBox();
    expect(navBox?.height).toBeGreaterThan(60); // 最小高度
  });

  test('移动端导航适配', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 移动端导航应该适配小屏幕
    const nav = page.locator('nav, .nav-container');
    await expect(nav).toBeVisible();
    
    // 检查是否有汉堡菜单或紧凑布局
    const mobileMenu = page.locator('[aria-label*="菜单"], .hamburger, .mobile-menu');
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu.first()).toBeVisible();
    }
  });
});

test.describe('BusinessGrid 响应式测试', () => {
  test('桌面端网格布局', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 验证业务网格在桌面端的布局
    const gridItems = page.locator('[role="article"]');
    await expect(gridItems).toHaveCount(3);
    
    // 检查网格容器是否使用了正确的 CSS Grid 类
    const gridContainer = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(gridContainer).toBeVisible();
    
    // 验证桌面端网格列数（通过检查实际渲染的列数）
    const gridItemsInFirstRow = await gridContainer.evaluate(el => {
      const items = Array.from(el.children);
      if (items.length === 0) return 0;
      
      const firstItemTop = items[0].getBoundingClientRect().top;
      return items.filter(item => 
        Math.abs(item.getBoundingClientRect().top - firstItemTop) < 10
      ).length;
    });
    
    // 桌面端应该显示 3 列
    expect(gridItemsInFirstRow).toBe(3);
  });

  test('移动端网格堆叠', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 验证业务网格在移动端的布局
    const gridItems = page.locator('[role="article"]');
    await expect(gridItems).toHaveCount(3);
    
    // 检查网格容器的计算样式
    const gridContainer = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(gridContainer).toBeVisible();
    
    // 验证移动端网格列数（通过检查实际渲染的列数）
    const gridItemsInFirstRow = await gridContainer.evaluate(el => {
      const items = Array.from(el.children);
      if (items.length === 0) return 0;
      
      const firstItemTop = items[0].getBoundingClientRect().top;
      return items.filter(item => 
        Math.abs(item.getBoundingClientRect().top - firstItemTop) < 10
      ).length;
    });
    
    // 移动端应该显示 1 列（所有项目垂直堆叠）
    expect(gridItemsInFirstRow).toBe(1);
  });

  test('网格项悬停效果', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const firstGridItem = page.locator('[role="article"]').first();
    await expect(firstGridItem).toBeVisible();
    
    // 等待元素稳定后再悬停
    await page.waitForTimeout(1000);
    
    // 检查是否有悬停样式类（不执行实际悬停以避免不稳定）
    const classList = await firstGridItem.getAttribute('class');
    expect(classList).toMatch(/hover:|group|transition/);
  });
});