'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const experienceData = [
  {
    title: 'Frontend Developer',
    company: 'Freelance',
    period: 'Jun 2025 — Jul 2025',
    location: 'Remote',
    logo: '/images/common/freelance.webp',
    description: 'Freelance Project using React, React-Native, and Nextjs. Includes creating demo app such as ride-hailing. Also developed web platforms for car rental, lawyer landing page and backoffice systems for mentioned apps and websites.',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    title: 'Web Developer (Intern)',
    company: 'Forth Smart Service Public Co., Ltd.',
    period: 'May 2024 — Jun 2024',
    location: 'Bangkok, Thailand',
    logo: '/images/common/forth-logo.webp',
    description: 'Designed the database system and customized both the front-end and back-end of the website using HTML, CSS, JavaScript and PHP. Ensured that data added by the admin was dynamically displayed on the user interface for seamless user access. Modified and improved the system based on requests from other departments, including fetching data to display on the UI and adding new menus and features to the website.',
    skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'jQuery']
  }
]

const ExperienceSection = () => {
  return (
    <div>
      <ScrollReveal>
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Experience
        </h2>
      </ScrollReveal>

      <StaggerContainer className="border-b border-border/60" staggerDelay={0.1}>
        {experienceData.map((exp) => (
          <StaggerItem key={exp.company + exp.period}>
            <article className="grid gap-4 border-t border-border/60 py-8 md:grid-cols-[12rem_1fr] md:gap-10">
              <span className="font-mono text-[11px] tracking-wide text-muted-foreground md:pt-1.5">
                {exp.period}
              </span>
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
                  <h3 className="mb-1 text-lg font-semibold tracking-tight text-foreground">
                    {exp.title}
                  </h3>
                  <p className="mb-1 text-sm text-foreground/80">{exp.company}</p>
                  <p className="mb-4 text-xs text-muted-foreground">{exp.location}</p>
                  <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border/60 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}

export default ExperienceSection
