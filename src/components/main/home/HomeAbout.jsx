'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CloudArrowDown, GithubLogo, LinkedinLogo, PaperPlaneTilt, FacebookLogo, InstagramLogo } from '@phosphor-icons/react/dist/ssr'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const socials = [
  { href: 'https://github.com/pramebt', label: 'GitHub', icon: GithubLogo },
  { href: 'https://www.facebook.com/bandit.prame/', label: 'Facebook', icon: FacebookLogo },
  { href: 'https://www.instagram.com/prame.bt/', label: 'Instagram', icon: InstagramLogo },
  { href: 'mailto:bdforwk@gmail.com', label: 'Gmail', icon: PaperPlaneTilt },
  { href: 'https://www.linkedin.com/in/bandit-kaewnoi-48b76335b/', label: 'LinkedIn', icon: LinkedinLogo },
]

const HomeAbout = () => {
  return (
    <section id="about" className="py-24 md:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="section-label">About</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground text-balance">
            A developer who cares about craft
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mb-14">
            Building meaningful digital experiences with clarity and care.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal delay={0.1} yOffset={24}>
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed text-[1.05rem]">
              <p>
                Hello! I&apos;m Bandit, a developer from Phayao, Thailand.
                My journey started with curiosity about how websites work —
                and quickly became a craft I love.
              </p>
              <p>
                I build modern, responsive applications with React and Next.js,
                and enjoy shaping the full stack from interface to database.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-6">
                <Link
                  href="/cv/BD_RESUME.pdf"
                  target="_blank"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <CloudArrowDown size={18} weight="duotone" />
                  Resume
                </Link>

                <StaggerContainer className="flex items-center gap-2" staggerDelay={0.06}>
                  {socials.map(({ href, label, icon: Icon }) => (
                    <StaggerItem key={label}>
                      <Link
                        href={href}
                        target={href.startsWith('mailto:') ? undefined : '_blank'}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/25 hover:bg-muted/50 transition-all duration-300"
                        aria-label={label}
                      >
                        <Icon size={18} weight="duotone" />
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.18} yOffset={28}>
            <div className="mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/50 bg-muted/30">
                <Image
                  src="/images/common/prame.webp"
                  alt="Bandit Kaewnoi"
                  fill
                  priority
                  quality={90}
                  className="object-cover"
                  sizes="(min-width: 1024px) 28vw, 90vw"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default HomeAbout
