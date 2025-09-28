import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "./skeleton"

export function CardSkeleton({ showImage = true, showFooter = true }) {
  return (
    <Card className="overflow-hidden">
      {showImage && (
        <div className="relative aspect-video">
          <Skeleton className="h-full w-full rounded-none" />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {showFooter && (
          <div className="flex justify-between items-center pt-4">
            <Skeleton className="h-6 w-16" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function BlogCardSkeleton() {
  return <CardSkeleton showImage={true} showFooter={true} />
}

export function ProjectCardSkeleton() {
  return <CardSkeleton showImage={true} showFooter={true} />
}

