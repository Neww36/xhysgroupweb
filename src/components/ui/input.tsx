"use client"
import * as React from "react"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={[
          "w-full h-10 rounded-xl bg-white/6 border border-white/12 px-3 text-white/90 placeholder:text-white/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/50",
          "transition-colors duration-300",
          className,
        ].join(" ")}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"