import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Building2, 
  Code2,
  MapPin,
  Calendar,
  Briefcase
} from 'lucide-react'

const ExperienceSection = () => {
  const experienceData = [
    {
      title: 'Frontend Developer',
      company: 'Freelance',
      period: 'June 2025 - July 2025',
      location: 'Remote',
      icon: <Building2 className="h-6 w-6" />,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/10',
      description: 'Freelance Project using React, React-Native, and Nextjs. Includes creating demo app such as ride-hailing. Also developed web platforms for car rental, lawyer landing page and backoffice systems for mentioned apps and websites.',
      skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS']
    },
    {
      title: 'Web Developer (Intern)',
      company: 'Forth Smart Service Public Co., Ltd.',
      period: 'May 2024 - June 2024',
      location: 'Bangkok, Thailand',
      icon: <Code2 className="h-6 w-6" />,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-500/10',
      description: 'Designed the database system and customized both the front-end and back-end of the website using HTML, CSS, JavaScript and PHP. Ensured that data added by the admin was dynamically displayed on the user interface for seamless user access. Modified and improved the system based on requests from other departments, including fetching data to display on the UI and adding new menus and features to the website.',
      skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'jQuery']
    }
  ]

  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <Briefcase className="h-6 w-6 text-blue-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
          Professional Experience
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experienceData.map((exp, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${exp.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <div className={exp.iconColor}>
                    {exp.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold text-foreground mb-1">
                    {exp.title}
                  </CardTitle>
                  <p className="text-base text-muted-foreground font-medium mb-2">
                    {exp.company}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, idx) => (
                  <Badge 
                    key={idx}
                    variant="secondary"
                    className="text-xs bg-muted/50 hover:bg-muted"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ExperienceSection
