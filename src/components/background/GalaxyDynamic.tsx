"use client"
import React, { useEffect, useRef } from "react"

/**
 * GalaxyDynamic - 星空动态背景（Canvas）
 *
 * Props:
 * - density: number        // 约等价“颗/屏”，默认 50
 * - speed: number          // 移动速度 0.1 - 5.0，默认 1.0
 * - colors: string[]       // 颜色调色板（HEX/RGB），默认紫蓝白系
 * - direction: "down" | "up" | "left" | "right"  默认 "down"
 * - sizeRange: [number, number]  // 星点半径范围，默认 [0.5, 1.8]
 *
 * 使用：
 *  <GalaxyDynamic density={50} speed={1.2} colors={["#9E7BFF","#60A5FA","#FFFFFF"]} />
 *
 * 说明：
 * - 组件自动适配视口尺寸，监听 resize 重新布局
 * - 使用 requestAnimationFrame 渲染，力求 60FPS
 * - pointer-events-none，确保不拦截页面交互
 * - 卸载时自动清理 RAF 和监听，避免内存泄漏
 */

export type GalaxyDynamicProps = {
  density?: number
  speed?: number
  colors?: string[]
  direction?: "down" | "up" | "left" | "right"
  sizeRange?: [number, number]
  className?: string
}

type Star = {
  x: number
  y: number
  r: number
  color: string
  vx: number
  vy: number
}

const DEFAULT_COLORS = ["#9E7BFF", "#60A5FA", "#93C5FD", "#FFFFFF"]

export function GalaxyDynamic({
  density = 50,
  speed = 1.0,
  colors = DEFAULT_COLORS,
  direction = "down",
  sizeRange = [0.5, 1.8],
  className = ""
}: GalaxyDynamicProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const starsRef = useRef<Star[]>([])
  const sizeRef = useRef({ w: 0, h: 0 })
  const speedRef = useRef(speed)
  const densityRef = useRef(density)
  const colorsRef = useRef(colors)
  const dirRef = useRef(direction)
  const rangeRef = useRef(sizeRange)

  useEffect(() => { speedRef.current = speed }, [speed])
  useEffect(() => { densityRef.current = density }, [density])
  useEffect(() => { colorsRef.current = colors }, [colors])
  useEffect(() => { dirRef.current = direction }, [direction])
  useEffect(() => { rangeRef.current = sizeRange }, [sizeRange])

  const pick = (arr: string[]) => arr[(Math.random() * arr.length) | 0]
  const rand = (min: number, max: number) => Math.random() * (max - min) + min

  const computeVelocity = (spd: number, dir: GalaxyDynamicProps["direction"]) => {
    const base = Math.max(0.1, Math.min(5.0, spd))
    switch (dir) {
      case "up": return { vx: 0, vy: -base }
      case "left": return { vx: -base, vy: 0 }
      case "right": return { vx: base, vy: 0 }
      case "down":
      default: return { vx: 0, vy: base }
    }
  }

  const createStars = (w: number, h: number) => {
    const area = (w * h) / (1280 * 720) // 基准屏幕归一化
    const count = Math.max(5, Math.round(densityRef.current * area)) // 约等价“颗/屏”
    const { vx, vy } = computeVelocity(speedRef.current, dirRef.current)
    const [rmin, rmax] = rangeRef.current
    const list: Star[] = new Array(count).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: rand(rmin, rmax),
      color: pick(colorsRef.current),
      vx,
      vy
    }))
    starsRef.current = list
  }

  const resize = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    sizeRef.current = { w, h }
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    const ctx = canvas.getContext("2d")
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    createStars(w, h)
  }

  const tick = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { w, h } = sizeRef.current
    // 清屏：使用半透明填充可形成轻微拖尾；这里选纯清屏更清爽
    ctx.clearRect(0, 0, w, h)

    // 画背景晕染（轻量渐变，避免重型阴影）
    const grd = ctx.createRadialGradient(w * 0.2, h * 0.2, 0, w * 0.2, h * 0.2, Math.max(w, h) * 0.8)
    grd.addColorStop(0, "rgba(124,58,237,0.08)") // 紫
    grd.addColorStop(1, "rgba(2,6,23,0.0)")
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, w, h)

    // 更新与绘制星星
    const stars = starsRef.current
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i]
      s.x += s.vx
      s.y += s.vy

      // 越界回收：从另一边进入
      if (s.x < -2) s.x = w + 2
      if (s.x > w + 2) s.x = -2
      if (s.y < -2) s.y = h + 2
      if (s.y > h + 2) s.y = -2

      ctx.beginPath()
      ctx.fillStyle = s.color
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
    }

    rafRef.current = window.requestAnimationFrame(tick)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resize()
    rafRef.current = window.requestAnimationFrame(tick)

    window.addEventListener("resize", resize)
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      window.removeEventListener("resize", resize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#05060a] ${className || ""}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* 轻噪点与晕影层，可选 */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:radial-gradient(transparent_60%,rgba(2,6,23,0.9))]" />
    </div>
  )
}

export default GalaxyDynamic