import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Folder, BookOpen } from 'lucide-react'
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
      }
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
      }
    })
  ])

  // Helper function to parse and extract description
  // blockIndex: 0 = first block, 1 = second block, etc.
  const getProjectDescription = (description, blockIndex = 0) => {
    let descriptionBlocks = []
    try {
      descriptionBlocks = JSON.parse(description)
    } catch {
      descriptionBlocks = [{ id: '1', type: 'paragraph', content: description }]
    }
    
    // Get text-based blocks (skip image blocks)
    const textBlockTypes = ['paragraph', 'heading1', 'heading2', 'heading3', 'quote', 'list', 'code']
    const textBlocks = descriptionBlocks.filter(block => 
      textBlockTypes.includes(block.type)
    )
    
    // Get block at specified index
    const targetBlock = textBlocks[blockIndex]
    
    if (targetBlock) {
      // Handle list block - convert to readable text
      if (targetBlock.type === 'list') {
        const lines = targetBlock.content.split('\n').filter(line => line.trim())
        return lines.slice(0, 2).join(' ') || targetBlock.content
      }
      // Handle code block - return as is but limit length
      if (targetBlock.type === 'code') {
        return targetBlock.content.length > 150 
          ? targetBlock.content.substring(0, 150) + '...' 
          : targetBlock.content
      }
      // For other types, return content directly
      return targetBlock.content || ''
    }
    
    // Fallback: if blockIndex is 0, return original description, otherwise return empty
    return blockIndex === 0 ? (description || '') : ''
  }


  
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Explore My Work
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            Discover my thoughts through articles and see my projects in action
          </p>
        </div>

        {/* Bento Grid Layout - Minimal Apple Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(280px,auto)]">
          
          {/* Featured Project - Minimal Design */}
          {projects.length > 0 && (
            <Link 
              href={`/projects/${projects[0].slug}`}
              className="group relative md:col-span-2 lg:col-span-2 lg:row-span-2 rounded-3xl overflow-hidden bg-muted/30 transition-all duration-700 ease-out hover:bg-muted/50"
            >
              {/* Background Image with Minimal Overlay */}
              <div className="absolute inset-0">
                {projects[0].coverImage ? (
                  <>
                    <Image 
                      src={projects[0].coverImage} 
                      alt={projects[0].title} 
                      fill 
                      className="object-cover transition-all duration-1000 ease-out grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105" 
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    {/* Simple gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/20" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-muted/50" />
                )}
              </div>
              
              {/* Minimal Border */}
              <div className="absolute inset-0 rounded-3xl border border-border/50 group-hover:border-foreground/20 transition-colors duration-700" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-10 lg:p-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-foreground text-xs font-medium tracking-wide uppercase">
                      {projects[0].type.toLowerCase()}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight leading-tight">
                    {projects[0].title}
                  </h3>
                  <p className="text-muted-foreground/80 font-light leading-relaxed line-clamp-2 text-base">
                    {getProjectDescription(projects[0].description, 2)}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                    <span className="font-medium">View project</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* View All Projects Card - Minimal */}
          <Link 
            href="/projects"
            className="group relative rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-700 ease-out flex items-center justify-center border border-border/50 hover:border-foreground/20"
          >
            <div className="relative text-center p-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:bg-foreground/10 transition-all duration-500">
                <Folder className="w-6 h-6 text-foreground/60 group-hover:text-foreground transition-colors duration-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1 tracking-tight">All Projects</h3>
                <p className="text-xs text-muted-foreground/60 font-normal">Browse my work</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                <span className="font-medium">View all</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-500" />
              </div>
            </div>
          </Link>

          {/* Other Projects - Minimal Cards */}
          {projects.slice(1, 3).map((project, idx) => (
            <Link 
              key={project.id}
              href={`/projects/${project.slug}`}
              className={`group relative rounded-2xl overflow-hidden bg-muted/30 hover:bg-muted/50 transition-all duration-700 ease-out border border-border/50 hover:border-foreground/20 ${
                idx === 0 ? 'lg:row-span-1' : ''
              }`}
            >
              <div className="relative h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  {project.coverImage ? (
                    <>
                      <Image 
                        src={project.coverImage} 
                        alt={project.title} 
                        fill 
                        className="object-cover transition-all duration-1000 ease-out grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105" 
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-muted/50" />
                  )}
                </div>
                
                {/* Minimal Content */}
                <div className="flex-grow p-5 space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground text-xs font-medium tracking-wide uppercase">
                    {project.type.toLowerCase()}
                  </span>
                  <h4 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-foreground transition-colors duration-500 tracking-tight">
                    {project.title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}

          {/* Blog Posts - Minimal Vertical Cards */}
          {posts.slice(0, 3).map((post, idx) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`group relative rounded-2xl overflow-hidden bg-muted/30 hover:bg-muted/50 transition-all duration-700 ease-out border border-border/50 hover:border-foreground/20 ${
                idx === 0 ? 'lg:row-span-2' : ''
              }`}
            >
              <div className="relative h-full flex flex-col">
                {/* Image */}
                <div className={`relative ${idx === 0 ? 'aspect-[4/3]' : 'aspect-video'} overflow-hidden`}>
                  {post.coverImage ? (
                    <>
                      <Image 
                        src={post.coverImage} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-all duration-1000 ease-out grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105" 
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-muted/50" />
                  )}
                </div>
                
                {/* Minimal Content */}
                <div className="flex-grow p-5 space-y-3">
                  <h4 className={`font-semibold text-foreground line-clamp-2 group-hover:text-foreground transition-colors duration-500 tracking-tight ${
                    idx === 0 ? 'text-lg' : 'text-base'
                  }`}>
                    {post.title}
                  </h4>
                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground text-xs font-medium tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {idx === 0 && post.excerpt && (
                    <p className="text-sm text-muted-foreground/70 font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}

          {/* View All Blog Card - Minimal */}
          <Link 
            href="/blog"
            className="group relative rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-700 ease-out flex items-center justify-center border border-border/50 hover:border-foreground/20"
          >
            <div className="relative text-center p-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:bg-foreground/10 transition-all duration-500">
                <BookOpen className="w-6 h-6 text-foreground/60 group-hover:text-foreground transition-colors duration-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1 tracking-tight">All Posts</h3>
                <p className="text-xs text-muted-foreground/60 font-normal">Read my articles</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                <span className="font-medium">View all</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-500" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  )
}

export default HomeWork
