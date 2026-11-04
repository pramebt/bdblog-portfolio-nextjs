import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { prisma } from '@/lib/prisma'

const HomeWork = async () => {
  const [projects, posts] = await Promise.all([
    prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        coverImage: true,
        description: true,
        type: true,
      },
    }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        coverImage: true,
        excerpt: true,
        tags: true,
      },
    }),
  ])

  const getProjectDescription = (description, blockIndex = 0) => {
    let descriptionBlocks = []
    try {
      descriptionBlocks = JSON.parse(description)
    } catch {
      descriptionBlocks = [{ id: '1', type: 'paragraph', content: description }]
    }

    const textBlockTypes = ['paragraph', 'heading1', 'heading2', 'heading3', 'quote', 'list', 'code']
    const textBlocks = descriptionBlocks.filter((block) => textBlockTypes.includes(block.type))
    const targetBlock = textBlocks[blockIndex]

    if (targetBlock) {
      if (targetBlock.type === 'list') {
        const lines = targetBlock.content.split('\n').filter((line) => line.trim())
        return lines.slice(0, 2).join(' ') || targetBlock.content
      }
      if (targetBlock.type === 'code') {
        return targetBlock.content.length > 150
          ? targetBlock.content.substring(0, 150) + '...'
          : targetBlock.content
      }
      return targetBlock.content || ''
    }

    return blockIndex === 0 ? description || '' : ''
  }

  return (
    <section className="py-24 md:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="section-label">Selected work</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-3">
                Projects & writing
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed max-w-xl">
                Recent builds and notes from the journey.
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                All projects <ArrowRight size={14} weight="bold" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                All posts <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>

        {/* Featured project */}
        {projects[0] && (
          <Link
            href={`/projects/${projects[0].slug}`}
            className="group relative mb-6 block overflow-hidden rounded-3xl border border-border/60 bg-muted/20 transition-all duration-700 hover:border-foreground/20"
          >
            <div className="relative aspect-[16/10] md:aspect-[21/9]">
              {projects[0].coverImage ? (
                <Image
                  src={projects[0].coverImage}
                  alt={projects[0].title}
                  fill
                  priority
                  quality={90}
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 64rem, 100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-muted/50" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <span className="meta-pill mb-4 bg-background/50 backdrop-blur-sm">
                {projects[0].type.toLowerCase()}
              </span>
              <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
                {projects[0].title}
              </h3>
              <p className="max-w-2xl text-sm md:text-base text-muted-foreground font-light line-clamp-2 mb-4">
                {getProjectDescription(projects[0].description, 0)}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                View project
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        )}

        {/* Secondary grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.slice(1, 3).map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group soft-card overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted/40" />
                )}
              </div>
              <div className="p-5 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {project.type.toLowerCase()}
                </span>
                <h4 className="text-base font-semibold tracking-tight text-foreground line-clamp-2">
                  {project.title}
                </h4>
              </div>
            </Link>
          ))}

          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group soft-card overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted/40" />
                )}
              </div>
              <div className="p-5 space-y-2">
                {Array.isArray(post.tags) && post.tags.length > 0 && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {post.tags[0]}
                  </span>
                )}
                <h4 className="text-base font-semibold tracking-tight text-foreground line-clamp-2">
                  {post.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeWork
