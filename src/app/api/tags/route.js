import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/tags - ดึงรายการ tags ทั้งหมด
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    
    // Get all posts to extract unique tags
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        ...(search && {
          tags: {
            hasSome: [search]
          }
        })
      },
      select: {
        tags: true
      }
    })
    
    // Extract and count unique tags
    const tagCounts = {}
    posts.forEach(post => {
      post.tags.forEach(tag => {
        if (!search || tag.toLowerCase().includes(search.toLowerCase())) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        }
      })
    })
    
    // Convert to array and sort by count
    const tags = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
    
    return NextResponse.json({
      success: true,
      data: tags
    })
    
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    )
  }
}

// POST /api/tags - สร้าง tag ใหม่ (สำหรับ admin)
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
    const { name } = body
    
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Tag name is required' },
        { status: 400 }
      )
    }
    
    // Normalize tag name (lowercase, trim)
    const normalizedName = name.toLowerCase().trim()
    
    if (normalizedName.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Tag name cannot be empty' },
        { status: 400 }
      )
    }
    
    // Check if tag already exists by looking at existing posts
    const existingPosts = await prisma.post.findMany({
      where: {
        tags: {
          has: normalizedName
        }
      },
      take: 1
    })
    
    if (existingPosts.length > 0) {
      return NextResponse.json({
        success: true,
        data: { name: normalizedName, count: 0 },
        message: 'Tag already exists'
      })
    }
    
    // Return the new tag (we don't store tags separately, they exist only in posts)
    return NextResponse.json({
      success: true,
      data: { name: normalizedName, count: 0 },
      message: 'Tag created successfully'
    })
    
  } catch (error) {
    console.error('Error creating tag:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create tag' },
      { status: 500 }
    )
  }
}
