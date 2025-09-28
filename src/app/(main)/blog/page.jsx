'use client'

import { useState, useEffect } from 'react'
import BlogHeader from '@/components/main/blog/BlogHeader'
import BlogSearch from '@/components/main/blog/BlogSearch'
import BlogResultsInfo from '@/components/main/blog/BlogResultsInfo'
import BlogGrid from '@/components/main/blog/BlogGrid'
import BlogPagination from '@/components/main/blog/BlogPagination'
import BlogEmptyState from '@/components/main/blog/BlogEmptyState'
import BlogErrorState from '@/components/main/blog/BlogErrorState'
import BlogLoadingState from '@/components/main/blog/BlogLoadingState'

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
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('')
    fetchPosts(1, '')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">
            Blog
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Thoughts, tutorials, and insights about web development and technology.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <BlogSearch 
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              onSubmit={handleSearch}
              loading={loading}
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Results Info */}
          {!loading && totalPosts > 0 && (
            <div className="text-center mb-12">
              <p className="text-lg text-muted-foreground">
                {searchTerm ? `Found ${totalPosts} articles for "${searchTerm}"` : `${totalPosts} articles`}
              </p>
            </div>
          )}

          {/* Error State */}
          <BlogErrorState error={error} />

          {/* Loading State */}
          <BlogLoadingState loading={loading} />

          {/* Posts Grid */}
          <BlogGrid posts={posts} loading={loading} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16">
              <BlogPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {/* Empty State */}
          {!loading && posts.length === 0 && !error && (
            <BlogEmptyState 
              searchTerm={searchTerm}
              onClearSearch={handleClearSearch}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default BlogPage