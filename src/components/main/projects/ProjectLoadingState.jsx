'use client'

import { ProjectCardSkeleton, Skeleton } from '@/components/ui/skeletons'

const ProjectLoadingState = ({ loading = false }) => {
  if (!loading) return null

  return (
    <div className="mb-12 space-y-6">
      <div className="overflow-hidden rounded-3xl border border-border/50">
        <Skeleton className="aspect-[16/10] w-full rounded-none md:aspect-[21/9]" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export default ProjectLoadingState
