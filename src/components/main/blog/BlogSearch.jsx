'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'

const BlogSearch = ({ 
  searchTerm, 
  onSearchChange, 
  onSubmit, 
  loading = false,
  placeholder = "Search for blog posts...",
  buttonText = "Search"
}) => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <form onSubmit={onSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={onSearchChange}
            className="pl-10 ring-0 focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none border-0 focus:border-0 focus-visible:border-0"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : buttonText}
        </Button>
      </form>
    </div>
  )
}

export default BlogSearch
