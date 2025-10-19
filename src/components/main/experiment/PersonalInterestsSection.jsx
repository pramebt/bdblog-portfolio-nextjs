import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Coffee,
  Zap,
  Target,
  Users,
  GraduationCap
} from 'lucide-react'

const PersonalInterestsSection = () => {
  const personalData = [
    {
      title: 'Problem Solving',
      icon: <Coffee className="h-6 w-6" />,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-500/10',
      description: 'Finding elegant solutions to complex challenges through creative thinking and systematic approach.'
    },
    {
      title: 'Innovation',
      icon: <Zap className="h-6 w-6" />,
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-500/10',
      description: 'Exploring new technologies and creative approaches to build better user experiences.'
    },
    {
      title: 'Learning',
      icon: <GraduationCap className="h-6 w-6" />,
      iconColor: 'text-indigo-500',
      iconBg: 'bg-indigo-500/10',
      description: 'Continuously growing and sharing knowledge with the developer community.'
    },
    {
      title: 'Quality Focus',
      icon: <Target className="h-6 w-6" />,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-500/10',
      description: 'Writing clean, maintainable code that stands the test of time and scale.'
    },
    {
      title: 'Collaboration',
      icon: <Users className="h-6 w-6" />,
      iconColor: 'text-teal-500',
      iconBg: 'bg-teal-500/10',
      description: 'Working with teams to deliver exceptional products and mentor fellow developers.'
    }
  ]

  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
          <Coffee className="h-6 w-6 text-pink-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
          What Drives Me
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personalData.map((interest, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${interest.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <div className={interest.iconColor}>
                    {interest.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold text-foreground mb-2">
                    {interest.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground leading-relaxed">
                {interest.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PersonalInterestsSection
