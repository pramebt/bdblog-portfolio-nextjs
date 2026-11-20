'use client'

import ViewToggle from './ViewToggle'

const ProjectResultsInfo = ({ searchTerm, totalProjects, loading = false, view = 'grid', onViewChange }) => {
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

      {onViewChange && <ViewToggle view={view} onViewChange={onViewChange} />}
    </div>
  )
}

export default ProjectResultsInfo
