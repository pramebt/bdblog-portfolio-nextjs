'use client'

import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'

const BlogEmptyState = ({ 
  searchTerm, 
  onClearSearch,
  noResultsTitle = 'ไม่พบบทความที่ค้นหา',
  noResultsDescription = 'ลองใช้คำค้นหาอื่นหรือเรียกดูบทความทั้งหมด',
  emptyTitle = 'ยังไม่มีบทความ',
  emptyDescription = 'กลับมาดูใหม่ในภายหลัง เราจะมีบทความน่าสนใจมาแบ่งปัน',
  viewAllText = 'ดูบทความทั้งหมด'
}) => {
  return (
    <div className="text-center py-12">
      <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">
        {searchTerm ? noResultsTitle : emptyTitle}
      </h3>
      <p className="text-muted-foreground mb-6">
        {searchTerm ? noResultsDescription : emptyDescription}
      </p>
      {searchTerm && onClearSearch && (
        <Button onClick={onClearSearch}>
          {viewAllText}
        </Button>
      )}
    </div>
  )
}

export default BlogEmptyState
