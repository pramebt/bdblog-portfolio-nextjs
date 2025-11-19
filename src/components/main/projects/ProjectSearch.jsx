'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MagnifyingGlass, CircleNotch } from '@phosphor-icons/react'

const ProjectSearch = ({ 
  searchTerm, 
  onSearchChange, 
  onSubmit, 
  loading = false,
  placeholder = "Search for projects...",
  buttonText = "Search"
}) => {
  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-sm mx-auto">
          <MagnifyingGlass size={20} weight="light" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/60" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={onSearchChange}
            className="pl-12 pr-4 py-3 rounded-full bg-muted/30 border-muted/40 text-base placeholder:text-muted-foreground/60 ring-0 focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none border-0 focus:border-0 focus-visible:border-0 focus:bg-muted/50 transition-colors"
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          variant="ghost"
          size="sm"
          className="rounded-full px-6 py-5 text-base font-medium hover:bg-muted/50"
        >
          {loading ? <CircleNotch size={16} weight="bold" className="animate-spin" /> : buttonText}
        </Button>
      </form>
    </div>
  )
}

export default ProjectSearch
