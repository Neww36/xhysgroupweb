"use client"
import React, { useMemo } from "react"
import dynamic from "next/dynamic"

export type LogoItem = {
  src: string
  alt?: string
  href?: string
}

export type LogoLoopProps = {
  items: LogoItem[]
  speed?: number
  gap?: number
  height?: number
  className?: string
  pauseOnHover?: boolean
}

// 使用 react-bits 的 ts-tailwind 版本 LogoLoop，禁用 SSR 以避免水合差异
const BitsLogoLoop = dynamic(
  () => import("../../../react-bits/src/ts-tailwind/Animations/LogoLoop/LogoLoop"),
  { ssr: false }
)

export default function LogoLoop({
  items,
  speed = 40,
  gap = 48,
  height = 48,
  className = "",
  pauseOnHover = false,
}: LogoLoopProps) {
  const logos = useMemo(
    () => items.map((it) => ({ src: it.src, alt: it.alt, href: it.href })),
    [items]
  )

  return (
    <div className={["w-full select-none overflow-hidden", className].join(" ")}> 
      {/* 包裹层：保持与现有页面一致的内边距与居中行为；保留遮罩以维持既有视觉 */}
      <div className="relative py-6 mx-auto">
        <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" />
        <BitsLogoLoop
          logos={logos}
          speed={speed}
          gap={gap}
          logoHeight={height}
          pauseOnHover={pauseOnHover}
        />
      </div>
    </div>
  )
}