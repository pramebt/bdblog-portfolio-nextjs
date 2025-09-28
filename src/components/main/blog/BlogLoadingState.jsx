'use client'

import { GridSkeleton, BlogCardSkeleton } from '@/components/ui/skeletons'
import { FadeIn, LoadingSpinner } from '@/components/ui/animations'

const BlogLoadingState = ({ 
  loading = false, 
  text = "กำลังโหลดบทความ...", 
  count = 6,
  useSkeletons = true 
}) => {
  if (!loading) return null

  if (useSkeletons) {
    return (
      <FadeIn>
        <GridSkeleton 
          count={count}
          component={BlogCardSkeleton}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        />
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <LoadingSpinner className="mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">{text}</p>
        </div>
      </div>
    </FadeIn>
  )
}

export default BlogLoadingState
