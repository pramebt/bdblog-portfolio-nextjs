'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  ExternalLink,
  Github,
  FolderOpen,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { 
  fetchProjects,
  deleteProject
} from '@/actions/projects'
import { GridSkeleton, ProjectCardSkeleton } from '@/components/ui/skeletons'
import { FadeIn } from '@/components/ui/animations'

const ProjectList = () => {
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProjects, setTotalProjects] = useState(0)

  // Fetch projects
  const fetchProjectsData = async (page = 1, search = '') => {
    try {
      setLoading(true)
      setError('')
      
      const params = {
        page,
        limit: 12,
        search: search || undefined
      }
      
      const result = await fetchProjects(params)
      
      if (result.success) {
        setProjects(result.projects)
        setCurrentPage(result.pagination.page)
        setTotalPages(result.pagination.pages)
        setTotalProjects(result.pagination.total)
      } else {
        throw new Error(result.error || 'Failed to fetch projects')
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
    fetchProjectsData(1, searchTerm)
  }, [])

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    fetchProjectsData(1, searchTerm)
  }

  // Handle project actions
  const handleProjectAction = async (action, projectId) => {
    try {
      let result
      
      switch (action) {
        case 'delete':
          if (!confirm('Are you sure you want to delete this project?')) {
            return
          }
          result = await deleteProject(projectId)
          break
          
        case 'togglePublish':
          // For now, just use a simple fetch until we have the proper actions
          const project = projects.find(p => p.id === projectId)
          if (project) {
            const response = await fetch(`/api/projects/${projectId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ published: !project.published })
            })
            const data = await response.json()
            result = response.ok ? { success: true, data } : { success: false, error: data.error }
          }
          break
          
        case 'edit':
          router.push(`/admin/projects/${projectId}`)
          return
          
        default:
          return
      }
      
      if (!result || !result.success) {
        throw new Error(result?.error || 'Action failed')
      }
      
      // Refresh the list
      fetchProjectsData(currentPage, searchTerm)
      
    } catch (err) {
      console.error('Error performing action:', err)
      setError(err.message)
    }
  }

  // Handle page change
  const handlePageChange = (page) => {
    fetchProjectsData(page, searchTerm)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Format date
  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your project portfolio
          </p>
        </div>
        <Button onClick={() => router.push('/admin/projects/create')}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 ring-0 focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none border-0 focus:border-0 focus-visible:border-0"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{totalProjects}</p>
                <p className="text-sm text-muted-foreground">Total Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {projects.filter(p => p.published).length}
                </p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <EyeOff className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {projects.filter(p => !p.published).length}
                </p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="flex items-center gap-2 p-4">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <FadeIn>
          <GridSkeleton 
            count={6}
            component={ProjectCardSkeleton}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          />
        </FadeIn>
      )}

      {/* Projects Grid */}
      {!loading && projects.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-border hover:bg-card/80">
                {/* Cover Image */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {project.coverImage ? (
                    <>
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <FolderOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant={project.published ? "default" : "secondary"} className="shadow-md">
                      {project.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>

                  {/* Action Menu */}
                  <div className="absolute top-3 left-3 z-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-md"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleProjectAction('edit', project.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Project
                        </DropdownMenuItem>
                        
                        {project.published && project.liveUrl && (
                          <DropdownMenuItem onClick={() => window.open(project.liveUrl, '_blank')}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Live
                          </DropdownMenuItem>
                        )}
                        
                        {project.githubUrl && (
                          <DropdownMenuItem onClick={() => window.open(project.githubUrl, '_blank')}>
                            <Github className="h-4 w-4 mr-2" />
                            View Code
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem onClick={() => handleProjectAction('togglePublish', project.id)}>
                          {project.published ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-2" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-2" />
                              Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem 
                          onClick={() => handleProjectAction('delete', project.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed mt-2">
                      {(() => {
                        try {
                          const blocks = JSON.parse(project.description)
                          return blocks
                            .filter(block => ['paragraph', 'heading1', 'heading2', 'heading3'].includes(block.type))
                            .map(block => block.content || '')
                            .join(' ')
                            .substring(0, 120) + '...'
                        } catch {
                          return project.description.substring(0, 120) + '...'
                        }
                      })()}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-1 pt-0 space-y-4">
                    

                    {/* Meta Info */}
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Created {formatDate(project.createdAt)}</p>
                      {project.updatedAt !== project.createdAt && (
                        <p>Updated {formatDate(project.updatedAt)}</p>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 pt-2 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProjectAction('edit', project.id)}
                        className="flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProjectAction('togglePublish', project.id)}
                        className="flex-1"
                      >
                        {project.published ? (
                          <>
                            <EyeOff className="h-3 w-3 mr-1" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Eye className="h-3 w-3 mr-1" />
                            Publish
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </div>
                </Card>
              </div>
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
                Previous
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
                Next
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
            {searchTerm ? 'No projects found' : 'No projects yet'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'Create your first project to get started'
            }
          </p>
          <Button onClick={() => router.push('/admin/projects/create')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProjectList
