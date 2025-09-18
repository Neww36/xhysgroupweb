"use client"
import * as React from "react"

type TooltipProps = {
  content: React.ReactNode
  children: React.ReactElement
}

export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  type MouseEvt = React.MouseEvent<Element>
  type FocusEvt = React.FocusEvent<Element>

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) {
      window.addEventListener("keydown", onKeyDown)
    }
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <span className="relative inline-block">
      {React.cloneElement(
        children,
        {
          ...(children.props as Partial<Record<string, unknown>>),
          onMouseEnter: (e: MouseEvt) => {
            const fn = (children.props as { onMouseEnter?: (e: MouseEvt) => void }).onMouseEnter
            if (fn) fn(e)
            setOpen(true)
          },
          onMouseLeave: (e: MouseEvt) => {
            const fn = (children.props as { onMouseLeave?: (e: MouseEvt) => void }).onMouseLeave
            if (fn) fn(e)
            setOpen(false)
          },
          onFocus: (e: FocusEvt) => {
            const fn = (children.props as { onFocus?: (e: FocusEvt) => void }).onFocus
            if (fn) fn(e)
            setOpen(true)
          },
          onBlur: (e: FocusEvt) => {
            const fn = (children.props as { onBlur?: (e: FocusEvt) => void }).onBlur
            if (fn) fn(e)
            setOpen(false)
          },
          "aria-describedby": open ? id : undefined,
          "aria-expanded": open || undefined,
        } as Partial<Record<string, unknown>>
      )}
      {open && (
        <span
          role="tooltip"
          id={id}
          className="pointer-events-none absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap rounded-md bg-black/80 text-white text-xs px-2 py-1 backdrop-blur"
        >
          {content}
        </span>
      )}
    </span>
  )
}