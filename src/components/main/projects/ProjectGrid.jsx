'use client'

import ProjectCard from './ProjectCard'

const ProjectGrid = ({ projects, loading = false }) => {
  if (loading || projects.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectGrid
