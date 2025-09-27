'use client'

import { Loader2 } from 'lucide-react'

const BlogLoadingState = ({ loading = false, text = "กำลังโหลดบทความ..." }) => {
  if (!loading) return null

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}

export default BlogLoadingState
