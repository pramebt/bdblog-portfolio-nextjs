'use client'

import { MagnifyingGlass, CircleNotch } from '@phosphor-icons/react/dist/ssr'

const ProjectSearch = ({
  searchTerm,
  onSearchChange,
  onSubmit,
  loading = false,
  placeholder = 'Search projects…',
}) => {
  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-md">
      <MagnifyingGlass
        size={18}
        weight="light"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70"
      />
      <input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={onSearchChange}
        className="w-full rounded-full border border-border/70 bg-background/70 py-3 pl-11 pr-12 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/25 focus:bg-background"
      />
      {loading && (
        <CircleNotch
          size={16}
          weight="bold"
          className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground"
        />
      )}
    </form>
  )
}

export default ProjectSearch
