/**
 * Update a blog post
 */
const updateBlogPost = async (postId, updateData) => {
  try {
    const response = await fetch(`/api/blog/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update post')
    }

    return {
      success: true,
      post: data.data
    }
  } catch (error) {
    console.error('Error updating post:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Toggle publish status of a post
 */
export const togglePublishPost = async (postId, currentStatus) => {
  return updateBlogPost(postId, { published: !currentStatus })
}

/**
 * Publish a post
 */
export const publishPost = async (postId) => {
  return updateBlogPost(postId, { published: true })
}

/**
 * Unpublish a post
 */
export const unpublishPost = async (postId) => {
  return updateBlogPost(postId, { published: false })
}

export default updateBlogPost
