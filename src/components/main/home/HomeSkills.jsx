import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Code2 } from 'lucide-react'

const HomeSkills = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
    'Python', 'PHP', 'MySQL', 'MongoDB', 'Prisma',
    'Tailwind CSS', 'Git', 'Docker', 'AWS', 'Vercel'
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
            <Code2 className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <Badge 
              key={index}
              variant="secondary" 
              className="px-4 py-2 text-base font-medium rounded-full bg-muted/30 text-foreground hover:bg-muted/50 transition-colors"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeSkills
