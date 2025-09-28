/**
 * Update a project
 */
const updateProject = async (projectId, updateData) => {
  try {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update project')
    }

    return {
      success: true,
      project: data.data
    }
  } catch (error) {
    console.error('Error updating project:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Toggle publish status of a project
 */
export const togglePublishProject = async (projectId, currentStatus) => {
  return updateProject(projectId, { published: !currentStatus })
}

/**
 * Publish a project
 */
export const publishProject = async (projectId) => {
  return updateProject(projectId, { published: true })
}

/**
 * Unpublish a project
 */
export const unpublishProject = async (projectId) => {
  return updateProject(projectId, { published: false })
}

export default updateProject
