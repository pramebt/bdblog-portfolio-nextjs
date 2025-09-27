'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { blogPostSchema } from '@/lib/validators'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Loader2, 
  Upload,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import CloudinaryUpload from '@/components/admin/media/CloudinaryUpload'
import BlockEditor from './block-editor'
import BlockPreview from './block-preview'
import TagSelector from './tag-selector'

const BlogForm = ({ 
  post = null, 
  isEdit = false,
  onSubmit,
  onCancel 
}) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [coverImage, setCoverImage] = useState(post?.coverImage || '')
  const [selectedTags, setSelectedTags] = useState(post?.tags || [])

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty }
  } = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      coverImage: post?.coverImage || '',
      published: post?.published || false,
      tags: post?.tags || []
    }
  })

  // Watch form values for preview
  const watchedValues = watch()

  // Update cover image when changed
  useEffect(() => {
    setValue('coverImage', coverImage, { shouldDirty: true })
  }, [coverImage, setValue])

  // Update tags when changed
  useEffect(() => {
    setValue('tags', selectedTags, { shouldDirty: true })
  }, [selectedTags, setValue])

  // Handle form submission
  const onSubmitForm = async (data) => {
    try {
      setIsSubmitting(true)
      setError('')
      setSuccess('')

      const formData = {
        ...data,
        coverImage: coverImage,
        tags: selectedTags
      }
      
      let response
      if (isEdit && post?.id) {
        // Update existing post
        response = await fetch(`/api/blog/${post.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      } else {
        // Create new post
        response = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save post')
      }

      setSuccess(isEdit ? 'Post updated successfully!' : 'Post created successfully!')
      
      // Call parent onSubmit callback if provided
      if (onSubmit) {
        onSubmit(result.data)
      } else {
        // Default behavior: redirect to blog list after delay
        setTimeout(() => {
          router.push('/admin/blog')
        }, 2000)
      }

    } catch (err) {
      console.error('Error saving post:', err)
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle cover image upload
  const handleImageUpload = (url, imageData) => {
    setCoverImage(url)
  }

  // Generate excerpt from content
  const generateExcerpt = () => {
    const content = watchedValues.content || ''
    let textContent = ''
    
    try {
      // Parse blocks and extract text content
      const blocks = JSON.parse(content)
      textContent = blocks
        .filter(block => ['paragraph', 'heading1', 'heading2', 'heading3', 'quote'].includes(block.type))
        .map(block => block.content || '')
        .join(' ')
    } catch {
      // Fallback to plain text
      textContent = content
    }
    
    const excerpt = textContent
      .replace(/\s+/g, ' ')       // Replace multiple spaces with single space
      .substring(0, 160)          // Limit to 160 characters
      .trim()
    
    setValue('excerpt', excerpt, { shouldDirty: true })
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update your blog post' : 'Write and publish your blog post'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            disabled={isSubmitting}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Hide Preview' : 'Preview'}
          </Button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>
                Fill in the basic information for your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Enter post title..."
                    disabled={isSubmitting}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={generateExcerpt}
                      disabled={isSubmitting || !watchedValues.content}
                    >
                      Generate from content
                    </Button>
                  </div>
                  <Input
                    id="excerpt"
                    {...register('excerpt')}
                    placeholder="Brief description of your post..."
                    disabled={isSubmitting}
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-destructive">{errors.excerpt.message}</p>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <BlockEditor
                    content={watchedValues.content || ''}
                    onChange={(content) => setValue('content', content, { shouldDirty: true })}
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">{errors.content.message}</p>
                  )}
                </div>

                <Separator />

                {/* Tags */}
                <TagSelector
                  selectedTags={selectedTags}
                  onTagsChange={setSelectedTags}
                  disabled={isSubmitting}
                />

                <Separator />

                {/* Published Status */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="published"
                    checked={watchedValues.published}
                    onCheckedChange={(checked) => setValue('published', checked, { shouldDirty: true })}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="published" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Publish immediately
                  </Label>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isDirty}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isEdit ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {isEdit ? 'Update Post' : 'Create Post'}
                      </>
                    )}
                  </Button>
                  
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Cover Image Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Cover Image
              </CardTitle>
              <CardDescription>
                Upload a cover image for your blog post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CloudinaryUpload
                onUpload={handleImageUpload}
                type="blog"
                maxFiles={1}
              />
              {coverImage && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Current cover image:</p>
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  See how your post will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Cover Image Preview */}
                  {coverImage && (
                    <img
                      src={coverImage}
                      alt="Cover"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  
                  {/* Title Preview */}
                  <h1 className="text-2xl font-bold">
                    {watchedValues.title || 'Untitled Post'}
                  </h1>
                  
                  {/* Excerpt Preview */}
                  {watchedValues.excerpt && (
                    <p className="text-muted-foreground text-lg">
                      {watchedValues.excerpt}
                    </p>
                  )}
                  
                  {/* Content Preview */}
                  <div className="prose prose-sm max-w-none">
                    {watchedValues.content ? (
                      <BlockPreview 
                        blocks={(() => {
                          try {
                            return JSON.parse(watchedValues.content)
                          } catch {
                            return [{ id: '1', type: 'paragraph', content: watchedValues.content }]
                          }
                        })()} 
                      />
                    ) : (
                      <div className="text-muted-foreground italic">
                        No content yet...
                      </div>
                    )}
                  </div>
                  
                  {/* Status Preview */}
                  <div className="flex items-center gap-2 pt-4 border-t">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className={`text-sm font-medium ${
                      watchedValues.published ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {watchedValues.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogForm