import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative z-10 bg-muted border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Button variant="ghost" size="sm" asChild className="p-0 h-auto hover:bg-transparent justify-start">
              <Link href="/" className="flex items-center space-x-3">
                <Image 
                  src="/images/common/terminal-box-fill.svg" 
                  alt="BD Blog" 
                  width={24} 
                  height={24} 
                />
                <span className="text-xl font-bold text-foreground">BD Blog</span>
              </Link>
            </Button>
            <p className="text-muted-foreground leading-relaxed">
              Personal blog and project showcase. Sharing knowledge and experiences in web development.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" size="sm" asChild className="justify-start h-auto p-0 text-muted-foreground hover:text-foreground">
                <Link href="/" >Home</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start h-auto p-0 text-muted-foreground hover:text-foreground">
                <Link href="/blog">Blog</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start h-auto p-0 text-muted-foreground hover:text-foreground">
                <Link href="/projects">Projects</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start h-auto p-0 text-muted-foreground hover:text-foreground">
                <Link href="/about">About</Link>
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>contact@bdblog.com</span>
              </div>
              <p className="text-muted-foreground">Follow me on social media</p>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <Twitter className="w-4 h-4" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <Github className="w-4 h-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <Linkedin className="w-4 h-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} BD Blog. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer