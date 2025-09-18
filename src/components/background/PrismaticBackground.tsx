"use client"

import React from "react"
import dynamic from "next/dynamic"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

// 动态导入 PrismaticBurst，移动端/SSR 关闭以避免水合不一致
const PrismaticBurst = dynamic(
  () => import("../../../react-bits/src/ts-tailwind/Backgrounds/PrismaticBurst/PrismaticBurst"),
  { ssr: false }
)

export default function PrismaticBackground() {
  const reduceMotion = usePrefersReducedMotion()

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
      role="presentation"
    >
      {reduceMotion ? (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      ) : (
        <PrismaticBurst intensity={2} mixBlendMode="screen" />
      )}
    </div>
  )
}