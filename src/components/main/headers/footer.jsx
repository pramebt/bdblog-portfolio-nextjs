import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, Instagram, Facebook, Linkedin, Mail, Code, Heart, Coffee, ExternalLink } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="relative z-10 bg-background/95 backdrop-blur-sm border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6 md:col-span-2">
            <Button variant="ghost" size="sm" asChild className="p-0 h-auto hover:bg-transparent justify-start">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Image 
                    src="/images/common/terminal-box-fill.svg" 
                    alt="BD Blog" 
                    width={20} 
                    height={20} 
                    className="dark:invert"
                  />
                </div>
                <span className="text-xl font-bold text-foreground">BD Blog</span>
              </Link>
            </Button>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Frontend Developer passionate about creating modern web experiences with React, Next.js, 
              and cutting-edge technologies. Sharing knowledge through projects and blog posts.
            </p>
            
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Explore</h3>
            <div className="flex flex-col space-y-3">
              <Button variant="ghost" size="sm" asChild className="justify-start h-auto p-0 text-muted-foreground">
                <Link href="/" className="flex items-center gap-2">
                  <span>Home</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start h-auto p-0 text-muted-foreground">
                <Link href="/blog" className="flex items-center gap-2">
                  <span>Blog Posts</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start h-auto p-0 text-muted-foreground">
                <Link href="/projects" className="flex items-center gap-2">
                  <span>Projects</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start h-auto p-0 text-muted-foreground">
                <Link href="/experiment" className="flex items-center gap-2">
                  <span>Experiment</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start h-auto p-0 text-muted-foreground">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Contact</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Connect</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">bdforwk@gmail.com</span>
              </div>
              <p className="text-sm text-muted-foreground">Available for freelance projects</p>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0 hover:bg-transparent">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0 hover:bg-transparent">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0 hover:bg-transparent">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                    <span className="sr-only">Facebook</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0 hover:bg-transparent">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <p>© {currentYear} BD Blog. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <Button variant="ghost" size="sm" asChild className="h-auto p-0 text-muted-foreground hover:text-foreground hover:bg-transparent">
                <Link href="/resume">Resume</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="h-auto p-0 text-muted-foreground hover:text-foreground hover:bg-transparent">
                <Link href="/sitemap">Sitemap</Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile "Made with" */}
          <div className="flex sm:hidden items-center justify-center space-x-1 text-sm text-muted-foreground mt-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>and</span>
            <Coffee className="w-4 h-4 text-amber-600" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer