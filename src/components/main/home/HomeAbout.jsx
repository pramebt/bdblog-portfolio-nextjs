import React from 'react'

import { User, } from 'lucide-react'

const HomeAbout = () => {

  return (
    <section className="py-12 px-4 border-border/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-left mb-8">
          
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
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

          

        </div>
      </div>
    </section>
  )
}

export default HomeAbout
