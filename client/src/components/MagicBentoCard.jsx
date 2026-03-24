/* MagicBentoCard — mouse-tracking border glow (from reactbits.dev/components/magic-bento) */
import { useRef, useCallback } from 'react'
import './MagicBento.css'

export default function MagicBentoCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--glow-x', `${x}px`)
    card.style.setProperty('--glow-y', `${y}px`)
    card.style.setProperty('--glow-intensity', '1')
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--glow-intensity', '0')
  }, [])

  return (
    <div
      ref={cardRef}
      className={`magic-bento-card magic-bento-card--border-glow ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
