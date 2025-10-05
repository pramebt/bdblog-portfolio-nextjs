import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { projectSchema, parsePositiveInt, parseBool, createSlugFromTitle } from '@/lib/validators'

// GET /api/projects - ดึงรายการ projects
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parsePositiveInt(searchParams.get('page'), 1, 1, 100)
    const limit = parsePositiveInt(searchParams.get('limit'), 10, 1, 50)
    const search = searchParams.get('search') || ''
    const published = parseBool(searchParams.get('published'))
    const type = searchParams.get('type') // เพิ่มการกรองตามประเภท
    
    const skip = (page - 1) * limit
    
    // Build where clause
    const where = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (published !== undefined) {
      where.published = published
    }

    if (type && type !== 'all') {
      where.type = type
    }
    
    // Get projects with pagination
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.project.count({ where })
    ])

    // Get counts for each type (for tabs badges)
    const baseWhere = { ...where }
    delete baseWhere.type // Remove type filter to get all counts
    
    const [personalCount, professionalCount] = await Promise.all([
      prisma.project.count({ where: { ...baseWhere, type: 'PERSONAL' } }),
      prisma.project.count({ where: { ...baseWhere, type: 'PROFESSIONAL' } })
    ])
    
    return NextResponse.json({
      success: true,
      data: {
        projects,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        counts: {
          personal: personalCount,
          professional: professionalCount,
          total: personalCount + professionalCount
        }
      }
    })
    
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - สร้าง project ใหม่
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
    
    const body = await request.json()
    
    // Validate data
    const validatedData = projectSchema.parse(body)
    
    // Generate slug from title
    const slug = createSlugFromTitle(validatedData.title)
    
    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug }
    })
    
    if (existingProject) {
      return NextResponse.json(
        { success: false, error: 'A project with this title already exists' },
        { status: 400 }
      )
    }
    
    // Create new project
    const project = await prisma.project.create({
      data: {
        ...validatedData,
        slug,
        authorId: session.user.id
      },
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
      data: project,
      message: 'Project created successfully'
    })
    
  } catch (error) {
    console.error('Error creating project:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
