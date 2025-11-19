'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, User, ArrowRight, Eye } from '@phosphor-icons/react'
import ImageModal from '@/components/shared/ImageModal'
import { HoverLift, FadeIn } from '@/components/ui/animations'

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
    <Card className="overflow-hidden group h-full flex flex-col bg-card/50 backdrop-blur-sm border-border/50 hover:border-border hover:bg-card/80 hover:shadow-lg transition-all duration-300">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-video overflow-hidden rounded-lg m-4">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover  transition-transform duration-500 cursor-pointer rounded-lg"
              onClick={() => setIsImageModalOpen(true)}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            
            {/* Image View Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-95">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/95 hover:bg-white text-black shadow-xl backdrop-blur-sm border-0 transform hover:scale-105 transition-transform"
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
        
        <div className="flex flex-col flex-1">
          <CardHeader className="flex-none">
            <div className="space-y-3">
              <CardTitle className="line-clamp-2 text-lg font-semibold group-hover:text-primary transition-colors duration-200 leading-tight">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
              
              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="font-medium">{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <User className="h-3.5 w-3.5" />
                  <span className="font-medium">{post.author.name}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col space-y-4">
            {/* Excerpt */}
            <CardDescription className="line-clamp-3 text-sm leading-relaxed flex-1">
              {post.excerpt || extractTextFromContent(post.content)}
            </CardDescription>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs px-2 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-1 border-dashed">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            <Separator className="my-2" />

            {/* Read More */}
            <Button 
              asChild 
              variant="ghost" 
              className="w-full justify-between p-3 h-auto group-hover:bg-primary/5 transition-colors duration-200 mt-auto"
            >
              <Link href={`/blog/${post.slug}`} className="flex items-center justify-between w-full">
                <span className="font-medium">อ่านต่อ</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
          </CardContent>
        </div>

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
