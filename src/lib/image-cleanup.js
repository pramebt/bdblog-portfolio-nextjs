import { deleteImage } from './cloudinary'

// Extract Cloudinary public ID from URL
export function extractPublicId(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return null
  
  try {
    // Cloudinary URL format: https://res.cloudinary.com/cloud-name/image/upload/v123456789/folder/image.jpg
    const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/)
    return match ? match[1] : null
  } catch (error) {
    console.error('Error extracting public ID:', error)
    return null
  }
}

// Delete single image from Cloudinary
export async function deleteCloudinaryImage(imageUrl) {
  const publicId = extractPublicId(imageUrl)
  if (!publicId) {
    console.warn('Could not extract public ID from URL:', imageUrl)
    return { success: false, error: 'Invalid image URL' }
  }
  
  try {
    const result = await deleteImage(publicId)
    return result
  } catch (error) {
    console.error('Error deleting image:', error)
    return { success: false, error: error.message }
  }
}

// Delete multiple images from Cloudinary
export async function deleteMultipleImages(imageUrls) {
  if (!Array.isArray(imageUrls)) return { success: false, error: 'Invalid input' }
  
  const results = []
  
  for (const imageUrl of imageUrls) {
    if (imageUrl) {
      const result = await deleteCloudinaryImage(imageUrl)
      results.push({
        url: imageUrl,
        ...result
      })
    }
  }
  
  return {
    success: true,
    results
  }
}

// Extract all images from blog post content (blocks)
export function extractImagesFromBlocks(content) {
  if (!content) return []
  
  try {
    const blocks = JSON.parse(content)
    const imageUrls = []
    
    blocks.forEach(block => {
      if (block.type === 'image' && block.content) {
        imageUrls.push(block.content)
      }
    })
    
    return imageUrls
  } catch (error) {
    console.error('Error parsing blocks:', error)
    return []
  }
}

// Cleanup all images associated with a blog post
export async function cleanupBlogImages(post) {
  const imagesToDelete = []
  
  // Add cover image
  if (post.coverImage) {
    imagesToDelete.push(post.coverImage)
  }
  
  // Add images from content blocks
  const contentImages = extractImagesFromBlocks(post.content)
  imagesToDelete.push(...contentImages)
  
  // Delete all images
  if (imagesToDelete.length > 0) {
    console.log(`Cleaning up ${imagesToDelete.length} images for blog post: ${post.title}`)
    const result = await deleteMultipleImages(imagesToDelete)
    return result
  }
  
  return { success: true, results: [] }
}

// Cleanup all images associated with a project
export async function cleanupProjectImages(project) {
  const imagesToDelete = []
  
  // Add cover image
  if (project.coverImage) {
    imagesToDelete.push(project.coverImage)
  }
  
  // Add gallery images
  if (project.images && Array.isArray(project.images)) {
    imagesToDelete.push(...project.images)
  }
  
  // Add images from description blocks
  const descriptionImages = extractImagesFromBlocks(project.description)
  imagesToDelete.push(...descriptionImages)
  
  // Delete all images
  if (imagesToDelete.length > 0) {
    console.log(`Cleaning up ${imagesToDelete.length} images for project: ${project.title}`)
    const result = await deleteMultipleImages(imagesToDelete)
    return result
  }
  
  return { success: true, results: [] }
}
