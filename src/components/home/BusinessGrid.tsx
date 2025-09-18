import React from "react"
import Link from "next/link"
/* 使用库风格的玻璃拟态 + 发光边框替代 ElectricBorder 组件 */

type BizItem = {
  title: string
  desc: string
  points: string[]
  icon?: React.ReactNode
}

const items: BizItem[] = [
  {
    title: "AI 应用定制开发",
    desc: "基于业务目标与数据资产，快速交付可落地的智能应用与工作流。",
    points: ["端到端方案", "知识库/向量检索", "RAG/工具调用/流程编排"],
  },
  {
    title: "智能体开发",
    desc: "围绕多角色、多工具的 Agent 架构，构建可自治的智能体系统。",
    points: ["多智能体协同", "函数/插件体系", "观测与评估"],
  },
  {
    title: "AIGC 制作",
    desc: "文本、图像、音视频生成，助力品牌营销与创意生产自动化。",
    points: ["文案/海报/视频生成", "直播口播", "低成本高效率"],
  },
]

export default function BusinessGrid() {
  return (
    <section id="solutions" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 scroll-mt-24 md:scroll-mt-28">
      <h2 className="text-2xl md:text-3xl font-bold mb-10">
        <span className="gradient-text">核心业务</span>
      </h2>
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
        {items.map((it, idx) => {
          const Card = (
            <div className="relative rounded-2xl border border-white/12 bg-white/5 backdrop-blur-xl p-6 h-full shadow-[0_0_24px_rgba(124,58,237,0.15)] hover:shadow-[0_0_36px_rgba(0,209,255,0.18)] transition-shadow">
              <h3 className="text-xl font-semibold text-white mb-2">{it.title}</h3>
              <p className="text-slate-300/90 text-sm mb-4">{it.desc}</p>
              <ul className="space-y-2 text-sm text-slate-300/90">
                {it.points.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#00D1FF]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/contact" className="text-sm text-white/90 hover:text-white underline underline-offset-4">
                  咨询定制 →
                </Link>
              </div>
            </div>
          )
          return <div key={idx}>{Card}</div>
        })}
      </div>
    </section>
  )
}