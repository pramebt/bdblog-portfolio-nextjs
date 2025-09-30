import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/admin/stats - ดึงสถิติสำหรับ admin dashboard
export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get counts in parallel for better performance
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      totalProjects,
      publishedProjects,
      draftProjects
    ] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.post.count({ where: { published: false } }),
      prisma.project.count(),
      prisma.project.count({ where: { published: true } }),
      prisma.project.count({ where: { published: false } })
    ])

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const [recentPosts, recentProjects] = await Promise.all([
      prisma.post.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo
          }
        }
      }),
      prisma.project.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo
          }
        }
      })
    ])

    const stats = {
      posts: {
        total: totalPosts,
        published: publishedPosts,
        draft: draftPosts,
        recent: recentPosts
      },
      projects: {
        total: totalProjects,
        published: publishedProjects,
        draft: draftProjects,
        recent: recentProjects
      },
      overview: {
        totalContent: totalPosts + totalProjects,
        publishedContent: publishedPosts + publishedProjects,
        draftContent: draftPosts + draftProjects,
        recentActivity: recentPosts + recentProjects
      }
    }

    return NextResponse.json({
      success: true,
      data: stats
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
