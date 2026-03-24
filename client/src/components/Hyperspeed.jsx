/* Hyperspeed — Pure CSS animated light-speed background */
import { useEffect, useRef } from 'react'

export default function Hyperspeed() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w, h
    const stars = []
    const STAR_COUNT = 300
    const colors = ['#d856bf', '#6750a2', '#c247ac', '#03b3c3', '#0e5ea5', '#6366f1', '#818cf8']

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize stars
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w - w / 2,
        y: Math.random() * h - h / 2,
        z: Math.random() * 1500 + 500,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1.5 + 0.5,
      })
    }

    // Road lines
    const roadLines = []
    for (let i = 0; i < 40; i++) {
      roadLines.push({
        x: (Math.random() - 0.5) * 600,
        z: Math.random() * 2000,
        speed: Math.random() * 8 + 4,
        length: Math.random() * 120 + 40,
        color: Math.random() > 0.5
          ? colors[Math.floor(Math.random() * 3)]   // left  (pinks)
          : colors[Math.floor(Math.random() * 3) + 3], // right (blues)
        width: Math.random() * 2 + 1,
        y: (Math.random() - 0.5) * 100,
      })
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.fillRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2

      // Draw stars (warp speed)
      for (const s of stars) {
        s.z -= 6
        if (s.z <= 0) {
          s.x = Math.random() * w - w / 2
          s.y = Math.random() * h - h / 2
          s.z = 1500
        }

        const sx = (s.x / s.z) * 800 + cx
        const sy = (s.y / s.z) * 800 + cy
        const prevZ = s.z + 6
        const psx = (s.x / prevZ) * 800 + cx
        const psy = (s.y / prevZ) * 800 + cy

        const opacity = 1 - s.z / 1500
        const lineWidth = (1 - s.z / 1500) * s.size * 2

        ctx.beginPath()
        ctx.moveTo(psx, psy)
        ctx.lineTo(sx, sy)
        ctx.strokeStyle = s.color
        ctx.globalAlpha = opacity * 0.7
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      // Draw road light streaks
      ctx.globalAlpha = 1
      for (const line of roadLines) {
        line.z -= line.speed
        if (line.z <= 0) {
          line.z = 2000
          line.x = (Math.random() - 0.5) * 600
        }

        const perspective = 400 / line.z
        const screenX = cx + line.x * perspective
        const screenY = cy + (150 + line.y) * perspective

        const endPerspective = 400 / (line.z + line.length)
        const endScreenX = cx + line.x * endPerspective
        const endScreenY = cy + (150 + line.y) * endPerspective

        const opacity = Math.min(1, (1 - line.z / 2000) * 1.5)

        const gradient = ctx.createLinearGradient(endScreenX, endScreenY, screenX, screenY)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(1, line.color)

        ctx.beginPath()
        ctx.moveTo(endScreenX, endScreenY)
        ctx.lineTo(screenX, screenY)
        ctx.strokeStyle = gradient
        ctx.globalAlpha = opacity * 0.8
        ctx.lineWidth = line.width * perspective * 3
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      // Subtle glow at the center vanishing point
      ctx.globalAlpha = 0.04
      const glow = ctx.createRadialGradient(cx, cy + 50, 0, cx, cy + 50, 300)
      glow.addColorStop(0, '#6366f1')
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      ctx.globalAlpha = 1
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  )
}
