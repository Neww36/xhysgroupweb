import React from "react"
import DomeGalleryClient from "./DomeGalleryClient"

function HighlightCard({
  title,
  subtitle,
  points,
  ctaHref,
}: {
  title: string
  subtitle: string
  points: string[]
  ctaHref: string
}) {
  return (
    <div className="relative rounded-2xl border border-white/12 bg-white/5 backdrop-blur-xl p-6 h-full shadow-[0_0_24px_rgba(124,58,237,0.15)] hover:shadow-[0_0_36px_rgba(0,209,255,0.18)] transition-shadow">
      <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
      <p className="text-slate-300/90 text-sm mb-4">{subtitle}</p>
      <ul className="space-y-2 text-sm text-slate-300/90">
        {points.map((p, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#00D1FF]" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <a
          href={ctaHref}
          className="rounded-xl px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#7C3AED] to-[#00D1FF] shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_28px_rgba(0,209,255,0.35)] transition-[box-shadow,transform] active:scale-[0.98]"
        >
          了解更多
        </a>
      </div>
    </div>
  )
}

export default function ProductHighlights() {
  return (
    <section id="about" tabIndex={-1} aria-labelledby="about-heading" className="relative mx-auto max-w-7xl px-4 pb-8 scroll-mt-24 md:scroll-mt-28">
      <h2 id="about-heading" className="text-2xl md:text-3xl font-bold mb-6">
        <span className="gradient-text">产品亮点</span>
      </h2>
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">
        <HighlightCard
          title="天鸟 AI 获客"
          subtitle="构建私域智能获客闭环，自动化线索收集与培育，助力销售增长。"
          points={["多渠道线索抓取", "意向识别与评分", "私域触达与转化", "自动化跟进与报告"]}
          ctaHref="/products"
        />
        <HighlightCard
          title="同离 AI 直播运营助手"
          subtitle="直播口播创作、运营分析与提效助手，稳定提升直播间转化。"
          points={["脚本智能生成", "多场景口播", "实时数据看板", "复盘与优化建议"]}
          ctaHref="/products"
        />
      </div>

      {/* Dome Gallery 集成到关于我们区域 */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2">
        <div className="aspect-video w-full">
          <DomeGalleryClient />
        </div>
      </div>
    </section>
  )
}