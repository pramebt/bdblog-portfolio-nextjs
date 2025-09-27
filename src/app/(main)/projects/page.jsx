'use client'

import { useState, useEffect } from 'react'
import ProjectHeader from '@/components/main/projects/ProjectHeader'
import ProjectSearch from '@/components/main/projects/ProjectSearch'
import ProjectResultsInfo from '@/components/main/projects/ProjectResultsInfo'
import ProjectGrid from '@/components/main/projects/ProjectGrid'
import ProjectPagination from '@/components/main/projects/ProjectPagination'
import ProjectEmptyState from '@/components/main/projects/ProjectEmptyState'
import ProjectErrorState from '@/components/main/projects/ProjectErrorState'
import ProjectLoadingState from '@/components/main/projects/ProjectLoadingState'

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProjects, setTotalProjects] = useState(0)

  // Fetch projects
  const fetchProjects = async (page = 1, search = '') => {
    try {
      setLoading(true)
      setError('')
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        published: 'true'
      })
      
      if (search) {
        params.append('search', search)
      }
      
      const response = await fetch(`/api/projects?${params}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects')
      }
      
      if (data.success) {
        setProjects(data.data.projects)
        setCurrentPage(data.data.pagination.page)
        setTotalPages(data.data.pagination.pages)
        setTotalProjects(data.data.pagination.total)
      }
      
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchProjects(1, searchTerm)
  }, [])

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    fetchProjects(1, searchTerm)
  }

  // Handle pagination
  const handlePageChange = (page) => {
    fetchProjects(page, searchTerm)
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('')
    fetchProjects(1, '')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <ProjectHeader />

        {/* Search */}
        <ProjectSearch 
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          loading={loading}
        />

        {/* Results Info */}
        <ProjectResultsInfo 
          searchTerm={searchTerm}
          totalProjects={totalProjects}
          loading={loading}
        />

        {/* Error State */}
        <ProjectErrorState error={error} />

        {/* Loading State */}
        <ProjectLoadingState loading={loading} />

        {/* Projects Grid */}
        <ProjectGrid projects={projects} loading={loading} />

        {/* Pagination */}
        <ProjectPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Empty State */}
        {!loading && projects.length === 0 && !error && (
          <ProjectEmptyState 
            searchTerm={searchTerm}
            onClearSearch={handleClearSearch}
          />
        )}
      </div>
    </div>
  )
}

export default ProjectsPage