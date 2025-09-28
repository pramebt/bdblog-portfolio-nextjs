import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase } from 'lucide-react'

const HomeExperience = () => {
  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Developing modern web applications using React, Next.js, and Node.js'
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2021 - 2022',
      description: 'Creating responsive and interactive user interfaces'
    },
    {
      title: 'Junior Developer',
      company: 'Startup',
      period: '2020 - 2021',
      description: 'Learning and contributing to various web development projects'
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
            <Briefcase className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            My professional journey in software development
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-border hover:bg-card/80 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-muted-foreground font-light">
                      {exp.company}
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit mt-2 md:mt-0 rounded-full">
                    {exp.period}
                  </Badge>
                </div>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {exp.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeExperience
