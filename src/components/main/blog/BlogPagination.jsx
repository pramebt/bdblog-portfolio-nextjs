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
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {prevText}
      </Button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        {nextText}
      </Button>
    </div>
  )
}

export default BlogPagination
