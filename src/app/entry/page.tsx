"use client"

/**
 * 背景：已改为组件库 Liquid Chrome（6A审计：src/components/background/LiquidChromeBits.tsx）
 * 布局：居中标题/标语 + 底部双CTA，背景层 absolute inset-0 -z-10，20%遮罩保证可读性
 */

import React from "react"
import LiquidChrome from "@/components/background/LiquidChrome"
import { Button } from "@/components/ui/button"

export default function EntryPage() {
  // 禁止页面滚动（进入时加锁，离开时恢复）
  React.useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverflow = document.body.style.overflow
    const prevOverscroll = (document.body.style as any).overscrollBehavior

    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    ;(document.body.style as any).overscrollBehavior = "none"

    const preventWheel = (e: WheelEvent) => {
      e.preventDefault()
    }
    window.addEventListener("wheel", preventWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", preventWheel)
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow
      ;(document.body.style as any).overscrollBehavior = prevOverscroll
    }
  }, [])

  return (
    <div className="relative h-svh w-full overflow-hidden bg-black text-neutral-100">
      {/* 组件库 Liquid Chrome 背景（6A要求） */}
      <div className="absolute inset-0 z-0 pointer-events-none h-full">
        {/* 更新为用户指定的暗色方案与交互参数 */}
        <LiquidChrome className="w-full h-full" baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive />
        <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
      </div>

      {/* 中心标题与标语：英文在上，中文在下 */}
      <main className="relative z-10 flex h-svh flex-col items-center justify-center px-6 text-center select-none">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-neutral-100">
          AstroSpark ShineGrove
        </h1>
        <h2 className="mt-3 text-base sm:text-lg md:text-xl text-neutral-200">
          星炬，耀见智能未来
        </h2>
      </main>

      {/* 底部双CTA（灰蓝渐变） */}
      <div className="fixed bottom-6 left-0 right-0 mx-auto z-20 flex w-full max-w-xl flex-col gap-3 px-6 sm:flex-row">
        <Button asChild className="w-full sm:w-1/2">
          <a
            href="https://www.xingjuai.icu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="前往公司官网"
            className="inline-flex items-center justify-center h-11 rounded-xl font-medium text-base bg-gradient-to-r from-slate-700 to-slate-900 text-neutral-100 shadow-sm ring-1 ring-white/10 hover:brightness-[1.06] hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#7C3AED]/50 active:scale-[0.98] transition-[colors,transform,shadow]"
          >
            公司官网
          </a>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-1/2">
          <a
            href="https://www.xingjuai.icu/booking"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="预约咨询"
            className="h-11 w-full text-base bg-gradient-to-r from-slate-700/70 to-slate-900/70 text-neutral-100 border border-slate-300/20 hover:bg-slate-700/60 hover:border-slate-200/30 transition-colors"
          >
            预约咨询
          </a>
        </Button>
      </div>
    </div>
  )
}