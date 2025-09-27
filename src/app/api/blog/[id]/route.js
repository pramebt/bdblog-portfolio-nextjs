import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { blogPostSchema, createSlugFromTitle } from '@/lib/validators'
import { cleanupBlogImages } from '@/lib/image-cleanup'

// Schema สำหรับ validate blog post data (สำหรับ update) - ใช้ partial ของ schema เดิม
const blogPostUpdateSchema = blogPostSchema.partial()

// GET /api/blog/[id] - ดึง blog post เดียว (รองรับทั้ง ID และ slug)
export async function GET(request, { params }) {
  try {
    const { id } = await params
    
    // Try to find post by ID first, then by slug
    let post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    
    // If not found by ID, try to find by slug
    if (!post) {
      post = await prisma.post.findUnique({
        where: { slug: id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })
    }
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: post
    })
    
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// PUT /api/blog/[id] - แก้ไข blog post
export async function PUT(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { id } = await params
    const body = await request.json()
    
    // Validate data
    const validatedData = blogPostUpdateSchema.parse(body)
    
    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id }
    })
    
    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }
    
    // Check if user owns this post or is admin
    if (existingPost.authorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You can only edit your own posts' },
        { status: 403 }
      )
    }
    
    // Generate new slug if title is being updated
    let updateData = { ...validatedData }
    if (validatedData.title && validatedData.title !== existingPost.title) {
      const newSlug = createSlugFromTitle(validatedData.title)
      
      // Check if new slug already exists (excluding current post)
      const slugExists = await prisma.post.findFirst({
        where: {
          slug: newSlug,
          id: { not: id }
        }
      })
      
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'A post with this title already exists' },
          { status: 400 }
        )
      }
      
      updateData.slug = newSlug
    }
    
    // Update post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    
    return NextResponse.json({
      success: true,
      data: updatedPost,
      message: 'Blog post updated successfully'
    })
    
  } catch (error) {
    console.error('Error updating blog post:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE /api/blog/[id] - ลบ blog post
export async function DELETE(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { id } = await params
    
    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id }
    })
    
    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }
    
    // Check if user owns this post or is admin
    if (existingPost.authorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You can only delete your own posts' },
        { status: 403 }
      )
    }
    
    // Cleanup associated images from Cloudinary
    try {
      await cleanupBlogImages(existingPost)
    } catch (error) {
      console.error('Error cleaning up images:', error)
      // Continue with deletion even if image cleanup fails
    }
    
    // Delete post
    await prisma.post.delete({
      where: { id }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    })
    
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
