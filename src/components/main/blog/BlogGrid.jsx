'use client'

import BlogCard from './BlogCard'

const BlogGrid = ({ posts, loading = false }) => {
  if (loading || posts.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default BlogGrid
