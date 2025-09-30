'use client'

import { useState, useEffect, useCallback } from 'react'

export function useAdminStats() {
  const [stats, setStats] = useState({
    posts: {
      total: 0,
      published: 0,
      draft: 0,
      recent: 0
    },
    projects: {
      total: 0,
      published: 0,
      draft: 0,
      recent: 0
    },
    overview: {
      totalContent: 0,
      publishedContent: 0,
      draftContent: 0,
      recentActivity: 0
    }
  })
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/admin/stats')
      const result = await response.json()

      if (result.success) {
        setStats(result.data)
      } else {
        throw new Error(result.error || 'Failed to fetch stats')
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Refresh stats
  const refreshStats = useCallback(() => {
    fetchStats()
  }, [fetchStats])

  // Fetch stats on mount
  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats()
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    refreshStats
  }
}
