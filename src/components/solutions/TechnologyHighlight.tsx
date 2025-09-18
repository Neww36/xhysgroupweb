import { Cpu, Network, Plug, Atom } from "lucide-react"
import React from "react"

export type Highlight = {
  icon?: React.ReactNode
  title: string
  description: string
}

export function TechnologyHighlight({
  id = "tech",
  title = "技术亮点",
  subtitle = "我们的底层技术架构保障性能、稳定与可扩展性",
  items = [
    { icon: <Atom className="h-5 w-5" />, title: "多模态模型", description: "文本、语音、视频多模态协同，支持视频理解与生成。" },
    { icon: <Cpu className="h-5 w-5" />, title: "边缘计算", description: "就近计算降低时延，直播互动毫秒级响应。" },
    { icon: <Network className="h-5 w-5" />, title: "联邦学习", description: "数据不出域的协同学习，兼顾隐私与效果。" },
    { icon: <Plug className="h-5 w-5" />, title: "API 集成", description: "开放 API/SDK 便于业务快速适配与扩展。" },
  ],
}: {
  id?: string
  title?: string
  subtitle?: string
  items?: Highlight[]
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-8">
          <h2 id={`${id}-title`} className="text-2xl md:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-white/70 max-w-3xl">{subtitle}</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <article key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
              <div className="flex items-start gap-3">
                <div className="shrink-0 rounded-lg bg-white/10 p-2 text-white/90" aria-hidden>
                  {it.icon ?? <Atom className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">{it.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{it.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologyHighlight