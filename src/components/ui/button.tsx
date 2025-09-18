"use client"
import * as React from "react"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

const base =
  "inline-flex items-center justify-center rounded-xl font-medium transition-[colors,transform,shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#7C3AED]/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
}

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "text-white bg-gradient-to-r from-[#7C3AED] to-[#00D1FF] shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_28px_rgba(0,209,255,0.35)]",
  ghost: "text-white/90 bg-white/10 hover:bg-white/14",
  outline:
    "text-white/90 border border-white/15 bg-white/5 hover:bg-white/[0.07]",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const classes = [base, sizes[size], variants[variant], className].join(" ")
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>
      return React.cloneElement(child, {
        ...(child.props as Partial<Record<string, unknown>>),
        className: [child.props?.className ?? "", classes].join(" ").trim(),
        ref: ref as unknown as React.Ref<any>,
        ...props,
      })
    }
    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"