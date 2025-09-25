'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreHorizontal
} from 'lucide-react'

const BlogPagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const [isChangingPage, setIsChangingPage] = useState(false)

  // Calculate pagination info
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Near beginning: 1, 2, 3, 4, ..., last
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Near end: 1, ..., last-3, last-2, last-1, last
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Middle: 1, ..., current-1, current, current+1, ..., last
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }
    
    return pages
  }, [currentPage, totalPages])

  // Handle page change with loading state
  const handlePageChange = async (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return
    
    setIsChangingPage(true)
    try {
      await onPageChange(page)
    } finally {
      setIsChangingPage(false)
    }
  }

  // Handle items per page change
  const handleItemsPerPageChange = (value) => {
    const newItemsPerPage = parseInt(value)
    onItemsPerPageChange(newItemsPerPage)
  }

  // Don't render if only one page
  if (totalPages <= 1) return null

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Items Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              Showing {startItem} to {endItem} of {totalItems} posts
            </span>
            
            {/* Items per page selector */}
            <div className="flex items-center gap-2">
              <span>Show:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={handleItemsPerPageChange}
                disabled={isChangingPage}
              >
                <SelectTrigger className="w-20 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span>per page</span>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1">
            {/* First Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(1)}
              disabled={!hasPrevPage || isChangingPage}
              className="h-8 w-8 p-0"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>

            {/* Previous Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrevPage || isChangingPage}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {pageNumbers.map((page, index) => {
                if (page === 'ellipsis') {
                  return (
                    <div
                      key={`ellipsis-${index}`}
                      className="flex items-center justify-center h-8 w-8"
                    >
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )
                }

                const isCurrentPage = page === currentPage
                return (
                  <Button
                    key={page}
                    variant={isCurrentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    disabled={isChangingPage}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                )
              })}
            </div>

            {/* Next Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage || isChangingPage}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Last Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(totalPages)}
              disabled={!hasNextPage || isChangingPage}
              className="h-8 w-8 p-0"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Page Info */}
        <div className="mt-3 text-center text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
      </CardContent>
    </Card>
  )
}

export default BlogPagination