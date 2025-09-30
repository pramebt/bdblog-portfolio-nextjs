import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, Github, Linkedin } from 'lucide-react'

const HomeContact = () => {
  return (
    <section className="py-20 px-4 border-t border-border/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
          <Mail className="h-8 w-8 text-muted-foreground/60" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
          Let's Connect
        </h2>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Always excited to collaborate on interesting projects or just have a chat about technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            asChild 
            size="lg" 
            className="px-8 py-4 text-lg font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            <Link href="/contact">
              <Mail className="mr-2 h-5 w-5" />
              Get in Touch
            </Link>
          </Button>
          
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="lg"
              className="rounded-full px-6 py-4 text-base font-medium hover:bg-muted/50"
              asChild
            >
              <Link href="https://github.com" target="_blank">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg"
              className="rounded-full px-6 py-4 text-base font-medium hover:bg-muted/50"
              asChild
            >
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        
      </div>
    </section>
  )
}

export default HomeContact
