'use client'

import { motion } from 'motion/react'

const ProjectTabs = ({
  personalCount = 0,
  professionalCount = 0,
  totalCount = 0,
  activeTab = 'all',
  onTabChange,
  children,
}) => {
  const tabs = [
    { value: 'all', label: 'All', count: totalCount },
    { value: 'PERSONAL', label: 'Personal', count: personalCount },
    { value: 'PROFESSIONAL', label: 'Professional', count: professionalCount },
  ]

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Project type"
        className="mb-8 inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border/60 bg-background/60 p-1 backdrop-blur-sm scrollbar-hide"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => !isActive && onTabChange?.(tab.value)}
              className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                isActive ? 'text-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="project-tab-indicator"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                {tab.label}
                <span className="ml-2 font-mono text-[10px] opacity-60">{tab.count}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div role="tabpanel">{children}</div>
    </div>
  )
}

export default ProjectTabs
