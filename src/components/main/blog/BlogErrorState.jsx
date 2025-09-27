'use client'

import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

const BlogErrorState = ({ error }) => {
  if (!error) return null

  return (
    <div className="max-w-md mx-auto mb-8">
      <Card className="border-destructive">
        <CardContent className="flex items-center gap-2 p-4">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogErrorState
