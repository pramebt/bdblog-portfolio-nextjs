import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { 
  Code2,
  Monitor,
  Server,
  Palette,
  Wrench
} from 'lucide-react'

const SkillsSection = () => {
  const skillsData = [
    {
      category: 'Frontend',
      icon: <Monitor className="h-6 w-6" />,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/10',
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS']
    },
    {
      category: 'Backend',
      icon: <Server className="h-6 w-6" />,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-500/10',
      skills: ['Node.js', 'Python', 'PHP', 'Prisma', 'PostgreSQL', 'MySQL', 'MongoDB']
    },
    {
      category: 'Design',
      icon: <Palette className="h-6 w-6" />,
      iconColor: 'text-pink-500',
      iconBg: 'bg-pink-500/10',
      skills: ['Figma']
    },
    {
      category: 'Tools',
      icon: <Wrench className="h-6 w-6" />,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-500/10',
      skills: ['Git', 'GitHub', 'Docker', 'AWS', 'Vercel']
    }
  ]

  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <Code2 className="h-6 w-6 text-blue-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
          Skills & Technologies
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillsData.map((skillCategory, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${skillCategory.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <div className={skillCategory.iconColor}>
                    {skillCategory.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {skillCategory.category}
                </h3>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {skillCategory.skills.map((skill, idx) => (
                  <Badge 
                    key={idx}
                    variant="secondary"
                    className="text-xs bg-muted/50 hover:bg-muted mr-2 mb-2"
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

export default SkillsSection
