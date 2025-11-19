'use client'

import { Card, CardContent } from '@/components/ui/card'
import { WarningCircle } from '@phosphor-icons/react'

const BlogErrorState = ({ error }) => {
  if (!error) return null

  return (
    <div className="max-w-md mx-auto mb-8">
      <Card className="border-destructive">
        <CardContent className="flex items-center gap-2 p-4">
          <WarningCircle size={20} weight="light" className="text-destructive" />
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogErrorState
