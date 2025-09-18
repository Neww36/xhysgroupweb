export const durations = {
  fast: 0.2,
  base: 0.3,
  slow: 0.4,
}

export const easings = {
  out: "power2.out",
  inOut: "power1.inOut",
}

export async function hoverIn(el: HTMLElement) {
  const { default: gsap } = await import("gsap")
  gsap.to(el, { duration: durations.base, scale: 1.04, opacity: 1, filter: "brightness(1.05)", ease: easings.out })
}

export async function hoverOut(el: HTMLElement) {
  const { default: gsap } = await import("gsap")
  gsap.to(el, { duration: durations.base, scale: 1.0, opacity: 0.95, filter: "brightness(1.0)", ease: easings.out })
}

// 可选：持续脉动（当前导航未启用）
export async function pulse(el: HTMLElement) {
  const { default: gsap } = await import("gsap")
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 })
  tl.to(el, { duration: 0.9, scale: 1.02, filter: "brightness(1.06)", ease: easings.inOut })
    .to(el, { duration: 0.9, scale: 1.0, filter: "brightness(1.0)", ease: easings.inOut })
  return tl
}

// 确保为 ES 模块（避免 “不是模块” 报错）
export const __anim__module = true