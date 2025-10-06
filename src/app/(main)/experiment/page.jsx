import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  Building2, 
  Rocket, 
  Code2,
  GraduationCap,
  Award,
  BookOpen,
  MapPin,
  Calendar,
  Briefcase,
  School
} from 'lucide-react'

const ExperimentPage = () => {
  // Experience data
  const experienceData = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      location: 'Bangkok, Thailand',
      icon: <Building2 className="h-6 w-6" />,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/10',
      description: 'Led development of enterprise web applications serving 50K+ users. Architected RESTful APIs and optimized performance.',
      skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS']
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2021 - 2022',
      location: 'Remote',
      icon: <Code2 className="h-6 w-6" />,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-500/10',
      description: 'Created responsive web applications for various clients. Collaborated with designers to implement pixel-perfect UIs.',
      skills: ['React', 'JavaScript', 'Tailwind CSS', 'SASS', 'Redux', 'Figma']
    },
    {
      title: 'Junior Developer',
      company: 'Startup',
      period: '2020 - 2021',
      location: 'Bangkok, Thailand',
      icon: <Rocket className="h-6 w-6" />,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-500/10',
      description: 'Developed new features and contributed to agile development processes. Improved code test coverage significantly.',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB']
    }
  ]

  // Education data
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
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 text-foreground">
            Experience & Education
          </h1>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            My professional journey and educational background
          </p>
        </div>

        {/* Experience Section */}
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

        <Separator className="my-16" />

        {/* Education Section */}
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
      </div>
    </div>
  )
}

export default ExperimentPage