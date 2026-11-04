'use client'

import BlogCard from './BlogCard'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const BlogGrid = ({ posts, loading = false }) => {
  if (loading || posts.length === 0) return null

  const [featured, ...rest] = posts

  return (
    <div className="mb-12 space-y-6">
      <ScrollReveal yOffset={24} duration={0.85}>
        <BlogCard post={featured} featured />
      </ScrollReveal>

      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <ScrollReveal key={post.id} delay={Math.min(index * 0.06, 0.3)} yOffset={18}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogGrid
