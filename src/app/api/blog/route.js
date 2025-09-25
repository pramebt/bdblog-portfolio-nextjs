import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { blogPostSchema, parsePositiveInt, parseBool, createSlugFromTitle } from '@/lib/validators'

// GET /api/blog - ดึงรายการ blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parsePositiveInt(searchParams.get('page'), 1, 1, 100)
    const limit = parsePositiveInt(searchParams.get('limit'), 10, 1, 50)
    const search = searchParams.get('search') || ''
    const published = parseBool(searchParams.get('published'))
    
    const skip = (page - 1) * limit
    
    // Build where clause
    const where = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (published !== undefined) {
      where.published = published
    }
    
    // Get posts with pagination
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
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
      prisma.post.count({ where })
    ])
    
    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
    
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST /api/blog - สร้าง blog post ใหม่
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
    const validatedData = blogPostSchema.parse(body)
    
    // Generate slug from title
    const slug = createSlugFromTitle(validatedData.title)
    
    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    })
    
    if (existingPost) {
      return NextResponse.json(
        { success: false, error: 'A post with this title already exists' },
        { status: 400 }
      )
    }
    
    // Create new post
    const post = await prisma.post.create({
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
      data: post,
      message: 'Blog post created successfully'
    })
    
  } catch (error) {
    console.error('Error creating blog post:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
