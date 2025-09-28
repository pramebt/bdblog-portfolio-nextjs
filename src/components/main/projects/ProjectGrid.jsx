'use client'

import ProjectCard from './ProjectCard'
import { FadeIn } from '@/components/ui/animations'

const ProjectGrid = ({ projects, loading = false }) => {
  if (loading || projects.length === 0) return null

  return (
    <FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {projects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 50}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </FadeIn>
  )
}

export default ProjectGrid
