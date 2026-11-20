'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const educationData = [
  {
    title: 'Bachelor of Computer Engineering',
    institution: 'Naresuan University',
    period: '2021 — 2025',
    location: 'Phitsanulok, Thailand',
    logo: '/images/common/nu-logo.webp'
  },
  {
    title: 'Science-Math',
    institution: 'Fakkwan Wittayakom School',
    period: '2018 — 2021',
    location: 'Phayao, Thailand',
    logo: '/images/common/fw-logo.webp'
  }
]

const EducationSection = () => {
  return (
    <div>
      <ScrollReveal>
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Education
        </h2>
      </ScrollReveal>

      <StaggerContainer className="border-b border-border/60" staggerDelay={0.12}>
        {educationData.map((edu) => (
          <StaggerItem key={edu.institution}>
            <article className="grid gap-4 border-t border-border/60 py-8 md:grid-cols-[12rem_1fr] md:gap-10">
              <span className="font-mono text-[11px] tracking-wide text-muted-foreground md:pt-1.5">
                {edu.period}
              </span>
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
                  <h3 className="mb-1 text-lg font-semibold tracking-tight text-foreground">
                    {edu.title}
                  </h3>
                  <p className="mb-1 text-sm text-foreground/80">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground">{edu.location}</p>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}

export default EducationSection
