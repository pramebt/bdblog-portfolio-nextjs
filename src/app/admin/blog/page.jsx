import React from 'react'
import BlogList from '@/components/admin/blog/ฺblog-list'

const BlogAdminPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Container */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Content */}
        <div className="max-w-7xl mx-auto">
          <BlogList />
        </div>
      </div>
    </div>
  )
}

export default BlogAdminPage 