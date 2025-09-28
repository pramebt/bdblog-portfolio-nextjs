/**
 * Delete a blog post
 */
const deleteBlogPost = async (postId) => {
  try {
    const response = await fetch(`/api/blog/${postId}`, {
      method: 'DELETE'
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete post')
    }

    return {
      success: true,
      message: 'Post deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting post:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export default deleteBlogPost
