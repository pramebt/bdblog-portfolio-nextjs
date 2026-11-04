'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * WebGL2 liquid bubble outlines — SDF rings + smooth-min joins
 * Approach inspired by Yichen Xie's portfolio liquid background
 * https://yichenxie.com/  (case study: Codrops)
 */

const MAX_BUBBLES = 24

const VERT = `#version 300 es
void main() {
  // Fullscreen triangle from vertex id
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uDpr;
uniform float uStroke;
uniform float uBlend;
uniform int uCount;
uniform vec4 uBubbles[${MAX_BUBBLES}]; // xy center (centered CSS px), zw radii
uniform vec3 uBackground;
uniform vec3 uInk;

out vec4 outColor;

float sdEllipse(vec2 p, vec2 halfSize) {
  vec2 safeSize = max(halfSize, vec2(0.001));
  return (length(p / safeSize) - 1.0) * min(safeSize.x, safeSize.y);
}

float smoothMinimum(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / max(k, 0.0001);
  return min(a, b) - h * h * k * 0.25;
}

void main() {
  // CSS-pixel space, origin at center, Y up (WebGL frag Y already bottom→up)
  vec2 point = (gl_FragCoord.xy / uDpr) - uResolution * 0.5;

  float halfStroke = uStroke * 0.5;
  float dist = 1e5;

  for (int i = 0; i < ${MAX_BUBBLES}; i++) {
    if (i >= uCount) break;
    vec4 b = uBubbles[i];
    vec2 local = point - b.xy;
    float mark = abs(sdEllipse(local, b.zw)) - halfStroke;
    dist = i == 0 ? mark : smoothMinimum(dist, mark, uBlend);
  }

  float antialias = max(fwidth(dist), 0.72);
  float ink = uCount > 0
    ? 1.0 - smoothstep(-antialias, antialias, dist)
    : 0.0;

  outColor = vec4(mix(uBackground, uInk, ink), 1.0);
}`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(info || 'Shader compile failed')
  }
  return shader
}

function createProgram(gl) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  const program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || 'Program link failed')
  }
  return program
}

function readCssRgb(value, fallback) {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return fallback
  ctx.fillStyle = '#000'
  ctx.fillStyle = value
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  if (!a) return fallback
  return [r / 255, g / 255, b / 255]
}

function themeColors(dark) {
  const probe = document.createElement('div')
  probe.style.backgroundColor = 'var(--background)'
  document.body.appendChild(probe)
  const css = getComputedStyle(probe).backgroundColor
  probe.remove()
  const fallback = dark ? [0.16, 0.165, 0.19] : [0.973, 0.98, 0.992]
  const bg = readCssRgb(css, fallback)
  if (dark) {
    return {
      bg,
      ink: [0.72, 0.74, 0.78],
    }
  }
  return {
    bg,
    ink: [0.62, 0.64, 0.68],
  }
}

function createComposition(w, h) {
  // Relative layouts inspired by the reference homepage compositions
  const short = Math.min(w, h)
  const scale = short * 0.5
  // Mass sits to the right of the hero copy so the letters stay readable.
  const specs = [
    { x: 0.84, y: 0.3, r: 0.44 },
    { x: 0.5, y: 0.76, r: 0.26 },
    { x: 1.02, y: 0.0, r: 0.34 },
    { x: 0.52, y: -0.2, r: 0.38 },
    { x: 0.16, y: -0.56, r: 0.26 },
    { x: -0.96, y: 0.7, r: 0.26 },
    { x: -0.98, y: -0.12, r: 0.22 },
    { x: 1.08, y: 0.42, r: 0.22 },
    { x: 0.62, y: -0.5, r: 0.2 },
    { x: 0.78, y: -0.06, r: 0.24 },
    { x: 0.96, y: -0.4, r: 0.28 },
    { x: 0.34, y: 0.9, r: 0.2 },
    { x: -0.52, y: 0.94, r: 0.22 },
    { x: -0.78, y: -0.9, r: 0.24 },
    { x: 0.36, y: -0.38, r: 0.2 },
  ]

  return specs.map((s, i) => {
    const seed = i * 12.9898
    const amp = 4 + ((Math.sin(seed) * 0.5 + 0.5) * 4)
    return {
      baseX: s.x * scale * (w / short),
      baseY: s.y * scale,
      radius: s.r * scale * 0.72,
      ampX: amp,
      ampY: amp * 0.85,
      periodX: 20 + (i % 5) * 2.4,
      periodY: 24 + (i % 4) * 2.1,
      phaseX: seed,
      phaseY: seed * 1.7,
      bounce: 0,
      bounceAt: 0,
      scale: 0,
    }
  })
}

