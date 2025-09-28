import createBlogPost from './create'
import deleteBlogPost from './delete'
import { publishPost, unpublishPost } from './update'

/**
 * Delete multiple blog posts
 */
export const deleteMultiplePosts = async (postIds) => {
  try {
    const results = await Promise.allSettled(
      postIds.map(postId => deleteBlogPost(postId))
    )

    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length

    const failed = results.length - successful

    return {
      success: failed === 0,
      message: `${successful} posts deleted successfully${failed > 0 ? `, ${failed} failed` : ''}`,
      successful,
      failed
    }
  } catch (error) {
    console.error('Error deleting multiple posts:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Publish multiple blog posts
 */
export const publishMultiplePosts = async (postIds) => {
  try {
    const results = await Promise.allSettled(
      postIds.map(postId => publishPost(postId))
    )

    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length

    const failed = results.length - successful

    return {
      success: failed === 0,
      message: `${successful} posts published successfully${failed > 0 ? `, ${failed} failed` : ''}`,
      successful,
      failed
    }
  } catch (error) {
    console.error('Error publishing multiple posts:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Unpublish multiple blog posts
 */
export const unpublishMultiplePosts = async (postIds) => {
  try {
    const results = await Promise.allSettled(
      postIds.map(postId => unpublishPost(postId))
    )

    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length

    const failed = results.length - successful

    return {
      success: failed === 0,
      message: `${successful} posts unpublished successfully${failed > 0 ? `, ${failed} failed` : ''}`,
      successful,
      failed
    }
  } catch (error) {
    console.error('Error unpublishing multiple posts:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Duplicate multiple blog posts
 */
export const duplicateMultiplePosts = async (posts) => {
  try {
    const results = await Promise.allSettled(
      posts.map(post => {
        const duplicateData = {
          title: `${post.title} (Copy)`,
          content: post.content,
          excerpt: post.excerpt,
          coverImage: post.coverImage,
          published: false // Always create as draft
        }
        return createBlogPost(duplicateData)
      })
    )

    const successful = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length

    const failed = results.length - successful

    return {
      success: failed === 0,
      message: `${successful} posts duplicated successfully${failed > 0 ? `, ${failed} failed` : ''}`,
      successful,
      failed
    }
  } catch (error) {
    console.error('Error duplicating multiple posts:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Export multiple blog posts as JSON
 */
export const exportMultiplePosts = async (posts) => {
  try {
    const exportData = posts.map(post => ({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags || []
    }))

    // Create and download JSON file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `blog_posts_export_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    return {
      success: true,
      message: `${posts.length} posts exported successfully`
    }
  } catch (error) {
    console.error('Error exporting multiple posts:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Export single blog post as JSON
 */
export const exportSinglePost = async (post) => {
  try {
    const exportData = {
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags || []
    }

    // Create and download JSON file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    return {
      success: true,
      message: 'Post exported successfully'
    }
  } catch (error) {
    console.error('Error exporting post:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
