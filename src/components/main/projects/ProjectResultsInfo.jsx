'use client'

const ProjectResultsInfo = ({ searchTerm, totalProjects, loading = false }) => {
  if (loading) return null

  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <p className="font-mono text-xs tracking-wide text-muted-foreground">
        {searchTerm ? (
          <>
            Results for “{searchTerm}” · {totalProjects}
          </>
        ) : (
          <>{totalProjects} projects</>
        )}
      </p>
    </div>
  )
}

export default ProjectResultsInfo