function springValue(elapsedMs) {
  const seconds = Math.max(0, elapsedMs - 48) / 1000
  return Math.exp(-6.5 * seconds) * Math.sin(23 * seconds)
}

export function LiquidBackground({ className = '' }) {
  const canvasRef = useRef(null)
  const fallbackRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let gl = null
    try {
      gl = canvas.getContext('webgl2', {
        antialias: false,
        alpha: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: true,
        powerPreference: 'low-power',
      })
    } catch {
      gl = null
    }

    // Canvas2D fallback — simple outlines
    if (!gl) {
      const ctx = fallbackRef.current?.getContext('2d')
      if (!ctx || !fallbackRef.current) return
      fallbackRef.current.style.display = 'block'
      canvas.style.display = 'none'

      let bubbles = []
      let raf = 0
      let time = 0
      const drawFallback = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const w = window.innerWidth
        const h = window.innerHeight
        const fb = fallbackRef.current
        fb.width = w * dpr
        fb.height = h * dpr
        fb.style.width = `${w}px`
        fb.style.height = `${h}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        const dark = document.documentElement.classList.contains('dark')
        const { bg, ink } = themeColors(dark)
        ctx.fillStyle = `rgb(${bg.map((c) => Math.round(c * 255)).join(',')})`
        ctx.fillRect(0, 0, w, h)
        if (!bubbles.length) bubbles = createComposition(w, h)
        ctx.strokeStyle = `rgb(${ink.map((c) => Math.round(c * 255)).join(',')})`
        ctx.lineWidth = 1.25
        time += 0.016
        for (const b of bubbles) {
          const x = w / 2 + b.baseX + Math.sin(time / b.periodX * Math.PI * 2 + b.phaseX) * b.ampX
          const y = h / 2 + b.baseY + Math.sin(time / b.periodY * Math.PI * 2 + b.phaseY) * b.ampY
          ctx.beginPath()
          ctx.arc(x, y, b.radius, 0, Math.PI * 2)
          ctx.stroke()
        }
        raf = requestAnimationFrame(drawFallback)
      }
      raf = requestAnimationFrame(drawFallback)
      return () => cancelAnimationFrame(raf)
    }

    let program
    try {
      program = createProgram(gl)
    } catch (err) {
      console.warn('[LiquidBackground] WebGL program failed', err)
      return
    }

    // WebGL2 requires a bound VAO even when drawing with gl_VertexID only
    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)

    gl.useProgram(program)
    const loc = {
      resolution: gl.getUniformLocation(program, 'uResolution'),
      dpr: gl.getUniformLocation(program, 'uDpr'),
      stroke: gl.getUniformLocation(program, 'uStroke'),
      blend: gl.getUniformLocation(program, 'uBlend'),
      count: gl.getUniformLocation(program, 'uCount'),
      bubbles:
        gl.getUniformLocation(program, 'uBubbles[0]') ||
        gl.getUniformLocation(program, 'uBubbles'),
      background: gl.getUniformLocation(program, 'uBackground'),
      ink: gl.getUniformLocation(program, 'uInk'),
    }

    let w = 0
    let h = 0
    let dpr = 1
    let bubbles = []
    let raf = 0
    let running = true
    let start = performance.now()
    let lastDraw = 0
    let needsFullFps = true
    let colors = themeColors(false)
    let targetColors = { ...colors }
    let colorLerp = 1

    const mouse = { x: 0, y: 0, active: false }

    const resize = () => {
      const parent = canvas.parentElement
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = parent?.clientWidth || window.innerWidth
      h = parent?.clientHeight || window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
      bubbles = createComposition(w, h)
      needsFullFps = true
    }

    const syncTheme = () => {
      const dark = document.documentElement.classList.contains('dark')
      targetColors = themeColors(dark)
      colorLerp = 0
      needsFullFps = true
    }

    const visiblePosition = (b, t, intro) => {
      const driftAmp = reduceMotion ? 0 : intro
      const bounce = b.bounce ? springValue(performance.now() - b.bounceAt) * 10 : 0
      const x =
        b.baseX +
        Math.sin((t / b.periodX) * Math.PI * 2 + b.phaseX) * b.ampX * driftAmp +
        bounce * 0.15
      const y =
        b.baseY +
        Math.sin((t / b.periodY) * Math.PI * 2 + b.phaseY) * b.ampY * driftAmp
      return { x, y }
    }

    const draw = (now) => {
      if (!running) return
      const elapsed = (now - start) / 1000
      const intro = reduceMotion
        ? 1
        : Math.min(1, Math.max(0, (elapsed - 1.2) / 2.6))

      // Ambient throttle ~30fps when idle
      const minDelta = needsFullFps || mouse.active ? 0 : 33
      if (now - lastDraw < minDelta) {
        raf = requestAnimationFrame(draw)
        return
      }
      lastDraw = now

      if (colorLerp < 1) {
        colorLerp = Math.min(1, colorLerp + 0.05)
        colors = {
          bg: colors.bg.map((c, i) => c + (targetColors.bg[i] - c) * 0.12),
          ink: colors.ink.map((c, i) => c + (targetColors.ink[i] - c) * 0.12),
        }
        if (colorLerp >= 1) needsFullFps = false
      }

      // Reveal scale
      bubbles.forEach((b, i) => {
        if (reduceMotion) {
          b.scale = 1
          return
        }
        const local = Math.min(1, Math.max(0, (elapsed * 1000 - i * 170) / 900))
        const eased = 1 - Math.pow(1 - local, 3)
        b.scale = eased
      })

      const data = new Float32Array(MAX_BUBBLES * 4)
      let count = 0
      for (let i = 0; i < bubbles.length && count < MAX_BUBBLES; i++) {
        const b = bubbles[i]
        if (b.scale <= 0.01) continue
        let { x, y } = visiblePosition(b, elapsed, intro)

        // Soft cursor ripple — nudge away slightly (centered CSS space, Y up)
        if (mouse.active) {
          const mx = mouse.x - w / 2
          const my = -(mouse.y - h / 2)
          const dx = x - mx
          const dy = y - my
          const dist = Math.hypot(dx, dy) || 1
          const radius = Math.min(w, h) * 0.19
          if (dist < radius) {
            const f = (1 - dist / radius) * 18
            x += (dx / dist) * f
            y += (dy / dist) * f
          }
        }

        const r = b.radius * Math.max(0.001, b.scale)
        data[count * 4 + 0] = x
        data[count * 4 + 1] = y
        data[count * 4 + 2] = r
        data[count * 4 + 3] = r
        count++
      }

      gl.bindVertexArray(vao)
      gl.useProgram(program)
      gl.uniform2f(loc.resolution, w, h)
      gl.uniform1f(loc.dpr, dpr)
      gl.uniform1f(loc.stroke, Math.max(1, 0.9 * dpr))
      gl.uniform1f(loc.blend, 28)
      gl.uniform1i(loc.count, count)
      if (loc.bubbles) gl.uniform4fv(loc.bubbles, data)
      gl.uniform3f(loc.background, colors.bg[0], colors.bg[1], colors.bg[2])
      gl.uniform3f(loc.ink, colors.ink[0], colors.ink[1], colors.ink[2])
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      // Clear bounce flags when settled
      bubbles.forEach((b) => {
        if (b.bounce && performance.now() - b.bounceAt > 800) b.bounce = 0
      })

      raf = requestAnimationFrame(draw)
    }

    const hitTest = (cx, cy) => {
      const elapsed = (performance.now() - start) / 1000
      const intro = reduceMotion ? 1 : Math.min(1, Math.max(0, (elapsed - 1.2) / 2.6))
      const mx = cx - w / 2
      const my = -(cy - h / 2)
      let best = -1
      let bestDist = Infinity
      bubbles.forEach((b, i) => {
        const { x, y } = visiblePosition(b, elapsed, intro)
        const d = Math.hypot(mx - x, my - y)
        if (d < b.radius * 1.15 && d < bestDist) {
          bestDist = d
          best = i
        }
      })
      return best
    }

    let lastClick = 0
    const onPointerMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
      needsFullFps = true
    }
    const onPointerLeave = () => {
      mouse.active = false
    }
    const onPointerDown = (e) => {
      // Don't steal clicks from links / buttons / inputs
      const tag = e.target?.closest?.('a,button,input,textarea,select,[role="button"]')
      if (tag) return

      const now = performance.now()
      const idx = hitTest(e.clientX, e.clientY)
      if (idx < 0) return
      // Double-click / quick second tap → pop
      if (now - lastClick < 320) {
        bubbles.splice(idx, 1)
        needsFullFps = true
      } else {
        bubbles[idx].bounce = 1
        bubbles[idx].bounceAt = now
        needsFullFps = true
      }
      lastClick = now
    }

    resize()
    syncTheme()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerdown', onPointerDown)
    const mo = new MutationObserver(syncTheme)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else {
        needsFullFps = true
        raf = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('visibilitychange', onVis)
      mo.disconnect()
      if (vao) gl.deleteVertexArray(vao)
      if (program) gl.deleteProgram(program)
    }
  }, [])

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={fallbackRef} className="absolute inset-0 hidden h-full w-full" />
    </div>
  )
}

export default LiquidBackground
