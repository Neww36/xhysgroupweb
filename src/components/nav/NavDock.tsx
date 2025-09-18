"use client"

import React from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

// 动态导入 react-bits GooeyNav，避免 SSR 引发的布局/事件差异
const GooeyNav = dynamic(() => import("../../../react-bits/src/ts-tailwind/Components/GooeyNav/GooeyNav"), {
  ssr: false,
})

type NavItem = {
  label: string
  href: string
}

// 全站导航：按需求顺序与文案
const navItems: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "解决方案", href: "/solutions" },
  { label: "关于我们", href: "/about" },
  { label: "联系我们", href: "/contact" },
]

export default function NavDock() {
  const pathname = usePathname()

  // 在入门页不展示导航
  if (pathname?.startsWith("/entry")) {
    return null
  }

  // 移动端菜单开关
  const [open, setOpen] = React.useState(false)

  // 计算当前激活项索引
  const activeIndex = React.useMemo(() => {
    const isHomeActive = pathname === "/"
    for (let i = 0; i < navItems.length; i++) {
      const item = navItems[i]
      if (item.href === "/") {
        if (isHomeActive) return i
      } else if (pathname === item.href) {
        return i
      }
    }
    return 0
  }, [pathname])

  // 通过 key 强制在路由变化时重置 GooeyNav 的内部 activeIndex
  const navKey = `${pathname}`

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          {/* 顶部导航条 */}
          <div className="flex h-14 items-center justify-between rounded-2xl bg-transparent">
            {/* 左侧 Logo */}
            <Link href="/" className="flex items-center gap-2" aria-label="返回首页">
              <Image src="/globe.svg" alt="Company Logo" width={28} height={28} priority />
              <span className="gradient-text font-semibold tracking-wide hidden sm:inline">XJYS.AI</span>
            </Link>

            {/* 桌面端导航（GooeyNav） */}
            <div className="hidden md:block">
              <GooeyNav key={navKey} items={navItems} initialActiveIndex={activeIndex} />
            </div>

            {/* 移动端：汉堡菜单 */}
            <div className="md:hidden">
              <button
                aria-label="打开菜单"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* 移动端抽屉菜单 */}
          {open && (
            <div className="md:hidden mt-2 rounded-xl border border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/50">
              <nav className="flex flex-col divide-y divide-white/10" aria-label="移动端导航">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-sm text-gray-100 hover:bg-white/10 active:bg-white/15"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
      {/* 移除顶部占位，避免出现独立的黑色带；由各页面自行使用内边距控制内容与固定导航的间距 */}
    </>
  )
}