import React from 'react'
import { Heart, Coffee, Zap, GraduationCap } from 'lucide-react'

const HomePersonal = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
            <Heart className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            What I Love
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Beyond coding, here's what drives my passion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-muted/30 flex items-center justify-center">
              <Coffee className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Problem Solving</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Finding elegant solutions to complex challenges
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-muted/30 flex items-center justify-center">
              <Zap className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Innovation</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Exploring new technologies and creative approaches
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-muted/30 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Learning</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Continuously growing and sharing knowledge
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePersonal
