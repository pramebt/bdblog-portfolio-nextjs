import React from 'react'

import Image from 'next/image'

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
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Text Content */}
            <div className="flex items-start">
              <div className="space-y-6 w-full">
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
            </div>

          {/* Profile Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl border border-border/30 overflow-hidden relative">
              <Image
                src="/images/common/prame.webp"
                alt="Profile image"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
          </div>

          

        </div>
      </div>
    </section>
  )
}

export default HomeAbout
