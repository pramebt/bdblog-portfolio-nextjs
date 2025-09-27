import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { projectSchema, createSlugFromTitle } from '@/lib/validators'
import { cleanupProjectImages } from '@/lib/image-cleanup'

// Schema สำหรับ validate project data (สำหรับ update) - ใช้ partial ของ schema เดิม
const projectUpdateSchema = projectSchema.partial()

// GET /api/projects/[id] - ดึง project เดียว (รองรับทั้ง ID และ slug)
export async function GET(request, { params }) {
  try {
    const { id } = await params
    
    // Try to find project by ID first, then by slug
    let project = await prisma.project.findUnique({
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
    if (!project) {
      project = await prisma.project.findUnique({
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
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: project
    })
    
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[id] - แก้ไข project
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
    const validatedData = projectUpdateSchema.parse(body)
    
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    })
    
    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    // Check if user owns this project or is admin
    if (existingProject.authorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You can only edit your own projects' },
        { status: 403 }
      )
    }
    
    // Generate new slug if title is being updated
    let updateData = { ...validatedData }
    if (validatedData.title && validatedData.title !== existingProject.title) {
      const newSlug = createSlugFromTitle(validatedData.title)
      
      // Check if new slug already exists (excluding current project)
      const slugExists = await prisma.project.findFirst({
        where: {
          slug: newSlug,
          id: { not: id }
        }
      })
      
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'A project with this title already exists' },
          { status: 400 }
        )
      }
      
      updateData.slug = newSlug
    }
    
    // Update project
    const updatedProject = await prisma.project.update({
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
      data: updatedProject,
      message: 'Project updated successfully'
    })
    
  } catch (error) {
    console.error('Error updating project:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id] - ลบ project
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
    
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    })
    
    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    // Check if user owns this project or is admin
    if (existingProject.authorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You can only delete your own projects' },
        { status: 403 }
      )
    }
    
    // Cleanup associated images from Cloudinary
    try {
      await cleanupProjectImages(existingProject)
    } catch (error) {
      console.error('Error cleaning up images:', error)
      // Continue with deletion even if image cleanup fails
    }
    
    // Delete project
    await prisma.project.delete({
      where: { id }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })
    
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
