'use client'

import ProjectCard from './ProjectCard'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const ProjectGrid = ({ projects, loading = false }) => {
  if (loading || projects.length === 0) return null

  const [featured, ...rest] = projects

  return (
    <div className="mb-12 space-y-6">
      <ScrollReveal yOffset={24} duration={0.85}>
        <ProjectCard project={featured} featured />
      </ScrollReveal>

      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, index) => (
            <ScrollReveal key={project.id} delay={Math.min(index * 0.06, 0.3)} yOffset={18}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectGrid
