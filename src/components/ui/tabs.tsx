"use client"
import * as React from "react"

export type Tab = { value: string; label: string; content: React.ReactNode }

export function Tabs({
  tabs,
  value,
  onValueChange,
  className = "",
}: {
  tabs: Tab[]
  value: string
  onValueChange: (v: string) => void
  className?: string
}) {
  const baseId = React.useId()
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([])
  const currentIndex = tabs.findIndex((t) => t.value === value)

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!tabs.length) return
    let nextIndex = currentIndex
    if (e.key === "ArrowRight") {
      e.preventDefault()
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (e.key === "Home") {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === "End") {
      e.preventDefault()
      nextIndex = tabs.length - 1
    }
    if (nextIndex !== currentIndex) {
      const next = tabs[nextIndex]
      onValueChange(next.value)
      requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus())
    }
  }

  return (
    <div className={["w-full", className].join(" ")}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex gap-2 border-b border-white/10"
        onKeyDown={onKeyDown}
      >
        {tabs.map((t, i) => {
          const active = t.value === value
          return (
            <button
              key={t.value}
              id={`${baseId}-tab-${t.value}`}
              role="tab"
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              className={[
                "px-4 py-2 rounded-t-lg transition-colors duration-300",
                active
                  ? "bg-white/10 text-white"
                  : "text白/70 hover:text-white/90 hover:bg白/6".replace("白","white"),
              ].join(" ")}
              onClick={() => onValueChange(t.value)}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${value}`}
        className="pt-4"
      >
        {tabs.find((t) => t.value === value)?.content}
      </div>
    </div>
  )
}