'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, User, ArrowRight, Eye } from 'lucide-react'
import ImageModal from '@/components/shared/ImageModal'

const BlogCard = ({ post }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Extract text from content blocks
  const extractTextFromContent = (content) => {
    try {
      const blocks = JSON.parse(content)
      return blocks
        .filter(block => ['paragraph', 'heading1', 'heading2', 'heading3'].includes(block.type))
        .map(block => block.content || '')
        .join(' ')
        .substring(0, 150) + '...'
    } catch {
      return content.substring(0, 150) + '...'
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden group/image rounded-lg m-4">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer rounded-lg"
            onClick={() => setIsImageModalOpen(true)}
          />
          
          {/* Image View Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-black shadow-lg"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsImageModalOpen(true)
              }}
            >
              <Eye className="h-4 w-4 mr-1" />
              ดูรูป
            </Button>
          </div>
        </div>
      )}
      
      <CardHeader>
        <div className="space-y-2">
          <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </CardTitle>
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.createdAt)}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author.name}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Excerpt */}
        <CardDescription className="line-clamp-3">
          {post.excerpt || extractTextFromContent(post.content)}
        </CardDescription>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <Separator />

        {/* Read More */}
        <Button asChild variant="ghost" className="w-full justify-between p-0 h-auto">
          <Link href={`/blog/${post.slug}`}>
            อ่านต่อ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>

      {/* Image Modal */}
      {post.coverImage && (
        <ImageModal
          src={post.coverImage}
          alt={post.title}
          title={post.title}
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
    </Card>
  )
}

export default BlogCard
