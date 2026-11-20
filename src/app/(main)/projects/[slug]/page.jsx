'use client'

import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import { ArrowRight, ArrowUpRight, GithubLogo, ShareNetwork } from '@phosphor-icons/react/dist/ssr'
import ContentBlocks, { parseBlocks } from '@/components/main/shared/ContentBlocks'
import { BackLink, DetailError, DetailLoading } from '@/components/main/shared/DetailStates'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const ease = [0.16, 1, 0.3, 1]

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

const ProjectPage = () => {
  const params = useParams()
  const slug = params.slug
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`/api/projects/${slug}`)
        const data = await response.json()

        if (!response.ok) {
          if (response.status === 404) {
            notFound()
            return
          }
          throw new Error(data.error || 'Failed to fetch project')
        }

        if (data.success) {
          if (!data.data.published) {
            notFound()
            return
          }
          setProject(data.data)
        }
      } catch (err) {
        console.error('Error fetching project:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProject()
    }
  }, [slug])

  const handleShare = async () => {
    if (navigator.share && project) {
      try {
        await navigator.share({
          title: project.title,
          text: project.title,
          url: window.location.href,
        })
        return
      } catch (err) {
        if (err?.name === 'AbortError') return
      }
    }
    await navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied')
  }

  if (loading) {
    return <DetailLoading label="Loading project" />
  }

  if (error) {
    return <DetailError message={error} backHref="/projects" backLabel="Back to projects" />
  }

  if (!project) {
    return notFound()
  }

  const descriptionBlocks = parseBlocks(project.description)
  const typeLabel = project.type === 'PROFESSIONAL' ? 'Professional' : 'Personal'
  const images = Array.isArray(project.images) ? project.images : []

  const actions = (
    <>
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
          className="inline-flex items-center gap-2 rounded-full border border-border/70 px-5 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:border-foreground/25 hover:text-foreground"
        >
          <GithubLogo size={16} weight="duotone" />
          Source code
        </a>
      )}
    </>
  )

  return (
    <article className="relative pb-24">
      <div aria-hidden className="page-ambient" />

      <header className="px-4 pb-10 pt-16 md:pb-14 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <BackLink href="/projects" label="All projects" />
          </motion.div>

          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.04, ease }}
          >
            {typeLabel} project
          </motion.p>
          <motion.h1
            className="mb-8 max-w-4xl text-4xl font-semibold tracking-tight text-foreground text-balance md:text-6xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            {project.title}
          </motion.h1>

          <motion.div
            className="flex flex-wrap items-center justify-between gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
          >
            <div className="flex flex-wrap items-center gap-2">
              {project.author?.name && <span className="meta-pill">{project.author.name}</span>}
              <span className="meta-pill">{formatDate(project.createdAt)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {actions}
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all duration-300 hover:border-foreground/25 hover:text-foreground"
              >
                <ShareNetwork size={16} weight="duotone" />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {project.coverImage && (
        <motion.div
          className="px-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.26, ease }}
        >
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/50 bg-muted/30">
            <img src={project.coverImage} alt={project.title} className="aspect-[16/9] w-full object-cover" />
          </div>
        </motion.div>
      )}

      <div className="px-4 pt-14 md:pt-20">
        <div className="mx-auto max-w-3xl">
          <p className="section-label">Overview</p>
          <ContentBlocks blocks={descriptionBlocks} />
        </div>
      </div>

      {images.length > 0 && (
        <section className="px-4 pt-16 md:pt-24">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <p className="section-label">Gallery</p>
              <h2 className="mb-10 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                A closer look
              </h2>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2" staggerDelay={0.08}>
              {images.map((image, index) => (
                <StaggerItem key={image}>
                  <a
                    href={image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group soft-card block overflow-hidden"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <div className="px-4 pt-16 md:pt-24">
        <footer className="mx-auto flex max-w-5xl flex-col gap-6 border-t border-border/60 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/projects"
            className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Explore more projects
            <ArrowRight size={14} weight="bold" />
          </Link>
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        </footer>
      </div>
    </article>
  )
}

export default ProjectPage
