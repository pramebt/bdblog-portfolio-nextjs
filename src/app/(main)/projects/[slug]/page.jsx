'use client'

import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  FolderOpen,
  Loader2,
  AlertCircle,
  Github,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react'
import BlockPreview from '@/components/admin/blog/block-preview'

const ProjectPage = () => {
  const params = useParams()
  const slug = params.slug
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch project by slug
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        setError('')
        
        const response = await fetch(`/api/projects/${slug}`)
        const data = await response.json()
        
        if (!response.ok) {
          if (response.status === 404) {
            notFound()
            return
          }
          throw new Error(data.error || 'Failed to fetch project')
        }
        
        if (data.success) {
          // Only show published projects to public
          if (!data.data.published) {
            notFound()
            return
          }
          setProject(data.data)
        }
        
      } catch (err) {
        console.error('Error fetching project:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProject()
    }
  }, [slug])

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Share functionality
  const handleShare = async () => {
    if (navigator.share && project) {
      try {
        await navigator.share({
          title: project.title,
          text: 'ดูโปรเจคนี้',
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
        // Fallback to copy URL
        navigator.clipboard.writeText(window.location.href)
        alert('ลิงก์ถูกคัดลอกแล้ว!')
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('ลิงก์ถูกคัดลอกแล้ว!')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">กำลังโหลดโปรเจค...</p>
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
          <div className="max-w-2xl mx-auto text-center py-12">
            <AlertCircle className="h-16 w-16 mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">เกิดข้อผิดพลาด</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button asChild>
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                กลับไปหน้าโปรเจค
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return notFound()
  }

  // Parse description blocks
  let descriptionBlocks = []
  try {
    descriptionBlocks = JSON.parse(project.description)
  } catch {
    descriptionBlocks = [{ id: '1', type: 'paragraph', content: project.description }]
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับไปหน้าโปรเจค
            </Link>
          </Button>
        </div>

        {/* Project */}
        <article className="max-w-4xl mx-auto">
          {/* Cover Image */}
          {project.coverImage && (
            <div className="mb-8">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <div className="space-y-4">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {project.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{project.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    แบ่งปัน
                  </Button>
                </div>
              </div>

              <Separator />
            </div>
          </header>

          {/* Description */}
          <div className="mb-12">
            <div className="prose prose-lg max-w-none">
              <BlockPreview blocks={descriptionBlocks} />
            </div>
          </div>

          {/* Project Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="h-5 w-5" />
                <h2 className="text-2xl font-bold">Gallery</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="aspect-video overflow-hidden rounded-lg border">
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => window.open(image, '_blank')}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="space-y-6">
            <Separator />
            
            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  เกี่ยวกับผู้พัฒนา
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{project.author.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      นักพัฒนาเว็บที่หลงใหลในการสร้างสรรค์โปรเจคใหม่ๆ และแบ่งปันความรู้
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button asChild variant="outline">
                <Link href="/projects">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  ดูโปรเจคอื่นๆ
                </Link>
              </Button>
              
              <div className="flex gap-2">
                {project.githubUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Source Code
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
}

export default ProjectPage
