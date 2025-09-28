'use client'

import { Button } from '@/components/ui/button'

const BlogPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  prevText = "ก่อนหน้า",
  nextText = "ถัดไป"
}) => {
  if (totalPages <= 1) return null

  const handlePageChange = (page) => {
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex justify-center items-center gap-3">
      <Button
        variant="ghost"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-full px-6 py-3 text-base font-medium hover:bg-muted/50 disabled:opacity-30"
      >
        {prevText}
      </Button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            size="sm"
            onClick={() => handlePageChange(page)}
            className={`
              rounded-full w-10 h-10 p-0 text-base font-medium
              ${currentPage === page 
                ? 'bg-foreground text-background hover:bg-foreground/90' 
                : 'hover:bg-muted/50'
              }
            `}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-full px-6 py-3 text-base font-medium hover:bg-muted/50 disabled:opacity-30"
      >
        {nextText}
      </Button>
    </div>
  )
}

export default BlogPagination
