'use client'

import { ProjectCardSkeleton, Skeleton } from '@/components/ui/skeletons'

const ProjectLoadingState = ({ loading = false }) => {
  if (!loading) return null

  return (
    <div className="mb-12 space-y-4">
      <div className="grid overflow-hidden rounded-2xl border border-border/50 lg:grid-cols-12">
        <Skeleton className="aspect-[16/10] w-full rounded-none lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]" />
        <div className="flex flex-col justify-end gap-4 p-6 md:p-10 lg:col-span-5">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
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
