import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import BlogForm from '@/components/admin/blog/blog-form'

export default function CreateBlogPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Container */}
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog List
          </Button>
        </div>
        
        {/* Page Content */}
        <div className="max-w-7xl mx-auto">
          <BlogForm />
        </div>
      </div>
    </div>
  )
}
