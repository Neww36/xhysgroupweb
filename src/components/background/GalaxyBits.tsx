"use client"

import React, { useEffect, useRef } from "react"
import { Mesh, Program, Renderer, Triangle } from "ogl"

/**
 * Minimal GalaxyBits (pipeline verification)
 * - Purpose: ensure WebGL/OGL pipeline renders a visible background (blue-purple gradient).
 * - After verification, we will restore the full Galaxy starfield shader.
 */

const vertexShader = `
precision highp float;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

// Minimal blue-purple gradient fragment shader
const fragmentShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vec3 c1 = vec3(0.12, 0.18, 0.45); // blue
  vec3 c2 = vec3(0.55, 0.35, 0.75); // purple
  vec3 col = mix(c1, c2, smoothstep(0.0, 1.0, vUv.y));
  gl_FragColor = vec4(col, 1.0);
}
`

export interface GalaxyBitsProps extends React.HTMLAttributes<HTMLDivElement> {
  transparent?: boolean
}

export default function GalaxyBits({
  transparent = true,
  className,
  style,
  ...rest
}: GalaxyBitsProps) {
  const ctnDom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ctnDom.current) return
    const ctn = ctnDom.current

    const renderer = new Renderer({
      alpha: transparent,
      premultipliedAlpha: false,
      antialias: true,
      depth: false,
    })
    const gl = renderer.gl

    if (transparent) {
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      gl.clearColor(0, 0, 0, 0)
    } else {
      gl.clearColor(0, 0, 0, 1)
    }

    function resize() {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight)
    }
    window.addEventListener("resize", resize, false)
    resize()

    const geometry = new Triangle(gl)
    const program = new Program(gl, { vertex: vertexShader, fragment: fragmentShader })
    const mesh = new Mesh(gl, { geometry, program })

    let raf = 0
    function update() {
      raf = requestAnimationFrame(update)
      renderer.render({ scene: mesh })
    }
    raf = requestAnimationFrame(update)
    ctn.appendChild(gl.canvas)

    console.log("[GalaxyBits:min] init, canvas:", gl.canvas.width, gl.canvas.height)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      ctn.removeChild(gl.canvas)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [transparent])

  // 过滤无效 DOM 属性，避免 React 警告
  const { id, role, tabIndex, ...restProps } = rest

  // 仅允许透传 data-* 与 aria-* 属性，避免无效属性注入
  type DataAria = Record<string, string | number | boolean | undefined>
  const dataAria: DataAria = {}

  Object.keys(restProps).forEach((k) => {
    if (k.startsWith("data-") || k.startsWith("aria-")) {
      const key = k as keyof DataAria
      dataAria[key] = (restProps as Record<string, string | number | boolean | undefined>)[k]
    }
  })
  const safeProps: React.HTMLAttributes<HTMLDivElement> = { id, role, tabIndex, ...dataAria }
  return <div ref={ctnDom} className={`w-full h-full relative ${className ?? ""}`} style={style} {...safeProps} />
}