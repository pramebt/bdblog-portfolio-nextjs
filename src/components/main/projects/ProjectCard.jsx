'use client'

import Link from 'next/link'
import { ArrowUpRight, FolderOpen, GithubLogo } from '@phosphor-icons/react/dist/ssr'
import SpotlightCard from './SpotlightCard'

export const getProjectPreview = (description, length = 140) => {
  try {
    const blocks = JSON.parse(description)
    return blocks
      .filter((block) => ['paragraph', 'heading1', 'heading2', 'heading3'].includes(block.type))
      .map((block) => block.content || '')
      .join(' ')
      .substring(0, length)
  } catch {
    return (description || '').substring(0, length)
  }
}

export const getTypeLabel = (type) => (type === 'PROFESSIONAL' ? 'Professional' : 'Personal')

export const formatIndex = (index) => String(index).padStart(2, '0')

const Cover = ({ project, eager = false, iconSize = 40 }) =>
  project.coverImage ? (
    <img
      src={project.coverImage}
      alt={project.title}
      loading={eager ? 'eager' : 'lazy'}
      className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted/70 to-muted/20">
      <FolderOpen size={iconSize} weight="light" className="text-muted-foreground" />
    </div>
  )

const ArrowBadge = ({ className = '' }) => (
  <span
    className={`flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background ${className}`}
  >
    <ArrowUpRight size={16} weight="bold" />
  </span>
)

const ExternalLinks = ({ project, size = 'sm' }) => {
  if (!project.githubUrl && !project.liveUrl) return null

  if (size === 'lg') {
    return (
      <div className="relative z-10 flex flex-wrap gap-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Live demo
            <ArrowUpRight size={14} weight="bold" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-5 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:border-foreground/25 hover:text-foreground"
          >
            <GithubLogo size={16} weight="duotone" />
            Source
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="relative z-10 flex items-center gap-1">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
        >
          <GithubLogo size={16} weight="duotone" />
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
        >
          <ArrowUpRight size={16} weight="bold" />
        </a>
      )}
    </div>
  )
}

const ProjectCard = ({ project, index = 1, variant = 'card' }) => {
  const typeLabel = getTypeLabel(project.type)
  const year = new Date(project.createdAt).getFullYear()
  const href = `/projects/${project.slug}`

  if (variant === 'featured' || variant === 'wide') {
    const featured = variant === 'featured'
    const TitleTag = featured ? 'h2' : 'h3'
    return (
      <SpotlightCard as="article" className="group soft-card grid h-full overflow-hidden lg:grid-cols-12">
        <div
          className={`relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto ${
            featured ? 'lg:min-h-[28rem]' : 'lg:min-h-[22rem]'
          }`}
        >
          <Cover project={project} eager={featured} iconSize={56} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/30" />
          {featured && (
            <span className="meta-pill absolute left-4 top-4 bg-background/70 text-foreground backdrop-blur-md md:left-6 md:top-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
              </span>
              Latest
            </span>
          )}
        </div>

        <div className="flex flex-col p-6 md:p-10 lg:col-span-5">
          <div className="mb-10 flex items-start justify-between gap-4">
            <span
              className={`font-mono font-medium leading-none tracking-tighter text-foreground/15 ${
                featured ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'
              }`}
            >
              {formatIndex(index)}
            </span>
            <ArrowBadge />
          </div>

          <div className="mt-auto">
            <p className="section-label">
              {typeLabel} · {year}
            </p>
            <TitleTag
              className={`mb-4 font-semibold tracking-tight text-foreground text-balance ${
                featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
              }`}
            >
              <Link href={href} className="after:absolute after:inset-0 after:z-[5]">
                {project.title}
              </Link>
            </TitleTag>
            <p className="mb-8 text-sm font-light leading-relaxed text-muted-foreground md:text-base line-clamp-3">
              {getProjectPreview(project.description, 220)}
            </p>
            <ExternalLinks project={project} size="lg" />
          </div>
        </div>
      </SpotlightCard>
    )
  }

  return (
    <SpotlightCard as="article" className="group soft-card flex h-full flex-col overflow-hidden">
      <div className="relative m-2 mb-0 aspect-[16/10] overflow-hidden rounded-xl bg-muted/30">
        <Cover project={project} />
        <span className="absolute left-3 top-3 rounded-full bg-background/75 px-2.5 py-1 font-mono text-[11px] text-foreground backdrop-blur-md">
          {formatIndex(index)}
        </span>
        <ArrowBadge className="absolute right-3 top-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {typeLabel} · {year}
          </span>
          <ExternalLinks project={project} />
        </div>

        <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground line-clamp-2 md:text-xl">
          <Link href={href} className="after:absolute after:inset-0 after:z-[5]">
            {project.title}
          </Link>
        </h3>

        <p className="text-sm font-light leading-relaxed text-muted-foreground line-clamp-2">
          {getProjectPreview(project.description)}
        </p>
      </div>
    </SpotlightCard>
  )
}

export default ProjectCard
