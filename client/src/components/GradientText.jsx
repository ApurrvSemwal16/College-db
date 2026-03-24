/* GradientText — animated gradient text (from reactbits.dev) */
import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react'
import './GradientText.css'

export default function GradientText({
  children,
  className = '',
  colors = ['#6366f1', '#ec4899', '#06b6d4', '#6366f1'],
  animationSpeed = 8,
  showBorder = false,
}) {
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef(null)
  const duration = animationSpeed * 1000

  useAnimationFrame((time) => {
    if (lastTimeRef.current === null) { lastTimeRef.current = time; return }
    const delta = time - lastTimeRef.current
    lastTimeRef.current = time
    elapsedRef.current += delta
    const fullCycle = duration * 2
    const ct = elapsedRef.current % fullCycle
    progress.set(ct < duration ? (ct / duration) * 100 : 100 - ((ct - duration) / duration) * 100)
  })

  const backgroundPosition = useTransform(progress, (p) => `${p}% 50%`)

  const gradientColors = [...colors, colors[0]].join(', ')
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: '300% 100%',
  }

  return (
    <motion.span
      className={`gradient-text-animated ${showBorder ? 'with-border' : ''} ${className}`}
    >
      {showBorder && <motion.span className="gradient-overlay" style={{ ...gradientStyle, backgroundPosition }} />}
      <motion.span className="gradient-text-content" style={{ ...gradientStyle, backgroundPosition }}>
        {children}
      </motion.span>
    </motion.span>
  )
}
