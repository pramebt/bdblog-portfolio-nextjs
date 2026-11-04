'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GithubLogo, InstagramLogo, FacebookLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-border/50 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-foreground/5 border border-border/60 flex items-center justify-center">
                <Image
                  src="/images/common/terminal-box-fill.svg"
                  alt="BD Folio"
                  width={16}
                  height={16}
                  className="dark:invert"
                />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                BD Folio
              </span>
            </Link>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Frontend developer crafting modern web experiences with React & Next.js.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              { href: '/', label: 'Home' },
              { href: '/blog', label: 'Blog' },
              { href: '/projects', label: 'Projects' },
              { href: '/experiment', label: 'Experiment' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-mono text-muted-foreground">
            © {currentYear} Bandit Kaewnoi
          </p>
          <div className="flex items-center gap-1">
            {[
              { href: 'https://github.com/pramebt', icon: GithubLogo, label: 'GitHub' },
              { href: 'https://www.instagram.com/prame.bt/', icon: InstagramLogo, label: 'Instagram' },
              { href: 'https://www.facebook.com/bandit.prame/', icon: FacebookLogo, label: 'Facebook' },
              { href: 'https://www.linkedin.com/in/bandit-kaewnoi-48b76335b/', icon: LinkedinLogo, label: 'LinkedIn' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
                aria-label={label}
              >
                <Icon size={18} weight="duotone" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
