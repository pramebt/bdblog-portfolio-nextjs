'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { CaretDown } from '@phosphor-icons/react/dist/ssr'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const experienceData = [
  {
    period: 'Jun 2025 — Jul 2025',
    position: 'Frontend Developer',
    company: 'Freelance',
    location: 'Remote',
    logo: '/images/common/freelance.webp',
    description:
      'Freelance projects with React, React Native, and Next.js — ride-hailing demos, car rental platforms, lawyer landing pages, and backoffice systems.',
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
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

const HomeExperience = () => {
  const [expanded, setExpanded] = useState(new Set())

  const toggleExpanded = (index) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground mb-8">
              Experience
            </h3>
            <StaggerContainer className="space-y-0" staggerDelay={0.1}>
              {experienceData.map((exp, index) => {
                const isOpen = expanded.has(index)
                return (
                  <StaggerItem key={exp.company + exp.period}>
                    <article className="group relative border-t border-border/60 py-7 last:border-b">
                      <div className="flex gap-4">
                        <div className="relative mt-0.5 h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-background p-1.5">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={36}
                            height={36}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                            <h4 className="text-lg font-semibold tracking-tight text-foreground">
                              {exp.position}
                            </h4>
                            <span className="font-mono text-[11px] text-muted-foreground tracking-wide">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/80 mb-1">{exp.company}</p>
                          <p className="text-xs text-muted-foreground mb-3">{exp.location}</p>

                          <div
                            className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                              {exp.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-border/60 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleExpanded(index)}
                            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {isOpen ? 'Show less' : 'Show more'}
                            <CaretDown
                              size={12}
                              weight="bold"
                              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        </div>
                      </div>
                    </article>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground mb-8">
              Education
            </h3>
            <StaggerContainer className="space-y-0" staggerDelay={0.12}>
              {educationData.map((edu) => (
                <StaggerItem key={edu.institution}>
                  <article className="relative border-t border-border/60 py-7 last:border-b">
                    <div className="flex gap-4">
                      <div className="relative mt-0.5 h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-background p-1.5">
                        <Image
                          src={edu.logo}
                          alt={`${edu.institution} logo`}
                          width={36}
                          height={36}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                          <h4 className="text-lg font-semibold tracking-tight text-foreground">
                            {edu.degree}
                          </h4>
                          <span className="font-mono text-[11px] text-muted-foreground tracking-wide">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/80 mb-1">{edu.institution}</p>
                        <p className="text-xs text-muted-foreground">{edu.location}</p>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeExperience
