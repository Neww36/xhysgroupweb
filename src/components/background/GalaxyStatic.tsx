"use client"
import React from "react"

export default function GalaxyStatic() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#05060a]">
      {/* 静态星空：用多层径向/线性渐变与细粒度噪点模拟，完全静态，禁用交互 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.25)_0%,transparent_40%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.22)_0%,transparent_45%),radial-gradient(circle_at_50%_75%,rgba(99,102,241,0.18)_0%,transparent_40%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background:repeating-radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_0,rgba(255,255,255,0.8)_1px,transparent_1px,transparent_2px)]" />
      <div className="absolute inset-0 opacity-[0.06] [background:radial-gradient(transparent_60%,rgba(2,6,23,0.9))]" />
    </div>
  )
}