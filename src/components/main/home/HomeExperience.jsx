'use client'

import React from 'react'
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
      title: '2022 - Present',
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
                Full Stack Developer
              </h3>
              <p className="text-base md:text-lg text-muted-foreground font-medium mb-2">
                Tech Company
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4" />
                <span>Bangkok, Thailand</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Led development of enterprise web applications serving 50K+ users. Architected RESTful APIs and optimized performance.
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
      title: '2021 - 2022',
      icon: <Code2 className="h-5 w-5" />,
      iconColor: 'text-purple-500',
      iconBg: 'bg-background/95 backdrop-blur-sm',
      content: (
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-border transition-all duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <Code2 className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
                Frontend Developer
              </h3>
              <p className="text-base md:text-lg text-muted-foreground font-medium mb-2">
                Digital Agency
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4" />
                <span>Remote</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Created responsive web applications for various clients. Collaborated with designers to implement pixel-perfect UIs.
          </p>
          <div className="flex flex-wrap gap-2">
            {['React', 'JavaScript', 'Tailwind CSS', 'SASS', 'Redux', 'Figma'].map((tech, idx) => (
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
      title: '2020 - 2021',
      icon: <Rocket className="h-5 w-5" />,
      iconColor: 'text-green-500',
      iconBg: 'bg-background/95 backdrop-blur-sm',
      content: (
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-border transition-all duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Rocket className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
                Junior Developer
              </h3>
              <p className="text-base md:text-lg text-muted-foreground font-medium mb-2">
                Startup
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4" />
                <span>Bangkok, Thailand</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Developed new features and contributed to agile development processes. Improved code test coverage significantly.
          </p>
          <div className="flex flex-wrap gap-2">
            {['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'].map((tech, idx) => (
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
    }
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
