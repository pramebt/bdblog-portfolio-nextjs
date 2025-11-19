'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CloudArrowDown, GithubLogo, LinkedinLogo, PaperPlaneTilt, FacebookLogo, InstagramLogo } from '@phosphor-icons/react'

const HomeAbout = () => {

  return (
    <section className="py-12 px-4 border-border/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-left mb-8">
          
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
            A passionate developer with a love for creating meaningful digital experiences
          </p>
        </div>

        <div className="space-y-12">
          {/* Story with Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Text Content */}
            <div className="flex items-start">
              <div className="space-y-8 w-full">
                <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
                  <p>
                    Hello! I'm Bandit, a passionate developer from Phayao, Thailand. 
                    My journey in web development started with curiosity about how websites work, 
                    and it quickly became my passion.
                  </p>
                  <p>
                    I specialize in creating modern, responsive web applications using 
                    cutting-edge technologies. From frontend frameworks like React and Next.js 
                    to backend solutions with Node.js and databases, I enjoy the full spectrum 
                    of web development.
                  </p>
                </div>

                {/* CV Download Button */}
                <div className='flex justify-center md:justify-start'>
                  <Link 
                    href="/cv/resume.pdf" 
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity font-medium"
                  >
                    <CloudArrowDown size={20} weight="duotone" />
                    Download CV
                  </Link>
                </div>

                {/* Social Links */}
                <div className="space-y-3 justify-center items-center gap-3">
                  <p className="flex justify-center md:justify-start text-sm text-muted-foreground font-medium ml-0 md:ml-2">Connect with me</p>
                  <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                    <Link 
                      href="https://github.com/yourusername" 
                      target="_blank"
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-foreground/20 transition-all group"
                      aria-label="GitHub"
                    >
                      <GithubLogo size={22} weight="duotone" className="group-hover:scale-110 transition-transform" />
                    </Link>
                    <Link 
                      href="https://facebook.com/yourusername" 
                      target="_blank"
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-foreground/20 transition-all group"
                      aria-label="Facebook"
                    >
                      <FacebookLogo size={22} weight="duotone" className="group-hover:scale-110 transition-transform" />
                    </Link>
                    <Link 
                      href="https://instagram.com/yourusername" 
                      target="_blank"
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-foreground/20 transition-all group"
                      aria-label="Instagram"
                    >
                      <InstagramLogo size={22} weight="duotone" className="group-hover:scale-110 transition-transform" />
                    </Link>
                    <Link 
                      href="mailto:your.email@gmail.com"
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-foreground/20 transition-all group"
                      aria-label="Gmail"
                    >
                      <PaperPlaneTilt size={22} weight="duotone" className="group-hover:scale-110 transition-transform" />
                    </Link>
                    <Link 
                      href="https://linkedin.com/in/yourusername" 
                      target="_blank"
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-foreground/20 transition-all group"
                      aria-label="LinkedIn"
                    >
                      <LinkedinLogo size={22} weight="duotone" className="group-hover:scale-110 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          {/* Profile Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl border border-border/30 overflow-hidden relative">
              <Image
                src="/images/common/prame.webp"
                alt="Profile image"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
          </div>

          

        </div>
      </div>
    </section>
  )
}

export default HomeAbout
