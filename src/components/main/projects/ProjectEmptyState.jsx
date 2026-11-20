'use client'

import { FolderOpen } from '@phosphor-icons/react/dist/ssr'

const ProjectEmptyState = ({ 
  searchTerm, 
  onClearSearch,
  noResultsTitle = 'No projects found',
  noResultsDescription = 'Try another search or view all projects',
  emptyTitle = 'No projects found',
  emptyDescription = 'Come back later, there will be interesting projects to share',
  viewAllText = 'View all projects'
}) => {
  return (
    <div className="py-20 text-center">
      <div className="mx-auto max-w-md">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-muted/30">
          <FolderOpen size={30} weight="duotone" className="text-muted-foreground" />
        </div>
        <h3 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          {searchTerm ? noResultsTitle : emptyTitle}
        </h3>
        <p className="mb-8 font-light leading-relaxed text-muted-foreground">
          {searchTerm ? noResultsDescription : emptyDescription}
        </p>
        {searchTerm && onClearSearch && (
          <button
            type="button"
            onClick={onClearSearch}
            className="inline-flex items-center rounded-full border border-border/70 px-6 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:border-foreground/25 hover:text-foreground"
          >
            {viewAllText}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProjectEmptyState
