'use client'

import { motion } from 'motion/react'
import { ListBullets, SquaresFour } from '@phosphor-icons/react/dist/ssr'

const views = [
  { value: 'grid', label: 'Grid', icon: SquaresFour },
  { value: 'index', label: 'Index', icon: ListBullets },
]

const ViewToggle = ({ view, onViewChange, layoutId = 'project-view-indicator' }) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/60 p-1" aria-label="Layout">
      {views.map(({ value, label, icon: Icon }) => {
        const isActive = view === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => onViewChange(value)}
            aria-pressed={isActive}
            aria-label={`${label} view`}
            className={`relative flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors duration-300 ${
              isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-muted"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <Icon size={16} weight={isActive ? 'fill' : 'regular'} className="relative z-10" />
            <span className="relative z-10 hidden sm:inline">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default ViewToggle
