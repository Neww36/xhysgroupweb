"use client"
import * as React from "react"

type SheetTriggerElement = React.ReactElement<{
  onClick?: (e: React.MouseEvent) => void
}>

type SheetProps = {
  open?: boolean
  onOpenChange?: (v: boolean) => void
  side?: "left" | "right" | "top" | "bottom"
  children: React.ReactNode
  trigger?: SheetTriggerElement
}

export function Sheet({
  open,
  onOpenChange,
  side = "right",
  children,
  trigger,
}: SheetProps) {
  const [innerOpen, setInnerOpen] = React.useState(open ?? false)
  const isOpen = open ?? innerOpen
  const setOpen = onOpenChange ?? setInnerOpen

  const triggerRef = React.useRef<HTMLElement | null>(null)
  const panelRef = React.useRef<HTMLElement | null>(null)
  const baseId = React.useId()

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown)
    }
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, setOpen])

  React.useEffect(() => {
    if (isOpen) {
      // 将焦点移入面板
      const container = panelRef.current
      const focusable = container?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      focusable?.focus()
    } else {
      // 归还焦点至触发器
      triggerRef.current?.focus()
    }
  }, [isOpen])

  const pos =
    side === "right"
      ? "right-0 top-0 h-full w-80 translate-x-full data-[open=true]:translate-x-0"
      : side === "left"
      ? "left-0 top-0 h-full w-80 -translate-x-full data-[open=true]:translate-x-0"
      : side === "top"
      ? "left-0 top-0 w-full h-64 -translate-y-full data-[open=true]:translate-y-0"
      : "left-0 bottom-0 w-full h-64 translate-y-full data-[open=true]:translate-y-0"

  return (
    <>
      {trigger &&
        React.cloneElement(
          trigger,
          {
            ...(trigger.props as Partial<Record<string, unknown>>),
            ref: (el: HTMLElement) => {
               const maybeFn = (trigger as unknown as { ref?: ((el: HTMLElement) => void) | React.Ref<HTMLElement> }).ref
               if (typeof maybeFn === "function") maybeFn(el)
                triggerRef.current = el
             },
            onClick: (e: React.MouseEvent) => {
              const orig = (trigger.props as { onClick?: (e: React.MouseEvent) => void }).onClick
              if (orig) orig(e)
              setOpen(!isOpen)
            },
            "aria-expanded": isOpen,
            "aria-controls": `${baseId}-sheet-panel`,
          } as Partial<Record<string, unknown>>
        )}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={() => setOpen(false)}
        aria-hidden={!isOpen}
      />
      <aside
        id={`${baseId}-sheet-panel`}
        ref={panelRef as unknown as React.Ref<HTMLDivElement>}
        data-open={isOpen}
        className={[
          "fixed z-[61] bg-white/6 border border-white/12 backdrop-blur-xl",
          "transition-transform duration-300 will-change-transform",
          pos,
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${baseId}-sheet-title`}
      >
        {children}
      </aside>
    </>
  )
}