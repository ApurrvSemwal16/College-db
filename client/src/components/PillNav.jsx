/* PillNav — pill-style navigation (from reactbits.dev/components/pill-nav) */
import { useRef, useCallback } from 'react'
import { animate } from 'motion'
import './PillNav.css'

export default function PillNav({ items, activeId, onSelect }) {
  const circleRefs = useRef([])
  const labelRefs = useRef([])
  const hoverLabelRefs = useRef([])

  const handleEnter = useCallback((i) => {
    const circle = circleRefs.current[i]
    const label = labelRefs.current[i]
    const hoverLabel = hoverLabelRefs.current[i]
    if (!circle || !label || !hoverLabel) return

    animate(circle, {
      width: '300%',
      paddingBottom: '300%',
      x: '-50%',
    }, { duration: 0.4, easing: [0.4, 0, 0.2, 1] })

    animate(label, {
      y: '-120%',
      opacity: 0,
    }, { duration: 0.3, easing: [0.4, 0, 0.2, 1] })

    animate(hoverLabel, {
      y: '0%',
      opacity: 1,
    }, { duration: 0.3, easing: [0.4, 0, 0.2, 1] })
  }, [])

  const handleLeave = useCallback((i) => {
    const circle = circleRefs.current[i]
    const label = labelRefs.current[i]
    const hoverLabel = hoverLabelRefs.current[i]
    if (!circle || !label || !hoverLabel) return

    animate(circle, {
      width: '0%',
      paddingBottom: '0%',
    }, { duration: 0.3, easing: [0.4, 0, 0.2, 1] })

    animate(label, {
      y: '0%',
      opacity: 1,
    }, { duration: 0.3, easing: [0.4, 0, 0.2, 1] })

    animate(hoverLabel, {
      y: '120%',
      opacity: 0,
    }, { duration: 0.3, easing: [0.4, 0, 0.2, 1] })
  }, [])

  return (
    <nav className="pill-nav-container">
      <div className="pill-nav">
        <div className="pill-nav-items">
          <ul className="pill-list">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  className={`pill${activeId === item.id ? ' is-active' : ''}`}
                  onClick={() => onSelect(item.id)}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    ref={(el) => { circleRefs.current[i] = el }}
                  />
                  <span className="label-stack">
                    <span
                      className="pill-label"
                      ref={(el) => { labelRefs.current[i] = el }}
                    >
                      {item.icon && <i className={`fi ${item.icon} pill-icon`} />}
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover"
                      ref={(el) => { hoverLabelRefs.current[i] = el }}
                    >
                      {item.icon && <i className={`fi ${item.icon} pill-icon`} />}
                      {item.label}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
