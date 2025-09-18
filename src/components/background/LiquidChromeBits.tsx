"use client"

import React, { useEffect, useRef } from "react"
import { Mesh, Program, Renderer, Triangle } from "ogl"

/**
 * Source audit (6A):
 * - Adapted conceptually from react-bits Liquid Chrome background.
 * - Purpose: Provide a Liquid Chrome background as a client component for /entry.
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

// Liquid Chrome inspired fragment shader (stable, concise)
const fragmentShader = `
precision highp float;
varying vec2 vUv;

uniform float uTime;
uniform float uIntensity;   // 形变强度 0~1.5
uniform float uSpeed;       // 速度 0.1~2
uniform float uHue;         // 色相 0~360
uniform float uSaturation;  // 饱和 0~1
uniform float uMetallic;    // 金属度 0~1
uniform float uReflection;  // 反射强度 0~1
uniform float uNoiseScale;  // 噪声尺度

// 简化伪噪声（周期性，性能友好）
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec3 hsv2rgb(vec3 c){
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  // 坐标中心化
  vec2 uv = vUv * 2.0 - 1.0;

  // 液态位移：多频噪声叠加
  float t = uTime * uSpeed;
  float n1 = noise(uv * (1.5 * uNoiseScale) + vec2(t * 0.45, -t * 0.35));
  float n2 = noise(uv * (3.0 * uNoiseScale) + vec2(-t * 0.25, t * 0.30));
  float n3 = noise(uv * (5.5 * uNoiseScale) + vec2(t * 0.15, t * 0.10));
  float deform = (n1 * 0.6 + n2 * 0.3 + n3 * 0.1) * uIntensity;

  // 法线近似（基于噪声梯度）
  float e = 0.0015;
  float h = deform;
  float hx = (noise((uv + vec2(e, 0.0)) * (3.0 * uNoiseScale) + vec2(-t * 0.25, t * 0.30)) - noise((uv - vec2(e, 0.0)) * (3.0 * uNoiseScale) + vec2(-t * 0.25, t * 0.30))) / (2.0 * e);
  float hy = (noise((uv + vec2(0.0, e)) * (3.0 * uNoiseScale) + vec2(-t * 0.25, t * 0.30)) - noise((uv - vec2(0.0, e)) * (3.0 * uNoiseScale) + vec2(-t * 0.25, t * 0.30))) / (2.0 * e);
  vec3 normal = normalize(vec3(-hx, -hy, 1.0));

  // 环境与高光（金属反射）
  vec3 viewDir = normalize(vec3(uv, 1.5));
  vec3 lightDir = normalize(vec3(0.3, -0.4, 0.9));
  float diff = max(dot(normal, lightDir), 0.0);

  // 镜面高光（Blinn-Phong）
  vec3 halfDir = normalize(lightDir + viewDir);
  float spec = pow(max(dot(normal, halfDir), 0.0), mix(30.0, 120.0, uMetallic));

  // 反射/环境色（以沿 y 的渐变模拟）
  float env = mix(0.15, 1.0, smoothstep(-1.0, 1.0, uv.y));
  float hue = uHue / 360.0;
  vec3 base = hsv2rgb(vec3(hue, uSaturation, 0.85 + 0.15 * deform));

  vec3 color = base * (0.35 + 0.65 * diff) + vec3(1.0) * spec * (0.35 + 0.65 * uReflection);
  color = mix(color, vec3(env) * base, 0.25 * uReflection);

  gl_FragColor = vec4(color, 1.0);
}
`

export interface LiquidChromeBitsProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number
  speed?: number
  hue?: number
  saturation?: number
  metallic?: number
  reflection?: number
  noiseScale?: number
  transparent?: boolean
  mouseInteraction?: boolean
}

export default function LiquidChromeBits({
  intensity = 0.9,
  speed = 0.8,
  hue = 210,
  saturation = 0.6,
  metallic = 0.9,
  reflection = 0.6,
  noiseScale = 1.0,
  transparent = true,
  mouseInteraction = true,
  className,
  style,
  ...rest
}: LiquidChromeBitsProps) {
  const ctnRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0.0, y: 0.0 })

  useEffect(() => {
    if (!ctnRef.current) return
    const ctn = ctnRef.current

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
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uSpeed: { value: speed },
        uHue: { value: hue },
        uSaturation: { value: saturation },
        uMetallic: { value: metallic },
        uReflection: { value: reflection },
        uNoiseScale: { value: noiseScale },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    let raf = 0

    function update(t: number) {
      raf = requestAnimationFrame(update)
      program.uniforms.uTime.value = t * 0.001
      // 可根据指针扰动微调参数（轻度）
      if (mouseInteraction) {
        program.uniforms.uHue.value = hue + mouse.current.x * 10.0
        program.uniforms.uSaturation.value = saturation + mouse.current.y * 0.05
      }
      renderer.render({ scene: mesh })
    }
    raf = requestAnimationFrame(update)
    ctn.appendChild(gl.canvas)

    function onMove(e: MouseEvent) {
      const r = ctn.getBoundingClientRect()
      mouse.current.x = (e.clientX - r.left) / r.width - 0.5
      mouse.current.y = 0.5 - (e.clientY - r.top) / r.height
    }
    if (mouseInteraction) {
      ctn.addEventListener("mousemove", onMove)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      if (mouseInteraction) ctn.removeEventListener("mousemove", onMove)
      ctn.removeChild(gl.canvas)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [intensity, speed, hue, saturation, metallic, reflection, noiseScale, transparent, mouseInteraction])

  // 仅保留安全 DOM 属性，避免无效 props 透传
  const { id, role, tabIndex } = rest
  type DataAria = {
    [K in `data-${string}` | `aria-${string}`]?: string | number | boolean | undefined
  }
  const dataAria: DataAria = {}
  Object.keys(rest).forEach((k) => {
    if (k.startsWith("data-") || k.startsWith("aria-")) {
      const key = k as keyof DataAria
      // React 支持 data-/aria- 的字符串/数字/布尔值
      dataAria[key] = (rest as Record<string, string | number | boolean | undefined>)[k]
    }
  })
  const safeProps: React.HTMLAttributes<HTMLDivElement> = {
    id,
    role,
    tabIndex,
    ...dataAria,
  }

  return <div ref={ctnRef} className={`w-full h-full relative ${className ?? ""}`} style={style} {...safeProps} />
}