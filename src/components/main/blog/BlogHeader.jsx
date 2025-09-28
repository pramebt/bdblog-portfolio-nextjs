'use client'

import { BookOpen } from 'lucide-react'

const BlogHeader = ({ title = "Blog", description = "Learn new technologies, share experiences, and tips for web development" }) => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      </div>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  )
}

export default BlogHeader
