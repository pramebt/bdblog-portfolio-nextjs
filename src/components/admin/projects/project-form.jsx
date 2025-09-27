'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from '@/lib/validators'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import BlockEditor from '@/components/admin/blog/block-editor'
import BlockPreview from '@/components/admin/blog/block-preview'
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
  CheckCircle,
  Github,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react'
import CloudinaryUpload from '@/components/admin/media/CloudinaryUpload'

const ProjectForm = ({ 
  project = null, 
  isEdit = false,
  onSubmit,
  onCancel 
}) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [coverImage, setCoverImage] = useState(project?.coverImage || '')
  const [images, setImages] = useState(project?.images || [])

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty }
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      coverImage: project?.coverImage || '',
      images: project?.images || [],
      githubUrl: project?.githubUrl || '',
      liveUrl: project?.liveUrl || '',
      published: project?.published || false,
    }
  })

  // Watch form values for preview
  const watchedValues = watch()

  // Update cover image when changed
  useEffect(() => {
    setValue('coverImage', coverImage, { shouldDirty: true })
  }, [coverImage, setValue])

  // Update images when changed
  useEffect(() => {
    setValue('images', images, { shouldDirty: true })
  }, [images, setValue])

  // Handle form submission
  const onSubmitForm = async (data) => {
    try {
      setIsSubmitting(true)
      setError('')
      setSuccess('')

      const formData = {
        ...data,
        coverImage: coverImage,
        images: images
      }
      
      let response
      if (isEdit && project?.id) {
        // Update existing project
        response = await fetch(`/api/projects/${project.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      } else {
        // Create new project
        response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save project')
      }

      setSuccess(isEdit ? 'Project updated successfully!' : 'Project created successfully!')
      
      // Call parent onSubmit callback if provided
      if (onSubmit) {
        onSubmit(result.data)
      } else {
        // Default behavior: redirect to project list after delay
        setTimeout(() => {
          router.push('/admin/projects')
        }, 2000)
      }

    } catch (err) {
      console.error('Error saving project:', err)
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle cover image upload
  const handleCoverImageUpload = (url, imageData) => {
    setCoverImage(url)
  }

  // Handle gallery images upload
  const handleGalleryImagesUpload = (url, imageData) => {
    setImages(prev => [...prev, url])
  }

  // Remove image from gallery
  const removeImage = (imageUrl) => {
    setImages(prev => prev.filter(img => img !== imageUrl))
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update your project details' : 'Add a new project to your portfolio'}
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
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Fill in the information for your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Enter project title..."
                    disabled={isSubmitting}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <BlockEditor
                    content={watchedValues.description || ''}
                    onChange={(content) => setValue('description', content, { shouldDirty: true })}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="githubUrl"
                        {...register('githubUrl')}
                        placeholder="https://github.com/username/repo"
                        className="pl-10"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.githubUrl && (
                      <p className="text-sm text-destructive">{errors.githubUrl.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="liveUrl">Live Demo URL</Label>
                    <div className="relative">
                      <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="liveUrl"
                        {...register('liveUrl')}
                        placeholder="https://your-project.com"
                        className="pl-10"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.liveUrl && (
                      <p className="text-sm text-destructive">{errors.liveUrl.message}</p>
                    )}
                  </div>
                </div>

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
                    Publish project
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
                        {isEdit ? 'Update Project' : 'Create Project'}
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
                <ImageIcon className="h-5 w-5" />
                Cover Image
              </CardTitle>
              <CardDescription>
                Upload a cover image for your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CloudinaryUpload
                onUpload={handleCoverImageUpload}
                type="project"
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

          {/* Gallery Images Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Project Gallery
              </CardTitle>
              <CardDescription>
                Upload additional images to showcase your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CloudinaryUpload
                onUpload={handleGalleryImagesUpload}
                type="project"
                maxFiles={10}
              />
              {images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Gallery images:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
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
                  See how your project will look
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
                    {watchedValues.title || 'Untitled Project'}
                  </h1>
                  
                  {/* Description Preview */}
                  <div className="prose prose-sm max-w-none">
                    {watchedValues.description ? (
                      <BlockPreview 
                        blocks={(() => {
                          try {
                            return JSON.parse(watchedValues.description)
                          } catch {
                            return [{ id: '1', type: 'paragraph', content: watchedValues.description }]
                          }
                        })()} 
                      />
                    ) : (
                      <div className="text-muted-foreground italic">
                        No description yet...
                      </div>
                    )}
                  </div>
                  
                  {/* Links Preview */}
                  <div className="flex gap-2">
                    {watchedValues.githubUrl && (
                      <Button size="sm" variant="outline">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </Button>
                    )}
                    {watchedValues.liveUrl && (
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                  
                  {/* Gallery Preview */}
                  {images.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Gallery</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {images.slice(0, 4).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-16 object-cover rounded"
                          />
                        ))}
                      </div>
                      {images.length > 4 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          +{images.length - 4} more images
                        </p>
                      )}
                    </div>
                  )}
                  
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

export default ProjectForm
