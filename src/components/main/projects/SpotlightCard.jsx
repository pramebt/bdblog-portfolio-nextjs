'use client'

import { useRef } from 'react'

const SpotlightCard = ({ as: Tag = 'div', className = '', children, ...props }) => {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <Tag ref={ref} onMouseMove={handleMouseMove} className={`spotlight-card ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export default SpotlightCard
