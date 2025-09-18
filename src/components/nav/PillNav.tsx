"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"

export type PillNavItem = {
  label: string
  href: string
  ariaLabel?: string
}

export interface PillNavProps {
  logo?: string
  logoAlt?: string
  items: PillNavItem[]
  activeHref?: string
  className?: string
  suppressNavigation?: boolean // 新增：暂不跳转时阻止默认导航
}

function isExternal(href: string) {
  return /^(https?:)?\/\//i.test(href)
}

function normalizePath(input: string | undefined | null) {
  if (!input) return ""
  try {
    const [pathOnly] = input.split("#")
    const noQuery = pathOnly.split("?")[0]
    return noQuery.replace(/\/$/, "") || "/"
  } catch {
    return (input || "").split("?")[0].replace(/\/$/, "")
  }
}

function splitPathHash(input: string | undefined | null) {
  const s = input || ""
  const [pathAndQuery, hashPart] = s.split("#")
  const pathOnly = (pathAndQuery || "").split("?")[0]
  const path = normalizePath(pathOnly)
  const hash = hashPart ? `#${hashPart}` : ""
  return { path, hash }
}

export default function PillNav({
  logo = "RB",
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  suppressNavigation = true,
}: PillNavProps) {
  const [open, setOpen] = useState(false)
  const circlesRef = useRef<Array<HTMLSpanElement | null>>([])
  const tlsRef = useRef<Array<gsap.core.Timeline | null>>([])
  const navRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const [hash, setHash] = useState<string>("")
  const [selectedIdx, setSelectedIdx] = useState<number>(-1) // 内部激活控制

  useEffect(() => {
    const update = () => {
      if (typeof window !== "undefined") setHash(window.location.hash || "")
    }
    update()
    window.addEventListener("hashchange", update)
    return () => window.removeEventListener("hashchange", update)
  }, [])

  useEffect(() => {
    circlesRef.current.forEach((circle, idx) => {
      if (!circle || !circle.parentElement) return
      const pill = circle.parentElement as HTMLElement
      const rect = pill.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const R = ((w * w) / 4 + h * h) / (2 * h)
      const D = Math.ceil(2 * R) + 2
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
      const originY = D - delta

      circle.style.width = `${D}px`
      circle.style.height = `${D}px`
      circle.style.bottom = `-${delta}px`

      gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` })

      const label = pill.querySelector<HTMLElement>(".pill-label")
      const hoverLabel = pill.querySelector<HTMLElement>(".pill-label-hover")
      if (label) gsap.set(label, { y: 0 })
      if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 })

      tlsRef.current[idx]?.kill()
      const tl = gsap.timeline({ paused: true })
      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.7, ease: "power3.out" }, 0)
      if (label) tl.to(label, { y: -(h + 6), duration: 0.7, ease: "power3.out" }, 0)
      if (hoverLabel) tl.to(hoverLabel, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0)
      tlsRef.current[idx] = tl
    })
  }, [items])

  const onEnter = (idx: number) => tlsRef.current[idx]?.play()
  const onLeave = (idx: number) => tlsRef.current[idx]?.reverse()

  const { path: explicitPath, hash: explicitHash } = splitPathHash(activeHref)
  const currentPath = normalizePath(pathname || "")

  const menuItems = useMemo(() => {
    return items.map((i, idx) => {
      if (isExternal(i.href)) return { ...i, _active: suppressNavigation ? idx === selectedIdx : false }
      const { path: itemPath, hash: itemHash } = splitPathHash(i.href)

      // 优先使用 activeHref 作为判断依据
      if (!suppressNavigation && explicitPath) {
        const active = itemPath === explicitPath && (itemHash ? itemHash === explicitHash : explicitHash === "")
        return { ...i, _active: active }
      }

      // 否则使用当前 pathname + hash 或内部选择状态
      if (!suppressNavigation) {
        const active = itemPath === currentPath && (itemHash ? itemHash === hash : hash === "")
        return { ...i, _active: active }
      }

      // suppressNavigation = true 时，以内部选中为准
      return { ...i, _active: idx === selectedIdx }
    })
  }, [items, explicitPath, explicitHash, currentPath, hash, suppressNavigation, selectedIdx])

  // 进入页面时，根据路由/activeHref 计算默认选中，保证初始也有高亮
  useEffect(() => {
    if (!suppressNavigation || selectedIdx !== -1) return
    const computeSelectedByRoute = () => {
      const curHash = hash
      let match = -1
      items.forEach((it, iIdx) => {
        if (isExternal(it.href)) return
        const { path: itemPath, hash: itemHash } = splitPathHash(it.href)
        if (explicitPath) {
          const ok = itemPath === explicitPath && (itemHash ? itemHash === explicitHash : explicitHash === "")
          if (ok && match === -1) match = iIdx
        } else {
          const ok = itemPath === currentPath && (itemHash ? itemHash === curHash : curHash === "")
          if (ok && match === -1) match = iIdx
        }
      })
      return match
    }
    const m = computeSelectedByRoute()
    if (m !== -1) setSelectedIdx(m)
  }, [suppressNavigation, items, currentPath, hash, explicitPath, explicitHash, selectedIdx])

  // 统一的激活处理，pointerdown 立即响应，click 阻止默认跳转（在 suppressNavigation=true 时）
  const handleActivate = (idx: number) => {
    setSelectedIdx(idx)
  }

  const preventIfNeeded = (e: React.SyntheticEvent) => {
    if (suppressNavigation) {
      e.preventDefault?.()
      e.stopPropagation?.()
    }
  }

  const ItemInner = ({ i, idx }: { i: PillNavItem & { _active?: boolean }, idx: number }) => (
    <span
      className={[
        "relative h-10 md:h-11 min-w-[72px] px-4 md:px-5",
        "rounded-full inline-flex items-center justify-center",
        "text-sm md:text-[15px] tracking-wide",
        i._active ? "text-black" : "text-white/85",
        "transition-colors",
      ].join(" ")}
      onMouseEnter={() => onEnter(idx)}
      onMouseLeave={() => onLeave(idx)}
      aria-current={i._active ? "page" : undefined}
    >
       <span
          ref={(el) => { circlesRef.current[idx] = el }}
          className={[
            "absolute left-1/2",
            "-z-10",
            "rounded-full",
            i._active ? "bg-white" : "bg-white",
          ].join(" ")}
        />
       <span className="pill-label pointer-events-none">{i.label}</span>
       <span className="pill-label-hover absolute inset-0 flex items-center justify-center font-medium text-black pointer-events-none">
         {i.label}
       </span>
     </span>
   )

  const DesktopItem = ({ i, idx }: { i: PillNavItem & { _active?: boolean }, idx: number }) => {
    const commonClass = ["group relative overflow-hidden rounded-full", i._active ? "bg-white" : "bg-white/0"].join(" ")
    const handlePD = (e: React.PointerEvent) => {
      handleActivate(idx)
      preventIfNeeded(e)
    }
    const handleClick = (e: React.MouseEvent) => {
      preventIfNeeded(e)
    }
    return isExternal(i.href) ? (
      <a
        href={i.href}
        aria-label={i.ariaLabel || i.label}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClass}
        onPointerDown={handlePD}
        onClick={handleClick}
      >
        <ItemInner i={i} idx={idx} />
      </a>
    ) : (
      <Link
        href={i.href}
        aria-label={i.ariaLabel || i.label}
        className={commonClass}
        onPointerDown={handlePD}
        onClick={handleClick}
      >
        <ItemInner i={i} idx={idx} />
      </Link>
    )
  }

  return (
    <div
      ref={navRef}
      role="navigation"
      aria-label="主导航"
      className={"fixed inset-x-0 top-4 z-50 flex w-full justify-center px-4 " + className}
    >
      <div className="flex w-full max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-2 py-2 backdrop-blur-md">
        {/* Logo */}
        <Link href="/" aria-label={logoAlt} className="ml-1 select-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-sm font-semibold text-black shadow">
            {logo}
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-1">
          {menuItems.map((i, idx) => (
            <DesktopItem key={i.href + idx} i={i} idx={idx} />
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
          className="md:hidden mr-1 h-10 w-10 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/90"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div id="mobile-menu" className="absolute top-20 w-full max-w-5xl rounded-2xl border border-white/10 bg-black/70 p-2 backdrop-blur-md md:hidden">
          {menuItems.map((i, idx) => (
            isExternal(i.href) ? (
              <a
                key={i.href + idx}
                href={i.href}
                aria-label={i.ariaLabel || i.label}
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={(e) => { handleActivate(idx); preventIfNeeded(e) }}
                onClick={(e) => { preventIfNeeded(e); setOpen(false) }}
                className={["block rounded-xl px-4 py-3", i._active ? "bg-white text-black" : "text-white/85 hover:bg-white/10"].join(" ")}
                aria-current={i._active ? "page" : undefined}
              >
                {i.label}
              </a>
            ) : (
              <Link
                key={i.href + idx}
                href={i.href}
                aria-label={i.ariaLabel || i.label}
                onPointerDown={(e) => { handleActivate(idx); preventIfNeeded(e) }}
                onClick={(e) => { preventIfNeeded(e); setOpen(false) }}
                className={["block rounded-xl px-4 py-3", i._active ? "bg-white text-black" : "text-white/85 hover:bg-white/10"].join(" ")}
                aria-current={i._active ? "page" : undefined}
              >
                {i.label}
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  )
}