"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// 使用本地优化后的 LogoLoop（支持 pauseOnHover、性能优化）
const LogoLoop = dynamic(() => import("./LogoLoop"), { ssr: false })

const keywords = [
  { label: "AI 应用定制", color: "#7C3AED" },
  { label: "智能体开发", color: "#00D1FF" },
  { label: "AIGC 制作", color: "#9b59b6" },
  { label: "天鸟 AI 获客", color: "#7C3AED" },
  { label: "同离 AI 直播助手", color: "#00D1FF" },
  { label: "企业级落地", color: "#38bdf8" },
  { label: "数据安全", color: "#a78bfa" },
]

export default function BottomMarquee() {
  const [velocity, setVelocity] = useState(1.2)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(max-width: 768px)")
      const apply = () => setVelocity(mq.matches ? 0.9 : 1.2)
      apply()
      mq.addEventListener("change", apply)
      return () => mq.removeEventListener("change", apply)
    }
  }, [])

  // 将关键词渲染为 SVG data URI，并映射到 LogoLoop 的 items 属性
  const items = keywords.map((k) => ({
    src:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='32'>
          <rect width='100%' height='100%' fill='black'/>
          <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                fill='white' style='font-size:14px;font-family:system-ui'>
            ${k.label}
          </text>
        </svg>`
      ),
    alt: k.label,
  }))

  return (
    <div className="relative w-full">
      <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      <div className="border-y border-white/10 bg-black/60 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <LogoLoop
            pauseOnHover={true}
            speed={velocity * 40}
            gap={48}
            height={32}
            items={items}
          />
        </div>
      </div>
    </div>
  )
}