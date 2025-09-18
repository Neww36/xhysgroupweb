import Image from "next/image"
import React from "react"

export type CaseItem = {
  logoSrc: string
  alt: string
  client: string
  industry: string
  challenge: string
  solution: string
  result: string
}

export function CustomerCaseStudies({
  id = "cases",
  title = "客户案例",
  subtitle = "来自不同行业的客户通过我们的 AI 方案实现增长与效率提升",
  items = [
    {
      logoSrc: "/vercel.svg",
      alt: "Vercel",
      client: "VX 科技",
      industry: "SaaS",
      challenge: "线索转化低、内容产能不足",
      solution: "接入 AI 获客系统，自动化内容投放与 AB 实验",
      result: "获客成本降低 30%，转化率提升 22%",
    },
    {
      logoSrc: "/next.svg",
      alt: "Next.js",
      client: "星创传媒",
      industry: "直播电商",
      challenge: "直播互动效率低，人工成本高",
      solution: "部署 AI 直播代运营助手，支持多平台协同",
      result: "直播效率提升 45%，GMV 增长 28%",
    },
    {
      logoSrc: "/globe.svg",
      alt: "Globe",
      client: "远航教育",
      industry: "在线教育",
      challenge: "课程营销内容产出慢",
      solution: "AIGC 视频智能体生成课程短视频与互动内容",
      result: "内容产能提升 3x，用户留存提升 18%",
    },
  ],
}: {
  id?: string
  title?: string
  subtitle?: string
  items?: CaseItem[]
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-8">
          <h2 id={`${id}-title`} className="text-2xl md:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-white/70 max-w-3xl">{subtitle}</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <article key={i} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <Image src={it.logoSrc} alt={`${it.alt} logo`} width={28} height={28} />
                <div className="text-sm text-white/80">{it.client} · {it.industry}</div>
              </div>
              <dl className="mt-3 space-y-1 text-sm">
                <div className="flex gap-2"><dt className="text-white/50 w-16">挑战</dt><dd className="text-white/85 flex-1">{it.challenge}</dd></div>
                <div className="flex gap-2"><dt className="text-white/50 w-16">方案</dt><dd className="text-white/85 flex-1">{it.solution}</dd></div>
                <div className="flex gap-2"><dt className="text-white/50 w-16">收益</dt><dd className="text-emerald-300 flex-1">{it.result}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomerCaseStudies