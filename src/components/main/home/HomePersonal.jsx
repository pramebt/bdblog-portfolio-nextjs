'use client'

import React from 'react'
import { Coffee, Lightning, GraduationCap, Target, Users } from '@phosphor-icons/react/dist/ssr'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const passions = [
  {
    icon: Coffee,
    title: 'Problem Solving',
    description: 'Finding elegant solutions to complex challenges through creative, systematic thinking.',
  },
  {
    icon: Lightning,
    title: 'Innovation',
    description: 'Exploring new technologies and approaches that make experiences feel effortless.',
  },
  {
    icon: GraduationCap,
    title: 'Learning',
    description: 'Continuously growing and sharing knowledge with the developer community.',
  },
  {
    icon: Target,
    title: 'Quality Focus',
    description: 'Writing clean, maintainable code that stands the test of time and scale.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working with teams to ship exceptional products and mentor fellow developers.',
  },
]

const HomePersonal = () => {
  return (
    <section className="py-24 md:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="section-label">Values</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground">
            What drives me
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mb-12">
            Beyond code — the principles that shape how I work.
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          staggerDelay={0.08}
        >
          {passions.map((passion) => {
            const Icon = passion.icon
            return (
              <StaggerItem key={passion.title} className="h-full">
                <div className="soft-card h-full p-6 md:p-7">
                  <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground">
                    <Icon size={16} weight="light" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2">
                    {passion.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {passion.description}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default HomePersonal
