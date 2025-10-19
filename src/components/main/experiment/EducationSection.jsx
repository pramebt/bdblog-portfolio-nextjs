import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  GraduationCap,
  BookOpen,
  MapPin,
  Calendar,
  School
} from 'lucide-react'

const EducationSection = () => {
  const educationData = [
    {
      title: 'Bachelor of Computer Science',
      institution: 'Chiang Mai University',
      period: '2018 - 2022',
      location: 'Chiang Mai, Thailand',
      icon: <GraduationCap className="h-6 w-6" />,
      iconColor: 'text-indigo-500',
      iconBg: 'bg-indigo-500/10',
      description: 'Focused on software engineering, algorithms, and data structures. Graduated with honors and completed several programming projects.',
      skills: ['Data Structures', 'Algorithms', 'Software Engineering', 'Database Design', 'Web Development', 'Machine Learning']
    },
    {
      title: 'High School Diploma',
      institution: 'Phayao Wittayakom School',
      period: '2016 - 2018',
      location: 'Phayao, Thailand',
      icon: <BookOpen className="h-6 w-6" />,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-500/10',
      description: 'Completed high school with focus on mathematics and science. Participated in programming competitions and developed interest in technology.',
      skills: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Programming', 'Science Fair']
    }
  ]

  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <School className="h-6 w-6 text-indigo-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
          Education
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {educationData.map((edu, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${edu.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <div className={edu.iconColor}>
                    {edu.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold text-foreground mb-1">
                    {edu.title}
                  </CardTitle>
                  <p className="text-base text-muted-foreground font-medium mb-2">
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {edu.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {edu.skills.map((skill, idx) => (
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

export default EducationSection
