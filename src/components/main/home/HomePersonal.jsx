import React from 'react'
import { Heart, Coffee, Zap, GraduationCap, Target, Lightbulb, Users, BookOpen } from 'lucide-react'

const HomePersonal = () => {
  const passions = [
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Problem Solving",
      description: "Finding elegant solutions to complex challenges through creative thinking and systematic approach."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Innovation",
      description: "Exploring new technologies and creative approaches to build better user experiences."
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Learning",
      description: "Continuously growing and sharing knowledge with the developer community."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Quality Focus",
      description: "Writing clean, maintainable code that stands the test of time and scale."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration",
      description: "Working with teams to deliver exceptional products and mentor fellow developers."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Knowledge Sharing",
      description: "Contributing to open-source projects and writing technical articles."
    }
  ]


  return (
    <section className="py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
            <Heart className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            What Drives Me
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            Beyond coding, here's what fuels my passion for development
          </p>
        </div>

        {/* Passions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {passions.map((passion, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-muted/20 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg group"
            >
              <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                {passion.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{passion.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed text-sm">
                {passion.description}
              </p>
            </div>
          ))}
        </div>

        
        
        
      </div>
    </section>
  )
}

export default HomePersonal
