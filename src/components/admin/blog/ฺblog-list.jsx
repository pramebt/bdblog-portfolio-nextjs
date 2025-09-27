'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Plus, Search, Filter, RefreshCw } from 'lucide-react'
import BlogCard from './blog-card'
import BlogFilters from './blog-filter'
import BlogPagination from './blog-pagination'
import BlogActions from './blog-action'

const BlogList = () => {
  const router = useRouter()
  
  // State management
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPosts, setSelectedPosts] = useState([])
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    published: undefined, // undefined = all, true = published, false = draft
    sort: 'createdAt_desc'
  })

  // Fetch posts from API
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      
      const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.published !== undefined && { published: filters.published.toString() }),
        sort: filters.sort
      })
      
      const response = await fetch(`/api/blog?${searchParams}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch posts')
      }
      
      if (data.success) {
        setPosts(data.data.posts)
        setTotalPosts(data.data.pagination.total)
        setTotalPages(data.data.pagination.pages)
      } else {
        throw new Error(data.error || 'Failed to fetch posts')
      }
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, filters])

  // Initial load and when dependencies change
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  // Handle post selection
  const handlePostSelect = (postId, selected) => {
    if (selected) {
      setSelectedPosts(prev => [...prev, postId])
    } else {
      setSelectedPosts(prev => prev.filter(id => id !== postId))
    }
  }

  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedPosts(posts.map(post => post.id))
    } else {
      setSelectedPosts([])
    }
  }

  // Handle post actions
  const handlePostAction = async (action, postId, data = {}) => {
    try {
      let response
      
      switch (action) {
        case 'delete':
          response = await fetch(`/api/blog/${postId}`, {
            method: 'DELETE'
          })
          break
          
        case 'togglePublish':
        case 'publish':
        case 'unpublish':
          const post = posts.find(p => p.id === postId)
          let publishStatus
          
          if (action === 'publish') {
            publishStatus = true
          } else if (action === 'unpublish') {
            publishStatus = false
          } else {
            // togglePublish
            publishStatus = !post.published
          }
          
          response = await fetch(`/api/blog/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ published: publishStatus })
          })
          break
          
        case 'edit':
          router.push(`/admin/blog/${postId}`)
          return
          
        case 'duplicate':
          // Create a copy of the post
          const originalPost = posts.find(p => p.id === postId)
          if (originalPost) {
            const duplicateData = {
              title: `${originalPost.title} (Copy)`,
              content: originalPost.content,
              excerpt: originalPost.excerpt,
              coverImage: originalPost.coverImage,
              published: false // Always create as draft
            }
            
            response = await fetch('/api/blog', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(duplicateData)
            })
          }
          break
          
        case 'export':
          // Export single post (for now, just log it)
          const exportPost = posts.find(p => p.id === postId)
          if (exportPost) {
            const exportData = {
              title: exportPost.title,
              content: exportPost.content,
              excerpt: exportPost.excerpt,
              published: exportPost.published,
              createdAt: exportPost.createdAt,
              updatedAt: exportPost.updatedAt
            }
            
            // Create and download JSON file
            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${exportPost.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
            
            return // No API call needed for export
          }
          break
          
        default:
          throw new Error(`Unknown action: ${action}`)
      }
      
      if (response) {
        const result = await response.json()
        
        if (!response.ok) {
          throw new Error(result.error || 'Action failed')
        }
      }
      
      // Refresh posts after successful action
      await fetchPosts()
      
      // Remove from selected if deleted
      if (action === 'delete') {
        setSelectedPosts(prev => prev.filter(id => id !== postId))
      }
      
    } catch (err) {
      console.error('Error performing action:', err)
      setError(err.message)
    }
  }

  // Handle bulk actions
  const handleBulkAction = async (action) => {
    if (selectedPosts.length === 0) return
    
    try {
      // Handle bulk export separately
      if (action === 'export') {
        const selectedPostsData = posts.filter(post => selectedPosts.includes(post.id))
        const exportData = selectedPostsData.map(post => ({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          published: post.published,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt
        }))
        
        // Create and download JSON file
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `blog_posts_export_${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        setSelectedPosts([])
        return
      }
      
      // Handle other bulk actions
      const promises = selectedPosts.map(postId => 
        handlePostAction(action, postId)
      )
      
      await Promise.all(promises)
      setSelectedPosts([])
      
    } catch (err) {
      console.error('Error performing bulk action:', err)
      setError(err.message)
    }
  }

  // Refresh data
  const handleRefresh = () => {
    fetchPosts()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Manage your blog posts and content
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => router.push('/admin/blog/create')}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <BlogFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        loading={loading}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {posts.filter(post => post.published).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {posts.filter(post => !post.published).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <BlogActions
          selectedCount={selectedPosts.length}
          onBulkAction={handleBulkAction}
          onSelectAll={handleSelectAll}
          allSelected={selectedPosts.length === posts.length}
          totalCount={posts.length}
        />
      )}

      {/* Posts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-muted rounded mb-4"></div>
                <div className="h-3 bg-muted rounded w-full mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-muted-foreground text-center">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-sm mb-4">
                {filters.search || filters.published !== undefined
                  ? 'Try adjusting your search or filters'
                  : 'Get started by creating your first blog post'
                }
              </p>
              <Button onClick={() => router.push('/admin/blog/create')}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              selected={selectedPosts.includes(post.id)}
              onSelect={handlePostSelect}
              onAction={handlePostAction}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalPosts}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  )
}

export default BlogList