'use client'

const ProjectResultsInfo = ({ searchTerm, totalProjects, loading = false }) => {
  if (loading) return null

  return (
    <div className="text-center mb-8">
      <p className="text-muted-foreground">
        {searchTerm ? (
          <>ผลการค้นหา "{searchTerm}": {totalProjects} โปรเจค</>
        ) : (
          <>ทั้งหมด {totalProjects} โปรเจค</>
        )}
      </p>
    </div>
  )
}

export default ProjectResultsInfo
