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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <BlogHeader />

        {/* Search */}
        <BlogSearch 
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          loading={loading}
        />

        {/* Results Info */}
        <BlogResultsInfo 
          searchTerm={searchTerm}
          totalPosts={totalPosts}
          loading={loading}
        />

        {/* Error State */}
        <BlogErrorState error={error} />

        {/* Loading State */}
        <BlogLoadingState loading={loading} />

        {/* Posts Grid */}
        <BlogGrid posts={posts} loading={loading} />

        {/* Pagination */}
        <BlogPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Empty State */}
        {!loading && posts.length === 0 && !error && (
          <BlogEmptyState 
            searchTerm={searchTerm}
            onClearSearch={handleClearSearch}
          />
        )}
      </div>
    </div>
  )
}

export default BlogPage