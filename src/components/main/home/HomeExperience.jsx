'use client'

import React from 'react'
import Image from 'next/image'
import { MapPin } from '@phosphor-icons/react/dist/ssr'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const experienceData = [
  {
    period: 'Mar 2026 — Present',
    position: 'Software Engineer',
    company: 'D Solution Cloud Co., Ltd.',
    logo: '/images/common/d-solution-cloud.webp',
    description: 'Software engineering with Angular and PHP.',
    technologies: ['Angular', 'PHP'],
  },
  {
    period: 'Jun 2025 — Jul 2025',
    position: 'Frontend Developer',
    company: 'Freelance',
    location: 'Remote',
    logo: '/images/common/freelance.webp',
    description:
      'Freelance projects with React, React Native, and Next.js — ride-hailing demos, car rental platforms, lawyer landing pages, and backoffice systems.',
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    period: 'May 2024 — Jun 2024',
    position: 'Web Developer (Intern)',
    company: 'Forth Smart Service Public Co., Ltd.',
    location: 'Bangkok, Thailand',
    logo: '/images/common/forth-logo.webp',
    description:
      'Designed database flows and customized front-end and back-end with HTML, CSS, JavaScript, and PHP. Built admin-driven UI updates and features for other departments.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'jQuery'],
  },
]

const educationData = [
  {
    period: '2021 — 2025',
    degree: 'Bachelor of Computer Engineering',
    institution: 'Naresuan University',
    location: 'Phitsanulok, Thailand',
    logo: '/images/common/nu-logo.webp',
  },
  {
    period: '2018 — 2021',
    degree: 'Science-Math',
    institution: 'Fakkwan Wittayakom School',
    location: 'Phayao, Thailand',
    logo: '/images/common/fw-logo.webp',
  },
]

const Logo = ({ src, alt }) => (
  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-background p-1.5">
    <Image src={src} alt={alt} width={40} height={40} className="h-full w-full object-contain" />
  </div>
)

const HomeExperience = () => {
  return (
    <section className="relative py-24 md:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="section-label">Journey</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground">
            Experience & education
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mb-14">
            Places I&apos;ve learned, built, and grown.
          </p>
        </ScrollReveal>

        <div className="mb-6">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Experience
          </h3>
        </div>

        <StaggerContainer className="space-y-4" staggerDelay={0.08}>
          {experienceData.map((item) => (
            <StaggerItem key={item.company + item.period}>
              <article className="soft-card p-5 md:p-6">
                <div className="flex gap-4">
                  <Logo src={item.logo} alt={`${item.company} logo`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div>
                        <h4 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                          {item.position}
                        </h4>
                        <p className="mt-0.5 text-sm text-foreground/80">{item.company}</p>
                      </div>
                      <p className="shrink-0 font-mono text-[11px] tracking-wide text-muted-foreground sm:pt-1.5">
                        {item.period}
                      </p>
                    </div>
                    {item.location && (
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={13} weight="fill" className="text-foreground/35" />
                        {item.location}
                      </p>
                    )}
                    <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-[11px] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mb-6 mt-14">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Education
          </h3>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2" staggerDelay={0.08}>
          {educationData.map((item) => (
            <StaggerItem key={item.institution} className="h-full">
              <article className="soft-card flex h-full gap-4 p-5 md:p-6">
                <Logo src={item.logo} alt={`${item.institution} logo`} />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
                    {item.period}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                    {item.degree}
                  </h4>
                  <p className="mt-0.5 text-sm text-foreground/80">{item.institution}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin size={13} weight="fill" className="text-foreground/35" />
                    {item.location}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default HomeExperience
