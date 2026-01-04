'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin,
  CaretDown,
  Calendar,
  Briefcase,
  Sparkle,
  Code,
  GraduationCap
} from '@phosphor-icons/react/dist/ssr'

const HomeExperience = () => {
  const [expandedExpItems, setExpandedExpItems] = useState(new Set())
  const [expandedEduItems, setExpandedEduItems] = useState(new Set())

  const toggleExpanded = (index, type) => {
    const setter = type === 'experience' ? setExpandedExpItems : setExpandedEduItems
    setter(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  // Experience data
  const experienceData = [
    {
      period: 'June 2025 - July 2025',
      position: 'Frontend Developer',
      company: 'Freelance',
      location: 'Remote',
      logo: '/images/common/freelance.webp',
      description: 'Freelance Project using React, React-Native, and Nextjs. Includes creating demo app such as ride-hailing. Also developed web platforms for car rental,lawyer landing page and backoffice systems for mentioned apps and websites.',
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS']
    },
    {
      period: 'May 2024 - June 2024',
      position: 'Web Developer (Intern)',
      company: 'Forth Smart Service Public Co., Ltd.',
      location: 'Bangkok, Thailand',
      logo: '/images/common/forth-logo.webp',
      description: 'Designed the database system and customized both the front-end and back-end of the website using HTML, CSS, JavaScript and PHP. Ensured that data added by the admin was dynamically displayed on the user interface for seamless user access. Modified and improved the system based on requests from other departments, including fetching data to display on the UI and adding new menus and features to the website.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'jQuery']
    },
  ]

  // Education data
  const educationData = [
    {
      period: '2021 - 2025',
      degree: 'Bachelor of Computer Engineering',
      institution: 'Naresuan University',
      location: 'Phitsanulok, Thailand',
      logo: '/images/common/nu-logo.webp',
    },
    {
      period: '2018 - 2021',
      degree: 'Science-Math',
      institution: 'Fakkwan Wittayakom School',
      location: 'Phayao, Thailand',
      logo: '/images/common/fw-logo.webp',
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden bg-background">
      {/* Background decoration - subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-transparent to-muted/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-muted/30 border border-border/50">
            <Briefcase size={32} weight="light" className="text-muted-foreground/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Experience & Education
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            My professional journey and educational background
          </p>
        </div>

        {/* Two Column Layout - Experience and Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Experience Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-muted/30">
                <Briefcase size={20} weight="light" className="text-muted-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                Experience
              </h3>
            </div>
            <div className="space-y-6">
              {experienceData.map((exp, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border/80 hover:bg-card/70 transition-all duration-200 ease-out flex flex-col"
            >
              {/* Content */}
              <div className="relative p-6 md:p-8 flex flex-col flex-1">
                {/* Header with Logo and Info */}
                <div className="flex items-start gap-4 md:gap-6 mb-6">
                  {/* Logo Container */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center p-2.5 md:p-3 transition-all duration-200">
                      <Image 
                        src={exp.logo} 
                        alt={`${exp.company} Logo`}
                        width={40}
                        height={40}
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Title and Company Info */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-1.5 transition-colors duration-200 line-clamp-2">
                        {exp.position}
                      </h3>
                      <p className="text-sm md:text-base font-semibold text-foreground/90 mb-2 line-clamp-1">
                        {exp.company}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} weight="light" />
                        <span className="font-medium">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} weight="light" />
                        <span className="line-clamp-1">{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Description */}
                <div className={`overflow-hidden transition-all duration-300 ease-out flex-1 ${
                  expandedExpItems.has(index) ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-4 md:pt-6 border-t border-border/50">
                    <p className="text-muted-foreground leading-relaxed mb-5 md:mb-6 text-sm md:text-base">
                      {exp.description}
                    </p>
                    
                    {/* Technologies */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div>
                        <p className="text-xs md:text-sm font-semibold text-foreground mb-2.5 md:mb-3 flex items-center gap-2">
                          <Code size={14} weight="light" />
                          Technologies Used
                        </p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <Badge 
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-muted/50 hover:bg-muted/70 transition-colors duration-200"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expand/Collapse Button - Always at bottom */}
                <div className="mt-auto pt-4">
                  <Button
                    onClick={() => toggleExpanded(index, 'experience')}
                    variant="ghost"
                    className="w-full flex items-center justify-center gap-2"
                    size="sm"
                  >
                    <span className="text-xs md:text-sm font-medium">
                      {expandedExpItems.has(index) ? 'Show Less' : 'Show More'}
                    </span>
                    <CaretDown 
                      size={16}
                      weight="bold"
                      className={`transition-transform duration-300 ease-out ${
                        expandedExpItems.has(index) ? 'rotate-180' : 'rotate-0'
                      }`} 
                    />
                  </Button>
                </div>
              </div>
            </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-muted/30">
                <GraduationCap size={20} weight="light" className="text-muted-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                Education
              </h3>
            </div>
            <div className="space-y-6">
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border/80 hover:bg-card/70 transition-all duration-200 ease-out flex flex-col"
                >
                  {/* Content */}
                  <div className="relative p-6 md:p-8 flex flex-col flex-1">
                    {/* Header with Logo and Info */}
                    <div className="flex items-start gap-4 md:gap-6 mb-6">
                      {/* Logo Container */}
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center p-2.5 md:p-3 transition-all duration-200">
                          <Image 
                            src={edu.logo} 
                            alt={`${edu.institution} Logo`}
                            width={40}
                            height={40}
                            className="object-contain rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Title and Institution Info */}
                      <div className="flex-1 min-w-0">
                        <div className="mb-3">
                          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1.5 transition-colors duration-200 line-clamp-2">
                            {edu.degree}
                          </h3>
                          <p className="text-sm md:text-base font-semibold text-foreground/90 mb-2 line-clamp-1">
                            {edu.institution}
                          </p>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} weight="light" />
                            <span className="font-medium">{edu.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} weight="light" />
                            <span className="line-clamp-1">{edu.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 flex items-center justify-center gap-2 text-muted-foreground">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-border to-transparent" />
          <Sparkle size={16} weight="light" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  )
}

export default HomeExperience
