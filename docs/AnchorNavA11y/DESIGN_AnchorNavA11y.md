# DESIGN_AnchorNavA11y

- 版本: v1.0
- 阶段: 6A-Stage2 Architect / 第一步：系统分层设计

## 1. 背景与目标

- 为首页内的锚点导航（如"关于我们" -> `/#about`）提供平滑滚动、当前项高亮、
  可访问性（aria-current、Skip Link、焦点管理）与键盘可达性（Enter/Space 触发）。
- 尊重用户的减少动态偏好（prefers-reduced-motion）。
- 与现有 Next.js App Router 架构、Tailwind 样式体系保持一致，尽量不引入新依赖。

不在本次范围：路由结构重构、全站内容信息架构调整、多语言与服务端渲染改造等。

## 2. 现状与关键位置

- 导航组件：`src/components/nav/NavDock.tsx`（含"关于我们"链接 `"/#about"`）
- 目标区块：`src/components/home/ProductHighlights.tsx`（包含 `<section id="about">`）
- 布局与 Skip Link：`src/app/layout.tsx`（已有"Skip to content"）
- 全局样式：`src/app/globals.css`（已加入 `html { scroll-behavior: smooth; }`
  与 reduced-motion 兜底）

## 3. 整体架构图（Mermaid）

```mermaid
flowchart TD
  A[User] -->|Click/Key(Enter,Space)| B[NavDock(Client)]
  B -->|Update hash| C[URL #hash]
  C -->|hashchange| D[Scroll & Focus]
  D --> E[#about Section]
  B -->|State(active)| F[aria-current]
  G[globals.css] -->|scroll-behavior + reduced-motion| D
  H[layout.tsx Skip Link] -->|快速跳转主内容| E
```

## 4. 核心组件与交互流程

基于架构图，核心交互流程包括：

1. **用户触发**：点击或键盘操作（Enter/Space）
2. **状态更新**：NavDock 组件更新 URL hash 和内部状态
3. **滚动与聚焦**：平滑滚动到目标区域并管理焦点
4. **可访问性**：更新 aria-current 属性和焦点状态

## 5. 分层设计

### 表现层（UI）

- **NavDock**：展示导航项，当前项高亮（`aria-current`），支持键盘触发
- **ProductHighlights**：承载 `#about` 区块，具备可聚焦能力（`tabIndex`）与语义标签（`aria-labelledby`）
- **layout.tsx**：包含 Skip Link 与主内容容器，保持语义结构清晰

### 行为层（Client 逻辑）

- **Hash 跟踪**：监听 `hashchange` 与初始加载，计算当前激活导航项
- **锚点点击**：阻止默认跳转，执行平滑滚动并在动画结束后将焦点移至目标区块（可聚焦）
- **键盘可达性**：`Enter`/`Space` 与点击一致行为

### 样式层（CSS/Tailwind）

- `html { scroll-behavior: smooth; }`
- `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`
- 焦点可见性（利用 Tailwind focus 样式或自定义样式，避免焦点丢失）

## 6. 模块与依赖关系

- **NavDock 依赖**：`window.location.hash`、`hashchange`、DOM 查询目标元素
- **ProductHighlights 依赖**：语义标签与 `id="about"` 的可聚焦能力
- **globals.css**：全局滚动行为与 reduced-motion 兜底
- **不新增第三方依赖**：复用现有 Tailwind、Next.js App Router 能力

## 7. 接口契约（关键片段）

- **导航项结构示例**：`{ label: string; href: string; icon?: ReactNode }`，其中 `href` 支持 `"/#about"`
- **`aria-current`**：当当前 hash 与导航项 `href` 对应时，渲染 `aria-current="page"`（或适当 token）
- **锚点点击处理**：
  - **输入**：点击或键盘事件 + `href`（形如 `/#about`）
  - **处理**：阻止默认 -> 定位目标元素 -> 平滑滚动 -> 目标元素 `focus()`
  - **兼容**：SSR 守卫（`typeof window !== 'undefined'`）、目标不存在时回退为 `location.assign(href)`

## 8. 数据流向

1. **用户点击/按键** →
2. **NavDock 更新 URL hash** →
3. **触发 hash 跟踪更新状态** →
4. **设置激活样式与 `aria-current`** →
5. **平滑滚动到目标** →
6. **焦点移交到目标区块**

## 9. 异常处理与兼容策略

- **目标元素不存在**：回退到浏览器默认跳转（保证可达性）
- **用户减少动态**：禁用平滑滚动，改为瞬时定位（由 CSS 媒体查询控制）
- **SSR 环境**：事件绑定与 `window`/`document` 访问添加守卫
- **可聚焦兜底**：为 `section#about` 增加 `tabIndex={-1}` 与 `aria-labelledby`

## 10. 质量门控与可测试性

### 行为测试

- 点击/Enter/Space 导航到 `#about`，页面滚动到位并焦点在 `#about` 或其标题上
- 当前激活项具备 `aria-current`

### 视觉测试

- 开启/关闭 reduced-motion 下滚动表现符合预期

### 自动化测试

- 截图回归：`/` 与 `/#about` 在 1440x900 下对比基线截图

## 11. 与现有架构的对齐

仅在现有组件内增强行为与可访问性，无额外运行时依赖；符合 Next.js App Router + Tailwind 的项目架构与风格
