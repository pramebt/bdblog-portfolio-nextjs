'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Calendar, 
  User, 
  Clock,
  ExternalLink
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'

const BlogCard = ({ post, selected, onSelect, onAction }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  // Format dates
  const createdDate = new Date(post.createdAt)
  const updatedDate = new Date(post.updatedAt)
  const isRecentlyUpdated = updatedDate.getTime() - createdDate.getTime() > 60000 // 1 minute

  // Handle checkbox selection
  const handleSelect = (checked) => {
    onSelect(post.id, checked)
  }

  // Handle action with loading state
  const handleAction = async (action) => {
    if (action === 'delete') {
      setIsDeleting(true)
    } else if (action === 'togglePublish') {
      setIsToggling(true)
    }

    try {
      await onAction(action, post.id)
    } finally {
      setIsDeleting(false)
      setIsToggling(false)
    }
  }

  // Handle edit navigation
  const handleEdit = () => {
    router.push(`/admin/blog/${post.id}`)
  }

  // Handle view post (if published)
  const handleView = () => {
    if (post.published) {
      window.open(`/blog/${post.slug}`, '_blank')
    }
  }

  return (
    <Card className={`group hover:shadow-md transition-all duration-200 ${
      selected ? 'ring-2 ring-primary' : ''
    }`}>
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <div className="text-muted-foreground text-center">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-sm">No Image</div>
            </div>
          </div>
        )}
        
        {/* Selection Checkbox */}
        <div className="absolute top-3 left-3 z-10">
          <Checkbox
            checked={selected}
            onCheckedChange={handleSelect}
            className="h-4 w-4 bg-background/80 backdrop-blur-sm"
          />
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 right-12 z-10">
          <Badge 
            variant={post.published ? "default" : "secondary"}
            className="bg-background/80 backdrop-blur-sm"
          >
            {post.published ? (
              <>
                <Eye className="h-3 w-3 mr-1" />
                Published
              </>
            ) : (
              <>
                <EyeOff className="h-3 w-3 mr-1" />
                Draft
              </>
            )}
          </Badge>
        </div>

        {/* Action Menu */}
        <div className="absolute top-3 right-3 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Post
              </DropdownMenuItem>
              
              {post.published && (
                <DropdownMenuItem onClick={handleView}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Post
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={() => handleAction('togglePublish')}
                disabled={isToggling}
              >
                {post.published ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Unpublish
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Publish
                  </>
                )}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={() => handleAction('delete')}
                disabled={isDeleting}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Card Content */}
      <CardHeader className="pb-3">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Author Info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{post.author?.name || 'Unknown Author'}</span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Dates */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Created {formatDistanceToNow(createdDate, { addSuffix: true })}</span>
            </div>
            
            {isRecentlyUpdated && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Updated {formatDistanceToNow(updatedDate, { addSuffix: true })}</span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            
            {post.published ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleView}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction('togglePublish')}
                disabled={isToggling}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-1" />
                Publish
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BlogCard