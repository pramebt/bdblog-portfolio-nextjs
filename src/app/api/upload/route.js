import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadImage, getImagesFromFolder, deleteImage } from '@/lib/cloudinary'

// GET /api/upload - ดึงรายการรูปภาพที่อัปโหลดแล้ว
export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all' // all, blog, project
    
    // Get images from Cloudinary
    const folder = type === 'all' ? 'bdblog' : `bdblog/${type}`
    const result = await getImagesFromFolder(folder)
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    // Transform data to match expected format
    const images = result.data.map(image => ({
      id: image.id,
      filename: image.id.split('/').pop(), // Extract filename from public_id
      url: image.url,
      type: image.folder?.split('/')[1] || 'blog', // Extract type from folder
      uploadedAt: image.createdAt,
      size: image.size,
      width: image.width,
      height: image.height,
      format: image.format
    }))

    return NextResponse.json({
      success: true,
      data: images
    })

  } catch (error) {
    console.error('Error fetching uploaded images:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

// POST /api/upload - อัปโหลดรูปภาพ
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')
    const type = formData.get('type') || 'blog' // blog, project

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit for Cloudinary)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    // Upload to Cloudinary
    const folder = `bdblog/${type}`
    const uploadResult = await uploadImage(file, folder)
    
    if (!uploadResult.success) {
      return NextResponse.json(
        { success: false, error: uploadResult.error },
        { status: 500 }
      )
    }

    // Return file info
    const fileInfo = {
      id: uploadResult.data.id,
      filename: uploadResult.data.id.split('/').pop(),
      originalName: file.name,
      url: uploadResult.data.url,
      type: type,
      size: uploadResult.data.size,
      width: uploadResult.data.width,
      height: uploadResult.data.height,
      format: uploadResult.data.format,
      uploadedAt: uploadResult.data.createdAt,
      uploadedBy: session.user.id
    }

    return NextResponse.json({
      success: true,
      data: fileInfo,
      message: 'File uploaded successfully to Cloudinary'
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

// DELETE /api/upload - ลบรูปภาพ
export async function DELETE(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get('publicId') // Cloudinary public ID

    if (!publicId) {
      return NextResponse.json(
        { success: false, error: 'Public ID is required' },
        { status: 400 }
      )
    }

    // Delete from Cloudinary
    const deleteResult = await deleteImage(publicId)
    
    if (!deleteResult.success) {
      return NextResponse.json(
        { success: false, error: deleteResult.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully from Cloudinary',
      data: deleteResult.data
    })

  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}
