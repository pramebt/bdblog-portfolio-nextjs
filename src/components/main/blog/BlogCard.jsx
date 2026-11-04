'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

const BlogCard = ({ post, featured = false }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

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

  const preview = post.excerpt || extractTextFromContent(post.content)
  const primaryTag = Array.isArray(post.tags) && post.tags.length > 0 ? post.tags[0] : 'Article'

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block overflow-hidden rounded-3xl border border-border/60 bg-muted/15 transition-all duration-700 hover:border-foreground/20"
      >
        <div className="relative aspect-[16/10] md:aspect-[21/9]">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full bg-muted/40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="meta-pill bg-background/50 backdrop-blur-sm">{primaryTag}</span>
            <span className="meta-pill bg-background/50 backdrop-blur-sm">
              {formatDate(post.createdAt)}
            </span>
          </div>
          <h2 className="mb-3 max-w-3xl text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
            {post.title}
          </h2>
          <p className="mb-5 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground md:text-base line-clamp-2">
            {preview}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
            Read article
            <ArrowRight size={14} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <article className="group soft-card flex h-full flex-col overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-muted/30">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted/60 to-muted/20" />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {primaryTag}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/70">
            {formatDate(post.createdAt)}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:opacity-80">
            {post.title}
          </Link>
        </h3>

        <p className="mb-5 flex-1 text-sm font-light leading-relaxed text-muted-foreground line-clamp-3">
          {preview}
        </p>

        {Array.isArray(post.tags) && post.tags.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {post.tags.slice(1, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 px-2.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Read more
          <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

export default BlogCard
