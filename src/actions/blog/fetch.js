/**
 * Fetch blog posts with filtering and pagination
 */
const fetchBlogPosts = async (params = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      published = undefined,
      sort = 'createdAt_desc'
    } = params

    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort
    })

    if (search) {
      searchParams.append('search', search)
    }

    if (published !== undefined) {
      searchParams.append('published', published.toString())
    }

    const response = await fetch(`/api/blog?${searchParams}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch posts')
    }

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch posts')
    }

    return {
      success: true,
      posts: data.data.posts,
      pagination: data.data.pagination
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export default fetchBlogPosts
