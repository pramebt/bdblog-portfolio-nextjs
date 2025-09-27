'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import BlogForm from '@/components/admin/blog/blog-form'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle } from 'lucide-react'

export default function EditBlogPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params.id
  
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleBack = () => {
    router.back()
  }

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError('')
        
        const response = await fetch(`/api/blog/${postId}`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch post')
        }
        
        if (data.success) {
          setPost(data.data)
        } else {
          throw new Error(data.error || 'Post not found')
        }
        
      } catch (err) {
        console.error('Error fetching post:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchPost()
    }
  }, [postId])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Loading post...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>

            {/* Error Alert */}
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>

            <div className="mt-6 text-center">
              <Button onClick={() => router.push('/admin/blog')}>
                Go to Blog List
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // No post found
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            
            <Card>
              <CardContent className="py-12">
                <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Post Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  The blog post you're looking for doesn't exist or has been deleted.
                </p>
                <Button onClick={() => router.push('/admin/blog')}>
                  Go to Blog List
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Main edit form
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog List
            </Button>
          </div>

          {/* Blog Form */}
          <BlogForm 
            post={post}
            isEdit={true}
            onSubmit={(updatedPost) => {
              // Handle successful update
              console.log('Post updated:', updatedPost)
              // Optionally redirect or show success message
              setTimeout(() => {
                router.push('/admin/blog')
              }, 2000)
            }}
            onCancel={() => {
              router.push('/admin/blog')
            }}
          />
        </div>
      </div>
    </div>
  )
}
