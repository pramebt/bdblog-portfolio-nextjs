'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  X, 
  SortAsc, 
  SortDesc,
  Calendar,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react'

const BlogFilters = ({ filters, onFilterChange, loading }) => {
  const [searchInput, setSearchInput] = useState(filters.search || '')
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search || '')

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput)
    }, 500) // 500ms delay

    return () => clearTimeout(timer)
  }, [searchInput])

  // Update filters when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFilterChange({ search: debouncedSearch })
    }
  }, [debouncedSearch, filters.search, onFilterChange])

  // Handle filter changes
  const handleStatusChange = (value) => {
    let published
    if (value === 'all') {
      published = undefined
    } else if (value === 'published') {
      published = true
    } else if (value === 'draft') {
      published = false
    }
    onFilterChange({ published })
  }

  const handleSortChange = (value) => {
    onFilterChange({ sort: value })
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchInput('')
    onFilterChange({
      search: '',
      published: undefined,
      sort: 'createdAt_desc'
    })
  }

  // Check if any filters are active
  const hasActiveFilters = filters.search || 
                          filters.published !== undefined || 
                          filters.sort !== 'createdAt_desc'

  // Get current status value for select
  const getCurrentStatus = () => {
    if (filters.published === undefined) return 'all'
    if (filters.published === true) return 'published'
    if (filters.published === false) return 'draft'
    return 'all'
  }

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.published !== undefined) count++
    if (filters.sort !== 'createdAt_desc') count++
    return count
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Filters</span>
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {getActiveFilterCount()} active
                </Badge>
              )}
            </div>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                disabled={loading}
                className="text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  disabled={loading}
                  className="pl-10 ring-0 focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none "
                />
                {searchInput && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchInput('')}
                    disabled={loading}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Status
              </label>
              <Select
                value={getCurrentStatus()}
                onValueChange={handleStatusChange}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      All Posts
                    </div>
                  </SelectItem>
                  <SelectItem value="published">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-600" />
                      Published
                    </div>
                  </SelectItem>
                  <SelectItem value="draft">
                    <div className="flex items-center gap-2">
                      <EyeOff className="h-4 w-4 text-orange-600" />
                      Draft
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Sort By
              </label>
              <Select
                value={filters.sort}
                onValueChange={handleSortChange}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt_desc">
                    <div className="flex items-center gap-2">
                      <SortDesc className="h-4 w-4" />
                      Newest First
                    </div>
                  </SelectItem>
                  <SelectItem value="createdAt_asc">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4" />
                      Oldest First
                    </div>
                  </SelectItem>
                  <SelectItem value="updatedAt_desc">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Recently Updated
                    </div>
                  </SelectItem>
                  <SelectItem value="title_asc">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4" />
                      Title A-Z
                    </div>
                  </SelectItem>
                  <SelectItem value="title_desc">
                    <div className="flex items-center gap-2">
                      <SortDesc className="h-4 w-4" />
                      Title Z-A
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quick Filters */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Quick Filters
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filters.published === true ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange(filters.published === true ? 'all' : 'published')}
                  disabled={loading}
                  className="text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Published
                </Button>
                <Button
                  variant={filters.published === false ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange(filters.published === false ? 'all' : 'draft')}
                  disabled={loading}
                  className="text-xs"
                >
                  <EyeOff className="h-3 w-3 mr-1" />
                  Drafts
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="pt-2 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                
                {filters.search && (
                  <Badge variant="secondary" className="gap-1">
                    Search: "{filters.search}"
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchInput('')
                        onFilterChange({ search: '' })
                      }}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {filters.published !== undefined && (
                  <Badge variant="secondary" className="gap-1">
                    Status: {filters.published ? 'Published' : 'Draft'}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFilterChange({ published: undefined })}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {filters.sort !== 'createdAt_desc' && (
                  <Badge variant="secondary" className="gap-1">
                    Sort: {filters.sort.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFilterChange({ sort: 'createdAt_desc' })}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default BlogFilters