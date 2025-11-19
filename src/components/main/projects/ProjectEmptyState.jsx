'use client'

import { Button } from '@/components/ui/button'
import { FolderOpen } from '@phosphor-icons/react'

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
    <div className="text-center py-20">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
          <FolderOpen size={40} weight="light" className="text-muted-foreground/60" />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-foreground">
          {searchTerm ? noResultsTitle : emptyTitle}
        </h3>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {searchTerm ? noResultsDescription : emptyDescription}
        </p>
        {searchTerm && onClearSearch && (
          <Button 
            onClick={onClearSearch}
            variant="ghost"
            className="rounded-full px-8 py-3 text-base font-medium hover:bg-muted/50"
          >
            {viewAllText}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProjectEmptyState
