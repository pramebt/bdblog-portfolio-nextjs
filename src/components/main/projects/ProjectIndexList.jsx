'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { formatIndex, getTypeLabel } from './ProjectCard'

const PREVIEW_WIDTH = 320
const PREVIEW_HEIGHT = 200

const ProjectIndexList = ({ projects, startIndex = 1 }) => {
  const [active, setActive] = useState(null)
  const reduceMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 260, damping: 28, mass: 0.6 }
  const x = useSpring(mouseX, reduceMotion ? { duration: 0 } : springConfig)
  const y = useSpring(mouseY, reduceMotion ? { duration: 0 } : springConfig)

  const handleMouseMove = (e) => {
    const maxX = window.innerWidth - PREVIEW_WIDTH - 16
    mouseX.set(Math.min(e.clientX + 28, maxX))
    mouseY.set(e.clientY - PREVIEW_HEIGHT / 2)
  }

  const activeProject = active !== null ? projects[active] : null

  return (
    <div
      className="group/list relative border-t border-border/60"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActive(null)}
    >
      {projects.map((project, i) => (
        <Link
          key={project.id}
          href={`/projects/${project.slug}`}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onBlur={() => setActive(null)}
          className="group/row grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-border/60 py-6 transition-opacity duration-500 group-hover/list:opacity-35 hover:opacity-100! md:grid-cols-[4rem_1fr_9rem_5rem_2.5rem] md:gap-6 md:py-8"
        >
          <span className="font-mono text-xs text-muted-foreground">{formatIndex(startIndex + i)}</span>

          <div className="flex min-w-0 items-center gap-4">
            {project.coverImage && (
              <img
                src={project.coverImage}
                alt=""
                loading="lazy"
                className="h-12 w-16 shrink-0 rounded-lg border border-border/60 object-cover md:hidden"
              />
            )}
            <h3 className="truncate text-xl font-semibold tracking-tight text-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:text-4xl">
              {project.title}
            </h3>
          </div>

          <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:block">
            {getTypeLabel(project.type)}
          </span>
          <span className="hidden font-mono text-xs text-muted-foreground md:block">
            {new Date(project.createdAt).getFullYear()}
          </span>

          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:rotate-45 group-hover/row:border-foreground group-hover/row:bg-foreground group-hover/row:text-background">
            <ArrowUpRight size={16} weight="bold" />
          </span>
        </Link>
      ))}

      <motion.div
        aria-hidden
        style={{ x, y, width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
      >
        <AnimatePresence>
          {activeProject?.coverImage && (
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-2xl shadow-foreground/10"
            >
              <img src={activeProject.coverImage} alt="" className="h-full w-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default ProjectIndexList
