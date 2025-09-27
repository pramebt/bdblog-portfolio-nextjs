import React from 'react'
import ProjectList from '@/components/admin/projects/project-list'

const ProjectAdminPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Container */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Content */}
        <div className="max-w-7xl mx-auto">
          <ProjectList />
        </div>
      </div>
    </div>
  )
}

export default ProjectAdminPage
