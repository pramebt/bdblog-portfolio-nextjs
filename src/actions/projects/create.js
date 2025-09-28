/**
 * Create a new project
 */
const createProject = async (projectData) => {
  try {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create project')
    }

    return {
      success: true,
      project: data.data
    }
  } catch (error) {
    console.error('Error creating project:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export default createProject
