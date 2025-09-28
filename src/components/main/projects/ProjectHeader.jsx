'use client'

import { FolderOpen } from 'lucide-react'

const ProjectHeader = ({ 
  title = "Projects", 
  description = "Explore my projects from web applications to tools and experiments" 
}) => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <FolderOpen className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      </div>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  )
}

export default ProjectHeader
