'use client'

import React from 'react'
import { PaperPlaneTilt, Phone, MapPin } from '@phosphor-icons/react/dist/ssr'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const contactItems = [
  {
    icon: PaperPlaneTilt,
    title: 'Email',
    value: 'bdforwk@gmail.com',
    href: 'mailto:bdforwk@gmail.com',
    note: "I'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+66 (0) 99 459 4970',
    href: 'tel:+66994594970',
    note: 'Available Mon–Fri, 9AM–6PM',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Phayao, Thailand',
    note: 'Open to remote work',
  },
]

const ContactInfo = () => {
  return (
    <div>
      <ScrollReveal>
        <p className="section-label">Direct</p>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Contact information
        </h2>
      </ScrollReveal>

      <StaggerContainer className="border-b border-border/60" staggerDelay={0.08}>
        {contactItems.map(({ icon: Icon, title, value, href, note }) => {
          const ValueTag = href ? 'a' : 'p'
          return (
            <StaggerItem key={title}>
              <div className="flex items-start gap-4 border-t border-border/60 py-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background">
                  <Icon size={20} weight="duotone" className="text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {title}
                  </p>
                  <ValueTag
                    {...(href ? { href } : {})}
                    className="block font-medium text-foreground transition-opacity hover:opacity-80"
                  >
                    {value}
                  </ValueTag>
                  <p className="mt-1 text-xs font-light text-muted-foreground">{note}</p>
                </div>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </div>
  )
}

export default ContactInfo
