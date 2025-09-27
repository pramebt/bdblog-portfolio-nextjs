'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  FolderOpen,
  Loader2,
  AlertCircle,
  Github,
  ExternalLink
} from 'lucide-react'
import BlockPreview from '@/components/admin/blog/block-preview'

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProjects, setTotalProjects] = useState(0)

  // Fetch projects
  const fetchProjects = async (page = 1, search = '') => {
    try {
      setLoading(true)
      setError('')
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        published: 'true'
      })
      
      if (search) {
        params.append('search', search)
      }
      
      const response = await fetch(`/api/projects?${params}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects')
      }
      
      if (data.success) {
        setProjects(data.data.projects)
        setCurrentPage(data.data.pagination.page)
        setTotalPages(data.data.pagination.pages)
        setTotalProjects(data.data.pagination.total)
      }
      
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchProjects(1, searchTerm)
  }, [])

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    fetchProjects(1, searchTerm)
  }

  // Handle pagination
  const handlePageChange = (page) => {
    fetchProjects(page, searchTerm)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FolderOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            สำรวจโปรเจคต่างๆ ที่ผมได้พัฒนา ตั้งแต่เว็บแอปพลิเคชันไปจนถึงเครื่องมือต่างๆ
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ค้นหาโปรเจค..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'ค้นหา'}
            </Button>
          </form>
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              {searchTerm ? (
                <>ผลการค้นหา "{searchTerm}": {totalProjects} โปรเจค</>
              ) : (
                <>ทั้งหมด {totalProjects} โปรเจค</>
              )}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto mb-8">
            <Card className="border-destructive">
              <CardContent className="flex items-center gap-2 p-4">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">กำลังโหลดโปรเจค...</p>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {projects.map((project) => (
                <Card key={project.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
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
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  ก่อนหน้า
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  ถัดไป
                </Button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && !error && (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm ? 'ไม่พบโปรเจคที่ค้นหา' : 'ยังไม่มีโปรเจค'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? 'ลองใช้คำค้นหาอื่นหรือเรียกดูโปรเจคทั้งหมด'
                : 'กลับมาดูใหม่ในภายหลัง จะมีโปรเจคน่าสนใจมาแบ่งปัน'
              }
            </p>
            {searchTerm && (
              <Button onClick={() => {
                setSearchTerm('')
                fetchProjects(1, '')
              }}>
                ดูโปรเจคทั้งหมด
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsPage