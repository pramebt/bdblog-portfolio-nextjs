'use client'

import BlogCard from './BlogCard'
import { FadeIn } from '@/components/ui/animations'

const BlogGrid = ({ posts, loading = false }) => {
  if (loading || posts.length === 0) return null

  return (
    <FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.map((post, index) => (
          <FadeIn key={post.id} delay={index * 50}>
            <BlogCard post={post} />
          </FadeIn>
        ))}
      </div>
    </FadeIn>
  )
}

export default BlogGrid
