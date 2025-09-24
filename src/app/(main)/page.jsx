import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, FolderOpen, ArrowRight } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Welcome to BD Blog
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A personal blog and project showcase where I share my thoughts, experiences, and development projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/blog">
                <BookOpen className="w-4 h-4 mr-2" />
                Read Blog
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                <FolderOpen className="w-4 h-4 mr-2" />
                View Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Find Here</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>
                  Technical articles, tutorials, and personal thoughts about web development and technology.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog">
                    Read Posts
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FolderOpen className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Projects</CardTitle>
                <CardDescription>
                  A showcase of my development projects, including web applications and open-source contributions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/projects">
                    View Projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mb-2">
                  <span className="text-primary-foreground font-bold">BD</span>
                </div>
                <CardTitle>About Me</CardTitle>
                <CardDescription>
                  Learn more about my journey as a developer and my passion for creating meaningful digital experiences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/about">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admin Access */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
          <p className="text-muted-foreground mb-6">
            Are you the site administrator? Access the admin dashboard to manage content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/auth/signin">
                Go to Admin Dashboard
              </Link>
            </Button>
            
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage