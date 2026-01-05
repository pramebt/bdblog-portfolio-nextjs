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
  Image as ImageIcon,
  Briefcase,
  User as UserIcon
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import BlockPreview from '@/components/admin/blog/block-preview'
import { motion } from "framer-motion"; 
import { TracingBeam } from "@/components/ui/tracing-beam";
import ImageModal from '@/components/shared/ImageModal'
const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1 justify-center"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
      <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
      <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
      <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
      <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
    </motion.div>
  );
};
const ProjectPage = () => {
  const params = useParams()
  const slug = params.slug
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        setTimeout(() => {
          setLoading(false)
        }, 6000) // รอ 3 วินาที
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

  // Get project type info
  const getProjectTypeInfo = (type) => {
    if (type === 'PROFESSIONAL') {
      return {
        label: 'Professional Project',
        icon: <Briefcase className="h-3 w-3" />
      }
    }
    return {
      label: 'Personal Project',
      icon: <UserIcon className="h-3 w-3" />
    }
  }

  // Share functionality
  const handleShare = async () => {
    if (navigator.share && project) {
      try {
        await navigator.share({
          title: project.title,
          text: 'View this project',
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
        // Fallback to copy URL
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied!')
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied!')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <BarLoader />
          <p className="text-muted-foreground">Loading project...</p>
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
                Back to projects
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

  const projectTypeInfo = getProjectTypeInfo(project.type)

  return (
    <TracingBeam className='px-2 sm:px-5'>
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Button variant="ghost" size="sm" className="sm:size-default" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to projects</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>

        {/* Project */}
        <article className="max-w-4xl mx-auto">
          {/* Cover Image */}
          {project.coverImage && (
            <div className="mb-6 sm:mb-8">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => {
                  // Include cover image in gallery if images exist
                  const allImages = project.images && project.images.length > 0 
                    ? [project.coverImage, ...project.images]
                    : [project.coverImage]
                  const coverIndex = 0
                  setSelectedImageIndex(coverIndex)
                  setIsModalOpen(true)
                }}
              />
            </div>
          )}

          {/* Project Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <h2 className="text-lg sm:text-xl font-bold">Gallery</h2>
              </div>
              <div className="relative -mx-3 sm:-mx-4 px-3 sm:px-4">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent pb-2">
                  <div className="flex gap-2 sm:gap-3" style={{ width: 'max-content' }}>
                    {project.images.map((image, index) => {
                      // Adjust index to account for cover image
                      const imageIndex = project.coverImage ? index + 1 : index
                      const allImages = project.coverImage 
                        ? [project.coverImage, ...project.images]
                        : project.images
                      
                      return (
                        <div 
                          key={index} 
                          className="flex-shrink-0 w-36 h-24 sm:w-48 sm:h-32 overflow-hidden rounded-lg border cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => {
                            setSelectedImageIndex(imageIndex)
                            setIsModalOpen(true)
                          }}
                        >
                          <img
                            src={image}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <header className="mb-6 sm:mb-8">
            <div className="space-y-3 sm:space-y-4">
              {/* Project Type Badge */}
              <div>
                <Badge variant="secondary" className="w-fit text-xs sm:text-sm font-medium">
                  {projectTypeInfo.icon}
                  <span className="ml-1.5">{projectTypeInfo.label}</span>
                </Badge>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {project.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm sm:text-base text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{project.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{formatDate(project.createdAt)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        <span className="hidden sm:inline">Source Code</span>
                        <span className="sm:hidden">Code</span>
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" className="text-xs sm:text-sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className='text-white'>
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        <span className="hidden sm:inline">Live Demo</span>
                        <span className="sm:hidden">Demo</span>
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={handleShare}>
                    <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    <span className="hidden sm:inline">แบ่งปัน</span>
                    <span className="sm:hidden">Share</span>
                  </Button>
                </div>
              </div>

              <Separator />
            </div>
          </header>

          {/* Description */}
          <div className="mb-8 sm:mb-12">
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
              <BlockPreview blocks={descriptionBlocks} />
            </div>
          </div>

          {/* Image Modal */}
          {isModalOpen && selectedImageIndex !== null && project && (
            <ImageModal
              src={
                project.coverImage && selectedImageIndex === 0
                  ? project.coverImage
                  : project.images && project.images[project.coverImage ? selectedImageIndex - 1 : selectedImageIndex]
              }
              alt={`${project.title} - Image ${selectedImageIndex + 1}`}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false)
                setSelectedImageIndex(null)
              }}
              images={
                project.coverImage
                  ? [project.coverImage, ...(project.images || [])]
                  : project.images || []
              }
              currentIndex={selectedImageIndex}
              onNavigate={(newIndex) => setSelectedImageIndex(newIndex)}
            />
          )}

          {/* Footer */}
          <footer className="space-y-4 sm:space-y-6">
            <Separator />
            
            {/* Author Info */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  เกี่ยวกับผู้พัฒนา
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base">{project.author.name}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                      นักพัฒนาเว็บที่หลงใหลในการสร้างสรรค์โปรเจคใหม่ๆ และแบ่งปันความรู้
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
              <Button asChild variant="outline" size="sm" className="sm:size-default w-full sm:w-auto">
                <Link href="/projects">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">ดูโปรเจคอื่นๆ</span>
                  <span className="sm:hidden">โปรเจคอื่นๆ</span>
                </Link>
              </Button>
              
              <div className="flex gap-2 w-full sm:w-auto">
                {project.githubUrl && (
                  <Button variant="outline" size="sm" className="sm:size-default flex-1 sm:flex-none" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Source Code</span>
                      <span className="sm:hidden">Code</span>
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button size="sm" className="sm:size-default flex-1 sm:flex-none" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className='text-white'>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Demo</span>
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
    </TracingBeam>
  )
}

export default ProjectPage
