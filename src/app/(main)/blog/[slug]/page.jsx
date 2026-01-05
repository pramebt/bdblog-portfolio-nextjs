'use client'

import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  BookOpen,
  Loader2,
  AlertCircle,
  Hash,
  Clock
} from 'lucide-react'
import { motion } from "framer-motion";
import { TracingBeam } from "@/components/ui/tracing-beam";
const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1 justify-center"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
      <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
      <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
      <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
      <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
    </motion.div>
  );
};
// Block Preview Component (similar to admin preview)
const BlockPreview = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading1':
            return (
              <h1 key={block.id} className="text-2xl sm:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 first:mt-0">
                {block.content}
              </h1>
            )
          case 'heading2':
            return (
              <h2 key={block.id} className="text-xl sm:text-2xl font-semibold mt-5 sm:mt-6 mb-2 sm:mb-3">
                {block.content}
              </h2>
            )
          case 'heading3':
            return (
              <h3 key={block.id} className="text-lg sm:text-xl font-medium mt-4 mb-2">
                {block.content}
              </h3>
            )
          case 'paragraph':
            return (
              <p key={block.id} className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                {block.content}
              </p>
            )
          case 'list':
            const listItems = block.content.split('\n').filter(item => item.trim())
            return (
              <ul key={block.id} className="list-disc list-inside mb-3 sm:mb-4 space-y-1 text-sm sm:text-base">
                {listItems.map((item, index) => (
                  <li key={index} className="leading-relaxed">
                    {item.replace(/^[•\-\*]\s*/, '')}
                  </li>
                ))}
              </ul>
            )
          case 'quote':
            return (
              <blockquote key={block.id} className="border-l-4 border-primary pl-3 sm:pl-4 italic my-4 sm:my-6 text-muted-foreground text-sm sm:text-base">
                {block.content}
              </blockquote>
            )
          case 'code':
            return (
              <div key={block.id} className="mb-4 sm:mb-6">
                <pre className="bg-muted p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code className={`language-${block.language || 'text'}`}>
                    {block.content}
                  </code>
                </pre>
              </div>
            )
          case 'image':
            return (
              <div key={block.id} className="my-6 sm:my-8">
                <img
                  src={block.content}
                  alt={block.alt || 'Blog image'}
                  className="w-full rounded-lg shadow-md"
                />
                {block.alt && (
                  <p className="text-center text-xs sm:text-sm text-muted-foreground mt-2">
                    {block.alt}
                  </p>
                )}
              </div>
            )
          default:
            return (
              <div key={block.id} className="mb-3 sm:mb-4 text-sm sm:text-base">
                {block.content}
              </div>
            )
        }
      })}
    </div>
  )
}

const BlogPostPage = () => {
  const params = useParams()
  const slug = params.slug
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  // Fetch post by slug
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError('')
        
        const response = await fetch(`/api/blog/${slug}`)
        const data = await response.json()
        
        if (!response.ok) {
          if (response.status === 404) {
            notFound()
            return
          }
          throw new Error(data.error || 'Failed to fetch post')
        }
        
        if (data.success) {
          // Only show published posts to public
          if (!data.data.published) {
            notFound()
            return
          }
          setPost(data.data)
        }
        
      } catch (err) {
        console.error('Error fetching post:', err)
        setError(err.message)
      } finally {
        // เพิ่ม delay เพื่อดู loading animation
          setLoading(false)

      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Calculate reading time
  const calculateReadingTime = (content) => {
    try {
      const blocks = JSON.parse(content)
      const text = blocks
        .filter(block => ['paragraph', 'heading1', 'heading2', 'heading3', 'list', 'quote'].includes(block.type))
        .map(block => block.content || '')
        .join(' ')
      
      const wordsPerMinute = 200 // Average reading speed
      const words = text.split(/\s+/).length
      const minutes = Math.ceil(words / wordsPerMinute)
      return minutes
    } catch {
      return 5 // Default reading time
    }
  }

  // Share functionality
  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || 'อ่านบทความนี้',
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
        // Fallback to copy URL
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied!')
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied!')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <BarLoader />
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-12">
            <AlertCircle className="h-16 w-16 mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">เกิดข้อผิดพลาด</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog List
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return notFound()
  }

  // Parse content blocks
  let contentBlocks = []
  try {
    contentBlocks = JSON.parse(post.content)
  } catch {
    contentBlocks = [{ id: '1', type: 'paragraph', content: post.content }]
  }

  return (
    <TracingBeam className='px-2 sm:px-5'>
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Button variant="ghost" size="sm" className="sm:size-default" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to blog</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-6 sm:mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-6 sm:mb-8">
            <div className="space-y-3 sm:space-y-4">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm">
                      <Hash className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{calculateReadingTime(post.content)} นาที</span>
                  </div>
                </div>

                {/* Share Button */}
                <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto" onClick={handleShare}>
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  <span className="hidden sm:inline">แบ่งปัน</span>
                  <span className="sm:hidden">Share</span>
                </Button>
              </div>

              <Separator />
            </div>
          </header>

          {/* Content */}
          <div className="mb-8 sm:mb-12">
            <BlockPreview blocks={contentBlocks} />
          </div>

          {/* Footer */}
          <footer className="space-y-4 sm:space-y-6">
            <Separator />
            
            {/* Author Info */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  เกี่ยวกับผู้เขียน
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base">{post.author.name}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                      นักพัฒนาเว็บที่หลงใหลในการเรียนรู้เทคโนโลยีใหม่ๆ และชอบแบ่งปันความรู้
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
              <Button asChild variant="outline" size="sm" className="sm:size-default w-full sm:w-auto">
                <Link href="/blog">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">ดูบทความอื่นๆ</span>
                  <span className="sm:hidden">บทความอื่นๆ</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" className="sm:size-default w-full sm:w-auto" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">แบ่งปันบทความ</span>
                <span className="sm:hidden">Share</span>
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </div>
    </TracingBeam>
  )
}

export default BlogPostPage
