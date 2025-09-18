"use client"

import React, { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Tabs, type Tab } from "@/components/ui/tabs"
// removed: import { Sheet } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function ProductsPlaceholderPage() {
  const router = useRouter()
  const [tab, setTab] = useState("products")

  const tabs: Tab[] = useMemo(() => ([
    { value: "products", label: "产品", content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { t: "AI应用定制", d: "企业级AI方案与交付流程" },
          { t: "智能体开发", d: "多场景智能体架构与接入" },
          { t: "AIGC制作", d: "文本/图像/视频生成能力" },
          { t: "天鸟AI获客", d: "线索拓展与转化增长" },
          { t: "同离AI直播助手", d: "运营效率与转化提升" }
        ].map((item, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.07] transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/90">{item.t}</div>
                <div className="text-xs text-white/60 mt-1">{item.d}</div>
              </div>
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-sky-500 opacity-80" />
            </div>
          </div>
        ))}
      </div>
    )},
    { value: "features", label: "特性", content: (
      <ul className="list-disc pl-5 space-y-2 text-white/80">
        <li>端到端交付：需求梳理、原型、开发、上线与运维</li>
        <li>可插拔智能体：文本/图像/音视频多模态能力</li>
        <li>安全合规：数据最小化、脱敏与严控权限</li>
        <li>性能优化：懒加载、按需加载与缓存策略</li>
      </ul>
    )},
    { value: "demo", label: "预约演示", content: (
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
        <div>
          <div className="text-white/90">一对一演示与方案沟通</div>
          <div className="text-xs text-white/60 mt-1">提交信息后，我们将在1个工作日内联系你</div>
        </div>
        <Button asChild>
          <Link href="/contact">预约演示</Link>
        </Button>
      </div>
    )},
  ]), [])

  return (
    <main className="relative min-h-svh w-full bg-black text-white">
      {/* 背景：暗色+电紫霓蓝辐射渐变 */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(76,29,149,0.18),rgba(2,6,23,0.92)_60%)]" />

      {/* 居中容器 */}
      <section className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 py-12">
        {/* 玻璃拟态卡片 */}
        <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_50px_-12px_rgba(99,102,241,0.45)]">
          {/* 顶部电光渐变分割线 */}
          <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500" />

          <div className="p-8 md:p-10">
            <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
              产品能力
            </h1>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
              我们正在完善以下模块：<span className="text-white/90">AI应用定制开发</span>、<span className="text-white/90">智能体开发</span>、<span className="text-white/90">AIGC制作</span>、<span className="text-white/90">天鸟AI获客</span>、<span className="text-white/90">同离AI直播运营助手</span>。
            </p>

            <div className="mt-6">
              <Tabs tabs={tabs} value={tab} onValueChange={setTab} />
            </div>

            {/* 按钮区 */}
            <div className="mt-7 md:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Button
                asChild
                className={[
                  "inline-flex items-center justify-center",
                  "px-6 md:px-8 py-3 md:py-3.5 rounded-xl",
                  "bg-gradient-to-r from-violet-600 to-sky-500 text-white",
                  "shadow-[0_0_28px_-8px_rgba(124,58,237,0.65)]",
                  "transition-[transform,filter] duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#7C3AED]/50",
                ].join(" ")}
              >
                <Link href="/" aria-label="返回首页" title="返回首页">返回首页</Link>
              </Button>

              <Button asChild variant="outline" className="text-white/90">
                <Link href="/contact" aria-label="咨询我们" title="咨询我们">咨询我们</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}