'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import ProjectCard from '@/components/main/projects/ProjectCard'
import ProjectIndexList from '@/components/main/projects/ProjectIndexList'
import ViewToggle from '@/components/main/projects/ViewToggle'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const REST_SPANS = ['lg:col-span-7', 'lg:col-span-5']

const HomeProjects = ({ projects }) => {
  const [view, setView] = useState('grid')

  if (projects.length === 0) return null

  const [featured, ...rest] = projects

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-mono text-xs tracking-wide text-muted-foreground">
          Latest {projects.length} projects
        </p>
        <ViewToggle view={view} onViewChange={setView} layoutId="home-project-view-indicator" />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {view === 'index' ? (
          <motion.div
            key="index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectIndexList projects={projects} />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ScrollReveal yOffset={24} duration={0.85}>
              <ProjectCard project={featured} index={1} variant="featured" />
            </ScrollReveal>

            {rest.length > 0 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
                {rest.map((project, i) => (
                  <ScrollReveal
                    key={project.id}
                    className={rest.length === 1 ? 'md:col-span-2 lg:col-span-12' : REST_SPANS[i]}
                    delay={i * 0.08}
                    yOffset={20}
                  >
                    <ProjectCard project={project} index={i + 2} variant={rest.length === 1 ? 'wide' : 'card'} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomeProjects
