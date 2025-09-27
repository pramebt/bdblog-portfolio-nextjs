'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, User, ArrowRight, FolderOpen, Github, ExternalLink } from 'lucide-react'

const ProjectCard = ({ project }) => {
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

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Cover Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.coverImage ? (
          <>
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <FolderOpen className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      
      {/* Content - เพิ่ม flex-1 เพื่อให้ขยายเต็มพื้นที่ */}
      <div className="flex flex-col flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
            <Link href={`/projects/${project.slug}`} className="block">
              {project.title}
            </Link>
          </CardTitle>
          
          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(project.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{project.author.name}</span>
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
              <div className="flex gap-2 flex-wrap">
                {project.githubUrl && (
                  <Button size="sm" variant="outline" className="flex-1 min-w-0" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 mr-1" />
                      <span className="truncate">Code</span>
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button size="sm" variant="outline" className="flex-1 min-w-0" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      <span className="truncate">Demo</span>
                    </a>
                  </Button>
                )}
              </div>
            )}

            <Separator />

            {/* View More Button */}
            <Button asChild variant="ghost" className="w-full justify-between h-8 px-0 hover:bg-muted/50">
              <Link href={`/projects/${project.slug}`}>
                <span>ดูรายละเอียด</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default ProjectCard
