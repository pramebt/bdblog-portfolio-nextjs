import React from 'react'
import Link from 'next/link'
import { BookOpen, FolderOpen, ArrowRight } from 'lucide-react'

const HomeWork = () => {
  return (
    <section className="py-20 px-4 border-t border-border/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Explore My Work
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Discover my thoughts through articles and see my projects in action
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-foreground rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-background" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Blog</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Technical articles and insights about web development, programming, and technology trends.
              </p>
              <Link 
                href="/blog" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Read articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-foreground rounded-2xl flex items-center justify-center">
              <FolderOpen className="w-8 h-8 text-background" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Projects</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A collection of web applications, tools, and experiments I've built using modern technologies.
              </p>
              <Link 
                href="/projects" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                View work
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeWork
