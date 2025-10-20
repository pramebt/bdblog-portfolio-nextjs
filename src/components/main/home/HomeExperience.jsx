'use client'

import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Timeline } from '@/components/ui/timeline'
import { 
  Building2, 
  Rocket, 
  Code2,
  MapPin
} from 'lucide-react'

const HomeExperience = () => {
  // Experience data
  const experienceData = [
    {
      title: 'June 2025 - July 2025',
      icon: <Building2 className="h-5 w-5" />,
      iconColor: 'text-blue-500',
      iconBg: 'bg-background/95 backdrop-blur-sm',
      content: (
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-border transition-all duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
                Frontend Developer
              </h3>
              <p className="text-base md:text-lg text-muted-foreground font-medium mb-2">
                Freelance
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4" />
                <span>Remote</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
          Freelance Project using React, React-Native, and Nextjs. Includes creating demo app such as ride-hailing. Also developed web platforms for car rental,lawyer landing page and backoffice systems for mentioned apps and websites.
          </p>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'].map((tech, idx) => (
              <Badge 
                key={idx}
                variant="secondary"
                className="text-xs bg-muted/50 hover:bg-muted"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'May 2024 - June 2024',
      icon: <Code2 className="h-5 w-5" />,
      iconColor: 'text-purple-500',
      iconBg: 'bg-white',
      logo: {
        src: '/images/common/forth-logo.png',
        alt: 'Forth Smart Service Logo',
        width: 28,
        height: 28
      },
      content: (
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-border transition-all duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-2">
              <Image 
                src="/images/common/forth-logo.png" 
                alt="Forth Smart Service Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
              Web Developer (Intern)
              </h3>
              <p className="text-base md:text-lg text-muted-foreground font-medium mb-2">
              Forth Smart Service Public Co., Ltd.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4" />
                <span>Bangkok, Thailand</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
          Designed the database system and customized both the front-end and back-end of the website using HTML, CSS, JavaScript and PHP. Ensured that data added by the admin was dynamically displayed on the user interface for seamless user access. Modified and improved the system based on requests from other departments, including fetching data to display on the UI and adding new menus and features to the website.
          </p>
          <div className="flex flex-wrap gap-2">
            {['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'jQuery'].map((tech, idx) => (
              <Badge 
                key={idx}
                variant="secondary"
                className="text-xs bg-muted/50 hover:bg-muted"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )
    },
    
  ]

  // Use only experience data for now
  const timelineData = experienceData

  return (
    <div className="w-full">
      <Timeline data={timelineData} />
    </div>
  )
}

export default HomeExperience
