import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, FolderOpen, ArrowRight } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 text-foreground">
            BD Blog
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Thoughts, experiences, and projects from a developer's journey.
          </p>
          <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            ความคิด ประสบการณ์ และโปรเจกต์จากการเดินทางของนักพัฒนา
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="px-8 py-4 text-lg font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              <Link href="/blog">
                Read Blog
              </Link>
            </Button>
            <Button 
              asChild 
              variant="ghost" 
              size="lg"
              className="px-8 py-4 text-lg font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <Link href="/projects">
                View Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            
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

            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-foreground rounded-2xl flex items-center justify-center">
                <span className="text-background font-bold text-xl">BD</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">About</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Learn about my background, experience, and passion for creating digital solutions.
                </p>
                <Link 
                  href="/about" 
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Get to know me
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Admin Access */}
      <section className="py-20 px-4 border-t border-border/40">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Admin</h2>
            <p className="text-xl text-muted-foreground">
              Content management dashboard for site administrators.
            </p>
          </div>
          
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-medium rounded-full border-2 hover:bg-foreground hover:text-background transition-colors"
          >
            <Link href="/auth/signin">
              Sign in to Admin
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default HomePage