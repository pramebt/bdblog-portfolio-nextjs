'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import ProjectForm from '@/components/admin/projects/project-form'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle } from 'lucide-react'

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id
  
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleBack = () => {
    router.back()
  }

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        setError('')
        
        const response = await fetch(`/api/projects/${projectId}`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch project')
        }
        
        if (data.success) {
          setProject(data.data)
        } else {
          throw new Error(data.error || 'Project not found')
        }
        
      } catch (err) {
        console.error('Error fetching project:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      fetchProject()
    }
  }, [projectId])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Loading project...</p>
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
              <Button onClick={() => router.push('/admin/projects')}>
                Go to Project List
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // No project found
  if (!project) {
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
                <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  The project you're looking for doesn't exist or has been deleted.
                </p>
                <Button onClick={() => router.push('/admin/projects')}>
                  Go to Project List
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
              Back to Project List
            </Button>
          </div>

          {/* Project Form */}
          <ProjectForm 
            project={project}
            isEdit={true}
            onSubmit={(updatedProject) => {
              // Handle successful update
              console.log('Project updated:', updatedProject)
              // Optionally redirect or show success message
              setTimeout(() => {
                router.push('/admin/projects')
              }, 2000)
            }}
            onCancel={() => {
              router.push('/admin/projects')
            }}
          />
        </div>
      </div>
    </div>
  )
}
