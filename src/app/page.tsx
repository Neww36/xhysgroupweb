import LogoLoop from "../components/home/LogoLoop"
import BusinessGrid from "../components/home/BusinessGrid"
import ProductHighlights from "../components/home/ProductHighlights"
import LayoutContainer from "../components/layout/LayoutContainer"
import { Button } from "../components/ui/button"
import BeamsBackground from "../components/background/BeamsBackground"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      {/* 首页背景：Beams */}
      <BeamsBackground className="fixed inset-0 -z-10" />

      {/* 头部已由全局布局提供的 GooeyNav 导航管理 */}

      <main className="row-start-2">
        {/* 原先有 h-20 spacer + mt-3 导航，现在导航贴顶，适当减小首屏上边距 */}
        <LayoutContainer as="section" className="pt-24 sm:pt-28 lg:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="gradient-text">让智能体驱动业务增长</span>
              </h1>
              <p className="text-slate-200/90 text-base sm:text-lg max-w-prose">
                杭州星炬耀森人工智能科技，专注 AI 应用定制、智能体开发与 AIGC 制作，打造可落地的增长解决方案。
              </p>
              <div className="flex gap-3">
                <Button asChild variant="ghost"><Link href="/products">了解产品</Link></Button>
                <Button asChild variant="primary"><Link href="/contact">马上咨询</Link></Button>
              </div>
            </div>
            <div className="lg:col-span-6 min-h-[200px] lg:min-h-[260px]" />
          </div>
        </LayoutContainer>

        {/* 核心业务区块 */}
        <BusinessGrid />

        {/* 两大产品亮点（about 区域） */}
        <ProductHighlights />

        {/* 关键数据统计已移除，底部由 LogoLoop 替代 */}
      </main>

      {/* 底部 Logo 循环滚动带 */}
      <footer className="row-start-3 mt-16">
        <LogoLoop
          className="mx-auto max-w-7xl px-4"
          items={[
            { src: "/window.svg", alt: "Windows" },
            { src: "/next.svg", alt: "Next.js" },
            { src: "/vercel.svg", alt: "Vercel" },
            { src: "/globe.svg", alt: "Globe" },
            { src: "/file.svg", alt: "File" },
            { src: "/globe.svg", alt: "Globe" },
            { src: "/window.svg", alt: "Windows" },
          ]}
          speed={32}
          gap={48}
          height={28}
        />
      </footer>
    </div>
  )
}