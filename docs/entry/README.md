# Entry 页面接入指南（Galaxy 背景 + 标题标语 + 底部双CTA）

本页记录 /entry 使用来自组件库 react-bits 的 Galaxy 作为初始界面背景，包含来源与审计信息、引入方式以及参数说明。

引用审计（6A）
- 来源组件：react-bits/src/ts-tailwind/Backgrounds/Galaxy/Galaxy.tsx
- 本地封装：src/components/background/GalaxyBits.tsx（保留 API，并在文件头部标注 Source）
- 页面引用：src/app/entry/page.tsx
  - import GalaxyBits from "@/components/background/GalaxyBits"
  - {/* 组件库 Galaxy（react-bits 源码直引封装版本） */}

引入方式（别名）
```tsx
import GalaxyBits from "@/components/background/GalaxyBits"

<div className="absolute inset-0 -z-10">
  <GalaxyBits
    mouseRepulsion
    mouseInteraction
    density={1.5}
    glowIntensity={0.5}
    saturation={0.8}
    hueShift={240}
  />
  <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" aria-hidden="true" />
</div>
```

参数说明（与组件库一致）
- focal, rotation, starSpeed, density, hueShift, speed
- mouseInteraction, mouseRepulsion, repulsionStrength, autoCenterRepulsion
- glowIntensity, saturation, twinkleIntensity, rotationSpeed, transparent
- disableAnimation

视觉与交互规范
- 主色：黑；辅色：灰蓝；CTA 统一为灰蓝渐变（from-slate-600 → to-slate-800）
- 背景遮罩：bg-black/30，保证文字对比度和层次
- CTA 可达性：按钮有 aria-label，hover 有视觉反馈

兼容性提示
- 组件内部使用 OGL；若个别设备出现黑屏，可将 uResolution 的 Color 初始化与 resize 时更新统一替换为 Float32Array 版本（当前已保持组件库原写法，按需微调）。