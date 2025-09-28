/**
 * Delete a project
 */
const deleteProject = async (projectId) => {
  try {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: 'DELETE'
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete project')
    }

    return {
      success: true,
      message: 'Project deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting project:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export default deleteProject
