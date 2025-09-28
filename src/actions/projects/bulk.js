import createProject from './create'
import deleteProject from './delete'
import { publishProject, unpublishProject } from './update'

/**
 * Delete multiple projects
 */
export const deleteMultipleProjects = async (projectIds) => {
  try {
    const results = await Promise.allSettled(
      projectIds.map(projectId => deleteProject(projectId))
    )

    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length

    const failed = results.length - successful

    return {
      success: failed === 0,
      message: `${successful} projects deleted successfully${failed > 0 ? `, ${failed} failed` : ''}`,
      successful,
      failed
    }
  } catch (error) {
    console.error('Error deleting multiple projects:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Publish multiple projects
 */
export const publishMultipleProjects = async (projectIds) => {
  try {
    const results = await Promise.allSettled(
      projectIds.map(projectId => publishProject(projectId))
    )

    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length

    const failed = results.length - successful

    return {
      success: failed === 0,
      message: `${successful} projects published successfully${failed > 0 ? `, ${failed} failed` : ''}`,
      successful,
      failed
    }
  } catch (error) {
    console.error('Error publishing multiple projects:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Unpublish multiple projects
 */
export const unpublishMultipleProjects = async (projectIds) => {
  try {
    const results = await Promise.allSettled(
      projectIds.map(projectId => unpublishProject(projectId))
    )

    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length

    const failed = results.length - successful

    return {
      success: failed === 0,
      message: `${successful} projects unpublished successfully${failed > 0 ? `, ${failed} failed` : ''}`,
      successful,
      failed
    }
  } catch (error) {
    console.error('Error unpublishing multiple projects:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Duplicate multiple projects
 */
export const duplicateMultipleProjects = async (projects) => {
  try {
    const results = await Promise.allSettled(
      projects.map(project => {
        const duplicateData = {
          title: `${project.title} (Copy)`,
          description: project.description,
          content: project.content,
          coverImage: project.coverImage,
          technologies: project.technologies,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          published: false // Always create as draft
        }
        return createProject(duplicateData)
      })
    )

    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length

    const failed = results.length - successful

    return {
      success: failed === 0,
      message: `${successful} projects duplicated successfully${failed > 0 ? `, ${failed} failed` : ''}`,
      successful,
      failed
    }
  } catch (error) {
    console.error('Error duplicating multiple projects:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Export multiple projects as JSON
 */
export const exportMultipleProjects = async (projects) => {
  try {
    const exportData = projects.map(project => ({
      title: project.title,
      description: project.description,
      content: project.content,
      technologies: project.technologies,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      published: project.published,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    }))

    // Create and download JSON file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `projects_export_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    return {
      success: true,
      message: `${projects.length} projects exported successfully`
    }
  } catch (error) {
    console.error('Error exporting multiple projects:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Export single project as JSON
 */
export const exportSingleProject = async (project) => {
  try {
    const exportData = {
      title: project.title,
      description: project.description,
      content: project.content,
      technologies: project.technologies,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      published: project.published,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    }

    // Create and download JSON file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    return {
      success: true,
      message: 'Project exported successfully'
    }
  } catch (error) {
    console.error('Error exporting project:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
