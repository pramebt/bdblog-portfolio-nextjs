'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, User, ArrowRight, FolderOpen, Github, ExternalLink, Eye, Briefcase, User as UserIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ImageModal from '@/components/shared/ImageModal'
import { HoverLift } from '@/components/ui/animations'

const ProjectCard = ({ project }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Extract text from content blocks for preview
  const extractTextFromContent = (content) => {
    try {
      const blocks = JSON.parse(content)
      return blocks
        .filter(block => ['paragraph', 'heading1', 'heading2', 'heading3'].includes(block.type))
        .map(block => block.content || '')
        .join(' ')
        .substring(0, 150) + '...'
    } catch {
      return content.substring(0, 150) + '...'
    }
  }

  // Get project type info
  const getProjectTypeInfo = (type) => {
    if (type === 'PROFESSIONAL') {
      return {
        label: 'Professional',
        icon: <Briefcase className="h-3 w-3" />
      }
    }
    return {
      label: 'Personal',
      icon: <UserIcon className="h-3 w-3" />
    }
  }

  const projectTypeInfo = getProjectTypeInfo(project.type)

  return (
    <Card className="group overflow-hidden h-full flex flex-col bg-card/50 backdrop-blur-sm border-border/50 hover:border-border hover:bg-card/80 hover:shadow-lg transition-all duration-300">
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden m-4">
          {project.coverImage ? (
            <>
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-500 cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 rounded-lg group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Image View Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-95">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/95 hover:bg-white text-black shadow-xl backdrop-blur-sm border-0 transform hover:scale-105 transition-transform"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsImageModalOpen(true)
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  ดูรูป
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted group-hover:bg-muted/80 transition-colors">
              <FolderOpen className="h-12 w-12 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          )}
        </div>
      
      {/* Content - เพิ่ม flex-1 เพื่อให้ขยายเต็มพื้นที่ */}
      <div className="flex flex-col flex-1">
        <CardHeader className="pb-3">
          {/* Project Type Badge */}
          <div className="mb-2">
            <Badge variant="secondary" className="w-fit text-xs font-medium">
              {projectTypeInfo.icon}
              <span className="ml-1">{projectTypeInfo.label}</span>
            </Badge>
          </div>
          
          <CardTitle className="line-clamp-2 text-lg font-semibold group-hover:text-primary transition-colors duration-200 leading-tight">
            <Link href={`/projects/${project.slug}`} className="hover:underline">
              {project.title}
            </Link>
          </CardTitle>
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-medium">{formatDate(project.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <User className="h-3.5 w-3.5" />
              <span className="font-medium">{project.author?.name || 'Unknown'}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 pt-0 space-y-4">
          {/* Description Preview */}
          <CardDescription className="line-clamp-3 text-sm leading-relaxed flex-1">
            {extractTextFromContent(project.description)}
          </CardDescription>

          {/* Footer Section */}
          <div className="space-y-3 mt-auto">
            {/* Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="flex gap-2">
                {project.githubUrl && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors" 
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 mr-1.5" />
                      <span>Code</span>
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors" 
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1.5" />
                      <span>Demo</span>
                    </a>
                  </Button>
                )}
              </div>
            )}

            <Separator className="my-2" />

            {/* View More Button */}
            <Button 
              asChild 
              variant="ghost" 
              className="w-full justify-between p-3 h-auto group-hover:bg-primary/5 transition-colors duration-200 mt-auto"
            >
              <Link href={`/projects/${project.slug}`} className="flex items-center justify-between w-full">
                <span className="font-medium">ดูรายละเอียด</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
          </div>
        </CardContent>
        </div>

        {/* Image Modal */}
        {project.coverImage && (
          <ImageModal
            src={project.coverImage}
            alt={project.title}
            title={project.title}
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
          />
        )}
      </Card>
  )
}

export default ProjectCard
