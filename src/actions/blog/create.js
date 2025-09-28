/**
 * Create a new blog post
 */
const createBlogPost = async (postData) => {
  try {
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create post')
    }

    return {
      success: true,
      post: data.data
    }
  } catch (error) {
    console.error('Error creating post:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export default createBlogPost
