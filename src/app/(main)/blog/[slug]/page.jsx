'use client'

import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import { ArrowRight, ShareNetwork } from '@phosphor-icons/react/dist/ssr'
import ContentBlocks, { parseBlocks } from '@/components/main/shared/ContentBlocks'
import { BackLink, DetailError, DetailLoading } from '@/components/main/shared/DetailStates'

const ease = [0.16, 1, 0.3, 1]

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

const calculateReadingTime = (content) => {
  const text = parseBlocks(content)
    .filter((block) => ['paragraph', 'heading1', 'heading2', 'heading3', 'list', 'quote'].includes(block.type))
    .map((block) => block.content || '')
    .join(' ')
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200))
}

const BlogPostPage = () => {
  const params = useParams()
  const slug = params.slug
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`/api/blog/${slug}`)
        const data = await response.json()

        if (!response.ok) {
          if (response.status === 404) {
            notFound()
            return
          }
          throw new Error(data.error || 'Failed to fetch post')
        }

        if (data.success) {
          if (!data.data.published) {
            notFound()
            return
          }
          setPost(data.data)
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.title,
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
    return <DetailLoading label="Loading article" />
  }

  if (error) {
    return <DetailError message={error} backHref="/blog" backLabel="Back to blog" />
  }

  if (!post) {
    return notFound()
  }

  const contentBlocks = parseBlocks(post.content)
  const tags = Array.isArray(post.tags) ? post.tags : []

  return (
    <article className="relative pb-24">
      <div aria-hidden className="page-ambient" />

      <header className="px-4 pb-10 pt-16 md:pb-14 md:pt-24">
        <div className="mx-auto max-w-3xl">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <BackLink href="/blog" label="All posts" />
          </motion.div>

          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.04, ease }}
          >
            {tags[0] || 'Writing'}
          </motion.p>
          <motion.h1
            className="mb-5 text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            {post.title}
          </motion.h1>
          {post.excerpt && (
            <motion.p
              className="mb-8 text-lg font-light leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease }}
            >
              {post.excerpt}
            </motion.p>
          )}

          <motion.div
            className="flex flex-wrap items-center justify-between gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
          >
            <div className="flex flex-wrap items-center gap-2">
              {post.author?.name && <span className="meta-pill">{post.author.name}</span>}
              <span className="meta-pill">{formatDate(post.createdAt)}</span>
              <span className="meta-pill">{calculateReadingTime(post.content)} min read</span>
            </div>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-foreground/25 hover:text-foreground"
            >
              <ShareNetwork size={16} weight="duotone" />
              Share
            </button>
          </motion.div>
        </div>
      </header>

      {post.coverImage && (
        <motion.div
          className="px-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease }}
        >
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/50 bg-muted/30">
            <img src={post.coverImage} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </div>
        </motion.div>
      )}

      <div className="px-4 pt-14 md:pt-20">
        <div className="mx-auto max-w-3xl">
          <ContentBlocks blocks={contentBlocks} />

          {tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <footer className="mt-16 space-y-10 border-t border-border/60 pt-10">
            <div className="soft-card flex items-start gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 font-semibold text-foreground">
                {(post.author?.name || '?').charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="section-label mb-1">Written by</p>
                <h3 className="mb-1 font-semibold tracking-tight text-foreground">{post.author?.name}</h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  Developer who loves learning new technology and sharing what I learn along the way.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/blog"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Read more articles
                <ArrowRight size={14} weight="bold" />
              </Link>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ShareNetwork size={16} weight="duotone" />
                Share this article
              </button>
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}

export default BlogPostPage
