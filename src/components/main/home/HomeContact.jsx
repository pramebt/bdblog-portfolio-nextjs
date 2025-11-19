'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PaperPlaneTilt, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
const HomeContact = () => {
  return (
    <section className="py-12 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
          <PaperPlaneTilt size={36} weight="duotone" className="text-muted-foreground/60" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
          Let's Work Together
        </h2>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
        <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
            <Link href="/contact" className="flex items-center space-x-2">
              <PaperPlaneTilt size={22} weight="duotone" className="mr-2" />
              Start a Project
            </Link>
          </HoverBorderGradient>
          
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="lg"
              className="rounded-full px-6 py-4 text-base font-medium hover:bg-muted/50"
              asChild
            >
              <Link href="https://github.com" target="_blank">
                <GithubLogo size={24} weight="duotone" />
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg"
              className="rounded-full px-6 py-4 text-base font-medium hover:bg-muted/50"
              asChild
            >
              <Link href="https://linkedin.com" target="_blank">
                <LinkedinLogo size={24} weight="duotone" />
              </Link>
            </Button>
          </div>
        </div>

        
      </div>
    </section>
  )
}

export default HomeContact
