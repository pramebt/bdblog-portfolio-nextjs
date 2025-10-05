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
import ProjectTabs from '@/components/main/projects/ProjectTabs'
import { BackgroundBeams } from '@/components/ui/background-beams'
const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProjects, setTotalProjects] = useState(0)
  const [counts, setCounts] = useState({ personal: 0, professional: 0, total: 0 })

  // Fetch projects
  const fetchProjects = async (page = 1, search = '', type = 'all') => {
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

      if (type && type !== 'all') {
        params.append('type', type)
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
        setCounts(data.data.counts || { personal: 0, professional: 0, total: 0 })
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
    fetchProjects(1, searchTerm, activeTab)
  }, [])

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    fetchProjects(1, searchTerm, activeTab)
  }

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
    fetchProjects(1, searchTerm, tab)
  }

  // Handle pagination
  const handlePageChange = (page) => {
    fetchProjects(page, searchTerm, activeTab)
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('')
    fetchProjects(1, '', activeTab)
  }

  return (
    <div className="min-h-screen bg-background">
      <BackgroundBeams />
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">
            Projects
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            A collection of web applications and development projects I've built.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <ProjectSearch 
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              onSubmit={handleSearch}
              loading={loading}
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <ProjectTabs 
            projects={projects}
            personalCount={counts.personal}
            professionalCount={counts.professional}
            totalCount={counts.total}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          >
            {/* Results Info */}
            <ProjectResultsInfo searchTerm={searchTerm} totalProjects={totalProjects} loading={loading} />

            {/* Error State */}
            <ProjectErrorState error={error} />

            {/* Loading State */}
            <ProjectLoadingState loading={loading} />

            {/* Projects Grid */}
            <ProjectGrid projects={projects} loading={loading} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16">
                <ProjectPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* Empty State */}
            {!loading && projects.length === 0 && !error && (
              <ProjectEmptyState 
                searchTerm={searchTerm}
                onClearSearch={handleClearSearch}
              />
            )}
          </ProjectTabs>
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage