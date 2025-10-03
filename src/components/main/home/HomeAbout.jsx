import React from 'react'
import { Badge } from '@/components/ui/badge'
import { User, Code, Heart, Coffee, BookOpen, Lightbulb } from 'lucide-react'

const HomeAbout = () => {
  const interests = [
    { icon: Code, label: "Web Development" },
    { icon: BookOpen, label: "Learning" },
    { icon: Lightbulb, label: "Innovation" },
    { icon: Heart, label: "Problem Solving" }
  ]

  return (
    <section className="py-12 px-4 border-border/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            A passionate developer with a love for creating meaningful digital experiences
          </p>
        </div>

        <div className="space-y-12">
          {/* Story with Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
                <p>
                  Hello! I'm Bandit, a passionate developer from Phayao, Thailand. 
                  My journey in web development started with curiosity about how websites work, 
                  and it quickly became my passion.
                </p>
                <p>
                  I specialize in creating modern, responsive web applications using 
                  cutting-edge technologies. From frontend frameworks like React and Next.js 
                  to backend solutions with Node.js and databases, I enjoy the full spectrum 
                  of web development.
                </p>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-muted/20 border border-border/30 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <User className="h-16 w-16 text-muted-foreground/40 mx-auto" />
                  <p className="text-sm text-muted-foreground/60 font-light">
                    Profile Image
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">What I Love</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {interests.map((interest, index) => {
                const IconComponent = interest.icon
                return (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium bg-muted/30 text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {interest.label}
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Fun Facts */}
          <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 max-w-3xl mx-auto">
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center justify-center">
              <Coffee className="h-5 w-5 mr-2 text-primary" />
              Fun Facts
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>I drink more coffee than water ☕</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Love solving coding challenges in my free time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Always excited to learn new frameworks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeAbout
