import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Helper function สำหรับ upload image
export async function uploadImage(file, folder = 'bdblog') {
  try {
    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64}`

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
      transformation: [
        { width: 1200, height: 630, crop: 'limit' }, // สำหรับ cover images
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    })

    return {
      success: true,
      data: {
        id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes,
        folder: result.folder,
        createdAt: result.created_at
      }
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Helper function สำหรับ delete image
export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return {
      success: true,
      data: result
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Helper function สำหรับ get images from folder
export async function getImagesFromFolder(folder = 'bdblog') {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by([['created_at', 'desc']])
      .max_results(50)
      .execute()

    return {
      success: true,
      data: result.resources.map(resource => ({
        id: resource.public_id,
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
        format: resource.format,
        size: resource.bytes,
        folder: resource.folder,
        createdAt: resource.created_at
      }))
    }
  } catch (error) {
    console.error('Cloudinary search error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
