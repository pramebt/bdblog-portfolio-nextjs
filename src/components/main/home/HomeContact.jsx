'use client'

import React from 'react'
import Link from 'next/link'
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const HomeContact = () => {
  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="section-label text-center">Contact</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5 text-foreground text-balance">
            Let&apos;s build something calm and useful
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Have a project in mind, or just want to say hello? I&apos;d love to hear from you.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <PaperPlaneTilt size={18} weight="duotone" />
              Start a project
              <ArrowRight size={14} weight="bold" />
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/pramebt"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/25 transition-all duration-300"
                aria-label="GitHub"
              >
                <GithubLogo size={20} weight="duotone" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/bandit-kaewnoi-48b76335b/"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/25 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={20} weight="duotone" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default HomeContact
