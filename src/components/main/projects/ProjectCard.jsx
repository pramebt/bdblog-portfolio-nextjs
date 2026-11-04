'use client'

import Link from 'next/link'
import { ArrowRight, FolderOpen, GithubLogo, ArrowSquareOut } from '@phosphor-icons/react/dist/ssr'

const ProjectCard = ({ project, featured = false }) => {
  const extractTextFromContent = (content) => {
    try {
      const blocks = JSON.parse(content)
      return blocks
        .filter((block) => ['paragraph', 'heading1', 'heading2', 'heading3'].includes(block.type))
        .map((block) => block.content || '')
        .join(' ')
        .substring(0, featured ? 220 : 120)
    } catch {
      return (content || '').substring(0, featured ? 220 : 120)
    }
  }

  const typeLabel = project.type === 'PROFESSIONAL' ? 'Professional' : 'Personal'
  const preview = extractTextFromContent(project.description)

  if (featured) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block overflow-hidden rounded-3xl border border-border/60 bg-muted/15 transition-all duration-700 hover:border-foreground/20"
      >
        <div className="relative aspect-[16/10] md:aspect-[21/9]">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted/40">
              <FolderOpen size={48} weight="light" className="text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="meta-pill bg-background/50 backdrop-blur-sm">{typeLabel}</span>
            {(project.githubUrl || project.liveUrl) && (
              <span className="meta-pill bg-background/50 backdrop-blur-sm">
                {project.liveUrl ? 'Live' : 'Code'}
              </span>
            )}
          </div>
          <h2 className="mb-3 max-w-3xl text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
            {project.title}
          </h2>
          <p className="mb-5 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground md:text-base line-clamp-2">
            {preview}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
            View project
            <ArrowRight size={14} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <article className="group soft-card flex h-full flex-col overflow-hidden">
      <Link href={`/projects/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/40">
            <FolderOpen size={36} weight="light" className="text-muted-foreground" />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {typeLabel}
          </span>
          <div className="flex items-center gap-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <GithubLogo size={16} weight="duotone" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Live demo"
              >
                <ArrowSquareOut size={16} weight="duotone" />
              </a>
            )}
          </div>
        </div>

        <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground line-clamp-2">
          <Link href={`/projects/${project.slug}`} className="transition-colors hover:opacity-80">
            {project.title}
          </Link>
        </h3>

        <p className="mb-5 flex-1 text-sm font-light leading-relaxed text-muted-foreground line-clamp-3">
          {preview}
        </p>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Details
          <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

export default ProjectCard
