'use client'

import { Button } from '@/components/ui/button'
import { FolderOpen } from 'lucide-react'

const ProjectEmptyState = ({ 
  searchTerm, 
  onClearSearch,
  noResultsTitle = 'ไม่พบโปรเจคที่ค้นหา',
  noResultsDescription = 'ลองใช้คำค้นหาอื่นหรือเรียกดูโปรเจคทั้งหมด',
  emptyTitle = 'ยังไม่มีโปรเจค',
  emptyDescription = 'กลับมาดูใหม่ในภายหลัง จะมีโปรเจคน่าสนใจมาแบ่งปัน',
  viewAllText = 'ดูโปรเจคทั้งหมด'
}) => {
  return (
    <div className="text-center py-12">
      <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
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

export default ProjectEmptyState
