/* AnimatedList — stagger-animated list items using motion/react (inspired by reactbits.dev) */
import { motion } from 'motion/react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const item = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: 'easeOut' } },
}

export function AnimatedRow({ children, className }) {
  return (
    <motion.tr variants={item} className={className}>
      {children}
    </motion.tr>
  )
}

export function AnimatedTbody({ children }) {
  return (
    <motion.tbody variants={container} initial="hidden" animate="show">
      {children}
    </motion.tbody>
  )
}

export function AnimatedCard({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {children}
    </motion.div>
  )
}
