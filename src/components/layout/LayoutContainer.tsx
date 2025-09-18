"use client"
import React from "react"

type Props = {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
}

export default function LayoutContainer({ children, as: As = "section", className = "" }: Props) {
  const Comp = As as React.ElementType
  const composedClassName = [
    // 宽度与左右留白（F型动线：左强右弱通过内容密度与标题左对齐体现）
    "mx-auto w-full",
    "px-4 sm:px-6 lg:px-8",
    "max-w-screen-xl xl:max-w-[1280px] 2xl:max-w-[1440px]",
    // 8pt 间距系统：区块内外统一竖直节奏
    "py-8 sm:py-12 lg:py-16",
    // 统一可达性焦点样式（容器可聚焦的场景由子元素控制）
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className,
  ].join(" ");

  return React.createElement(Comp, { className: composedClassName }, children)
}