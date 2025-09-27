'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen,
  Loader2,
  AlertCircle 
} from 'lucide-react'

const BlogPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)

  // Fetch posts
  const fetchPosts = async (page = 1, search = '') => {
    try {
      setLoading(true)
      setError('')
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        published: 'true'
      })
      
      if (search) {
        params.append('search', search)
      }
      
      const response = await fetch(`/api/blog?${params}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch posts')
      }
      
      if (data.success) {
        setPosts(data.data.posts)
        setCurrentPage(data.data.pagination.page)
        setTotalPages(data.data.pagination.pages)
        setTotalPosts(data.data.pagination.total)
      }
      
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchPosts(1, searchTerm)
  }, [])

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    fetchPosts(1, searchTerm)
  }

  // Handle pagination
  const handlePageChange = (page) => {
    fetchPosts(page, searchTerm)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            เรียนรู้เทคโนโลยีใหม่ๆ แบ่งปันประสบการณ์ และเคล็ดลับการพัฒนาเว็บ
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ค้นหาบทความ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'ค้นหา'}
            </Button>
          </form>
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              {searchTerm ? (
                <>ผลการค้นหา "{searchTerm}": {totalPosts} บทความ</>
              ) : (
                <>ทั้งหมด {totalPosts} บทความ</>
              )}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto mb-8">
            <Card className="border-destructive">
              <CardContent className="flex items-center gap-2 p-4">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">กำลังโหลดบทความ...</p>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
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
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  ก่อนหน้า
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  ถัดไป
                </Button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && !error && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm ? 'ไม่พบบทความที่ค้นหา' : 'ยังไม่มีบทความ'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? 'ลองใช้คำค้นหาอื่นหรือเรียกดูบทความทั้งหมด'
                : 'กลับมาดูใหม่ในภายหลัง เราจะมีบทความน่าสนใจมาแบ่งปัน'
              }
            </p>
            {searchTerm && (
              <Button onClick={() => {
                setSearchTerm('')
                fetchPosts(1, '')
              }}>
                ดูบทความทั้งหมด
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPage