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
    <div className="prose prose-lg max-w-none">
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading1':
            return (
              <h1 key={block.id} className="text-3xl font-bold mt-8 mb-4 first:mt-0">
                {block.content}
              </h1>
            )
          case 'heading2':
            return (
              <h2 key={block.id} className="text-2xl font-semibold mt-6 mb-3">
                {block.content}
              </h2>
            )
          case 'heading3':
            return (
              <h3 key={block.id} className="text-xl font-medium mt-4 mb-2">
                {block.content}
              </h3>
            )
          case 'paragraph':
            return (
              <p key={block.id} className="mb-4 leading-relaxed">
                {block.content}
              </p>
            )
          case 'list':
            const listItems = block.content.split('\n').filter(item => item.trim())
            return (
              <ul key={block.id} className="list-disc list-inside mb-4 space-y-1">
                {listItems.map((item, index) => (
                  <li key={index} className="leading-relaxed">
                    {item.replace(/^[•\-\*]\s*/, '')}
                  </li>
                ))}
              </ul>
            )
          case 'quote':
            return (
              <blockquote key={block.id} className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
                {block.content}
              </blockquote>
            )
          case 'code':
            return (
              <div key={block.id} className="mb-6">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className={`language-${block.language || 'text'}`}>
                    {block.content}
                  </code>
                </pre>
              </div>
            )
          case 'image':
            return (
              <div key={block.id} className="my-8">
                <img
                  src={block.content}
                  alt={block.alt || 'Blog image'}
                  className="w-full rounded-lg shadow-md"
                />
                {block.alt && (
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    {block.alt}
                  </p>
                )}
              </div>
            )
          default:
            return (
              <div key={block.id} className="mb-4">
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
        setTimeout(() => {
          setLoading(false)
        }, 6000) // รอ 3 วินาที
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
        alert('ลิงก์ถูกคัดลอกแล้ว!')
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('ลิงก์ถูกคัดลอกแล้ว!')
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to blog
            </Link>
          </Button>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <div className="space-y-4">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      <Hash className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{calculateReadingTime(post.content)} นาทีในการอ่าน</span>
                  </div>
                </div>

                {/* Share Button */}
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  แบ่งปัน
                </Button>
              </div>

              <Separator />
            </div>
          </header>

          {/* Content */}
          <div className="mb-12">
            <BlockPreview blocks={contentBlocks} />
          </div>

          {/* Footer */}
          <footer className="space-y-6">
            <Separator />
            
            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  เกี่ยวกับผู้เขียน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{post.author.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      นักพัฒนาเว็บที่หลงใหลในการเรียนรู้เทคโนโลยีใหม่ๆ และชอบแบ่งปันความรู้
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button asChild variant="outline">
                <Link href="/blog">
                  <BookOpen className="h-4 w-4 mr-2" />
                  ดูบทความอื่นๆ
                </Link>
              </Button>
              
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                แบ่งปันบทความ
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
}

export default BlogPostPage
