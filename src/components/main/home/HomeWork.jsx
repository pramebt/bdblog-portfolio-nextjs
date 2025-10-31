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
  const getProjectDescription = (description) => {
    let descriptionBlocks = []
    try {
      descriptionBlocks = JSON.parse(description)
    } catch {
      descriptionBlocks = [{ id: '1', type: 'paragraph', content: description }]
    }
    
    // Get first paragraph content
    const firstParagraph = descriptionBlocks.find(block => 
      ['paragraph', 'heading1', 'heading2', 'heading3'].includes(block.type)
    )
    return firstParagraph?.content || description || ''
  }


  
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Explore My Work
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            Discover my thoughts through articles and see my projects in action
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(280px,auto)]">
          
          {/* Featured Project - Large Card */}
          {projects.length > 0 && (
            <Link 
              href={`/projects/${projects[0].slug}`}
              className="group relative md:col-span-2 lg:col-span-2 lg:row-span-2 rounded-3xl border border-border/50 hover:border-border bg-muted/20 overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              <div className="absolute inset-0">
                {projects[0].coverImage ? (
                  <Image 
                    src={projects[0].coverImage} 
                    alt={projects[0].title} 
                    fill 
                    className="object-cover" 
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-muted" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>
              
              <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-sm">
                      <Folder className="w-5 h-5 text-primary" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-xs font-medium">
                      {projects[0].type.toLowerCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {projects[0].title}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed line-clamp-2">
                    {getProjectDescription(projects[0].description)}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>View project</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* View All Projects Card */}
          <Link 
            href="/projects"
            className="group relative rounded-2xl border border-border/50 hover:border-border bg-gradient-to-br from-primary/5 to-muted/20 overflow-hidden transition-all duration-300 hover:shadow-lg flex items-center justify-center"
          >
            <div className="text-center p-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Folder className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">All Projects</h3>
                <p className="text-sm text-muted-foreground font-light">Browse my work</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                <span>View all</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Other Projects */}
          {projects.slice(1, 3).map((project, idx) => (
            <Link 
              key={project.id}
              href={`/projects/${project.slug}`}
              className={`group relative rounded-2xl border border-border/50 hover:border-border bg-muted/20 overflow-hidden transition-all duration-300 hover:shadow-lg ${
                idx === 0 ? 'lg:row-span-1' : ''
              }`}
            >
              <div className="relative h-full flex flex-col">
                <div className="relative aspect-video">
                  {project.coverImage ? (
                    <Image 
                      src={project.coverImage} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-muted" />
                  )}
                </div>
                <div className="flex-grow p-5 space-y-2">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {project.type.toLowerCase()}
                  </span>
                  <h4 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}

          {/* Blog Posts - Vertical Cards */}
          {posts.slice(0, 3).map((post, idx) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`group relative rounded-2xl border border-border/50 hover:border-border bg-muted/20 overflow-hidden transition-all duration-300 hover:shadow-lg ${
                idx === 0 ? 'lg:row-span-2' : ''
              }`}
            >
              <div className="relative h-full flex flex-col">
                <div className={`relative ${idx === 0 ? 'aspect-[4/3]' : 'aspect-video'}`}>
                  {post.coverImage ? (
                    <Image 
                      src={post.coverImage} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-muted" />
                  )}
                </div>
                <div className="flex-grow p-5 space-y-3">
                  <h4 className={`font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors ${
                    idx === 0 ? 'text-lg' : 'text-base'
                  }`}>
                    {post.title}
                  </h4>
                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {idx === 0 && post.excerpt && (
                    <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}

          {/* View All Blog Card */}
          <Link 
            href="/blog"
            className="group relative rounded-2xl border border-border/50 hover:border-border bg-gradient-to-br from-primary/5 to-muted/20 overflow-hidden transition-all duration-300 hover:shadow-lg flex items-center justify-center"
          >
            <div className="text-center p-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">All Posts</h3>
                <p className="text-sm text-muted-foreground font-light">Read my articles</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                <span>View all</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  )
}

export default HomeWork
