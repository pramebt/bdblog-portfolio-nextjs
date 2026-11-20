'use client'

import React from 'react'
import { GithubLogo, LinkedinLogo, InstagramLogo, FacebookLogo } from '@phosphor-icons/react/dist/ssr'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const socialLinks = [
  { icon: GithubLogo, label: 'GitHub', href: 'https://github.com/pramebt' },
  { icon: LinkedinLogo, label: 'LinkedIn', href: 'https://www.linkedin.com/in/bandit-kaewnoi-48b76335b/' },
  { icon: InstagramLogo, label: 'Instagram', href: 'https://www.instagram.com/prame.bt/' },
  { icon: FacebookLogo, label: 'Facebook', href: 'https://www.facebook.com/bandit.prame/' },
]

const ContactSocial = () => {
  return (
    <ScrollReveal>
      <p className="section-label">Elsewhere</p>
      <h3 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">Follow me</h3>
      <p className="mb-6 font-light leading-relaxed text-muted-foreground">
        Connect with me on social media for updates and insights.
      </p>
      <div className="flex flex-wrap gap-2">
        {socialLinks.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-foreground/25 hover:bg-muted/50 hover:text-foreground"
          >
            <Icon size={18} weight="duotone" />
            {label}
          </a>
        ))}
      </div>
    </ScrollReveal>
  )
}

export default ContactSocial
