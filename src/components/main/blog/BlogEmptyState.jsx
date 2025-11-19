'use client'

import { Button } from '@/components/ui/button'
import { BookOpen } from '@phosphor-icons/react/dist/ssr'

const BlogEmptyState = ({ 
  searchTerm, 
  onClearSearch,
  noResultsTitle = 'No blog posts found',
  noResultsDescription = 'Try another search or view all blog posts',
  emptyTitle = 'No blog posts found',
  emptyDescription = 'Come back later, we will have interesting blog posts to share',
  viewAllText = 'View all blog posts'
}) => {
  return (
    <div className="text-center py-20">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
          <BookOpen size={40} weight="light" className="text-muted-foreground/60" />
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

export default BlogEmptyState
