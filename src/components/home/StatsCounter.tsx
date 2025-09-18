import React from "react"

const stats = [
  { label: "服务企业", value: 120 },
  { label: "成功案例", value: 320 },
  { label: "平均提效", value: 65, suffix: "%" },
  { label: "覆盖行业", value: 18 },
]

export default function StatsCounter() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_12px_rgba(124,58,237,0.35)]">
                {s.value}
                {s.suffix ?? ""}
              </div>
              <div className="text-xs md:text-sm text-slate-300/90 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}