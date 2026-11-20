import React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { prisma } from '@/lib/prisma'
import HomeProjects from './HomeProjects'
import SpotlightCard from '@/components/main/projects/SpotlightCard'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const POST_GRID = { 1: '', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' }

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
        githubUrl: true,
        liveUrl: true,
        createdAt: true,
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
        createdAt: true,
      },
    }),
  ])

  const projectItems = projects.map((project) => ({ ...project, createdAt: project.createdAt.toISOString() }))
  const isSinglePost = posts.length === 1

  return (
    <section className="py-24 md:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-14">
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
            <Link
              href="/projects"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 px-5 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:border-foreground/25 hover:text-foreground"
            >
              All projects
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </ScrollReveal>

        <HomeProjects projects={projectItems} />

        {posts.length > 0 && (
          <div className="mt-20">
            <ScrollReveal className="mb-8 flex items-end justify-between gap-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Latest writing
              </h3>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                All posts <ArrowRight size={14} weight="bold" />
              </Link>
            </ScrollReveal>

            <div className={`grid grid-cols-1 gap-4 ${POST_GRID[Math.min(posts.length, 3)]}`}>
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08} yOffset={20}>
                  <SpotlightCard
                    as="article"
                    className={`group soft-card flex h-full flex-col overflow-hidden ${
                      isSinglePost ? 'md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]' : ''
                    }`}
                  >
                    <div
                      className={`relative aspect-[16/10] overflow-hidden rounded-xl bg-muted/30 ${
                        isSinglePost ? 'm-2 mb-0 md:mb-2' : 'm-2 mb-0'
                      }`}
                    >
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-muted/70 to-muted/20" />
                      )}
                      <span className="absolute right-3 top-3 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:rotate-45 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background group-hover:opacity-100">
                        <ArrowUpRight size={16} weight="bold" />
                      </span>
                    </div>
                    <div className={`flex flex-1 flex-col p-5 ${isSinglePost ? 'md:justify-center md:p-10' : ''}`}>
                      <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {Array.isArray(post.tags) && post.tags.length > 0 ? `${post.tags[0]} · ` : ''}
                        {formatDate(post.createdAt)}
                      </span>
                      <h4
                        className={`mb-2 font-semibold tracking-tight text-foreground line-clamp-2 ${
                          isSinglePost ? 'text-base md:text-2xl' : 'text-base'
                        }`}
                      >
                        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:z-[5]">
                          {post.title}
                        </Link>
                      </h4>
                      {post.excerpt && (
                        <p className="text-sm font-light leading-relaxed text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default HomeWork
