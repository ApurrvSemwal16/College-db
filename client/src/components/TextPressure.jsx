/* TextPressure — variable font weight effect (inspired by reactbits.dev/text-animations/text-pressure) */
import { useRef, useEffect, useCallback } from 'react'
import './TextPressure.css'

export default function TextPressure({
  text = 'Text Pressure',
  textColor = '#ffffff',
  className = '',
  minWeight = 100,
  maxWeight = 900,
  maxDist = 150,
}) {
  const containerRef = useRef(null)
  const spansRef = useRef([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const cursorRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(null)

  const chars = text.split('')

  const lerp = useCallback((a, b, t) => a + (b - a) * t, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onMove(e) {
      const rect = el.getBoundingClientRect()
      cursorRef.current.x = e.clientX - rect.left
      cursorRef.current.y = e.clientY - rect.top
    }

    function onLeave() {
      cursorRef.current.x = -1000
      cursorRef.current.y = -1000
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    function animate() {
      mouseRef.current.x = lerp(mouseRef.current.x, cursorRef.current.x, 0.15)
      mouseRef.current.y = lerp(mouseRef.current.y, cursorRef.current.y, 0.15)

      const containerRect = containerRef.current?.getBoundingClientRect()
      if (!containerRect) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      spansRef.current.forEach((span) => {
        if (!span) return
        const rect = span.getBoundingClientRect()

        const charCenter = {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        }

        const dx = mouseRef.current.x - charCenter.x
        const dy = mouseRef.current.y - charCenter.y
        const d = Math.sqrt(dx * dx + dy * dy)
        const proximity = Math.max(0, 1 - d / maxDist)

        const weight = Math.round(lerp(minWeight, maxWeight, proximity))
        const scale = lerp(1, 1.08, proximity)

        span.style.fontWeight = weight
        span.style.transform = `scale(${scale})`
        span.style.opacity = lerp(0.85, 1, proximity)
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [maxDist, minWeight, maxWeight, lerp])

  return (
    <div ref={containerRef} className={`text-pressure-container ${className}`}>
      <h1 className="text-pressure-title" style={{ color: textColor }}>
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => { spansRef.current[i] = el }}
            className="text-pressure-char"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  )
}
