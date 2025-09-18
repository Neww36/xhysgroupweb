"use client"
import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {
  baseColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
}

export const LiquidChrome: React.FC<LiquidChromeProps> = ({
  baseColor = [0.1, 0.1, 0.1],
  speed = 0.2,
  amplitude = 0.5,
  frequencyX = 3,
  frequencyY = 2,
  interactive = true,
  ...divProps
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // prefers-reduced-motion 支持
  const [reduceMotion, setReduceMotion] = React.useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !("matchMedia" in window)) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(!!mql.matches);
    try {
      mql.addEventListener('change', apply);
    } catch {
      // Safari 旧实现
      mql.addListener(apply);
    }
    apply();
    return () => {
      try {
        mql.removeEventListener('change', apply);
      } catch {
        mql.removeListener(apply);
      }
    };
  }, []);

  useEffect(() => {
    // 在 reduced-motion 下不挂载 WebGL 与动画
    if (!containerRef.current || reduceMotion) return;

    const container = containerRef.current;
    const renderer = new Renderer({ antialias: true, alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    try { console.log("[LiquidChrome] GL version:", gl.getParameter(gl.VERSION)); } catch {}
    gl.clearColor(0, 0, 0, 0);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          for (float i = 1.0; i < 10.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 20.0);
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
          return vec4(color, 1.0);
      }

      void main() {
          vec4 col = vec4(0.0);
          int samples = 0;
          for (int i = -1; i <= 1; i++){
              for (int j = -1; j <= 1; j++){
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
                  col += renderImage(vUv + offset);
                  samples++;
              }
          }
          gl_FragColor = col / float(samples);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])
        },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0, 0]) }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    function setSizeBy(el: HTMLElement) {
      const w = el.clientWidth || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      const resUniform = program.uniforms.uResolution.value as Float32Array;
      resUniform[0] = gl.canvas.width;
      resUniform[1] = gl.canvas.height;
      resUniform[2] = gl.canvas.width / Math.max(1, gl.canvas.height);
    }
    function resize() { setSizeBy(container); }
    setTimeout(() => resize(), 0);
    window.addEventListener('resize', resize);

    const RZ = (window as unknown as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
    let ro: ResizeObserver | null = null;
    if (typeof RZ === "function") {
       ro = new RZ(() => resize());
       try { ro.observe(container); } catch {}
     }

    function handleMouseMove(event: MouseEvent) {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;
      mouseUniform[0] = x;
      mouseUniform[1] = y;
    }

    function handleTouchMove(event: TouchEvent) {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width;
        const y = 1 - (touch.clientY - rect.top) / rect.height;
        const mouseUniform = program.uniforms.uMouse.value as Float32Array;
        mouseUniform[0] = x;
        mouseUniform[1] = y;
      }
    }

    const effectiveInteractive = interactive && !reduceMotion;
    if (effectiveInteractive) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchmove', handleTouchMove);
    }

    let animationId: number;
    function update(t: number) {
      animationId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    Object.assign(gl.canvas.style, {
      position: 'absolute',
      inset: '0px',
      width: '100%',
      height: '100%',
      display: 'block'
    } as Partial<CSSStyleDeclaration>);
    container.appendChild(gl.canvas);

    setSizeBy(container);

     return () => {
       cancelAnimationFrame(animationId);
       window.removeEventListener('resize', resize);
       try { ro?.disconnect(); } catch {}
       if (effectiveInteractive) {
         container.removeEventListener('mousemove', handleMouseMove);
         container.removeEventListener('touchmove', handleTouchMove);
       }
       if (gl.canvas.parentElement) {
         gl.canvas.parentElement.removeChild(gl.canvas);
       }
       gl.getExtension('WEBGL_lose_context')?.loseContext();
     };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive, reduceMotion]);

  const { className = '', style, ...rest } = divProps;
  const finalClassName = ['w-full h-full', className].filter(Boolean).join(' ');
  const finalStyle = reduceMotion
    ? { ...style, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)' }
    : style;

  return (
    <div
      ref={containerRef}
      className={finalClassName}
      style={finalStyle}
      aria-hidden
      role="presentation"
      {...rest}
    />
  );
};

export default LiquidChrome;