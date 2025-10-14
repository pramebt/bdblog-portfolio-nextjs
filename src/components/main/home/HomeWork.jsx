import React from 'react'
import Link from 'next/link'
import { BookOpen, FolderOpen, ArrowRight, PenTool, Code, Layers } from 'lucide-react'

const HomeWork = () => {
  const workHighlights = [
    {
      category: "Blog",
      icon: <BookOpen className="w-8 h-8 text-background" />,
      title: "Technical Articles",
      description: "In-depth tutorials, insights, and thoughts about web development, programming best practices, and the latest technology trends.",
      features: [
        "React & Next.js tutorials",
        "Development best practices", 
        "Technology insights",
        "Problem-solving guides"
      ],
      link: "/blog",
      linkText: "Read articles",
      bgColor: "bg-foreground"
    },
    {
      category: "Projects",
      icon: <FolderOpen className="w-8 h-8 text-background" />,
      title: "Web Applications",
      description: "A diverse collection of web applications, tools, and experiments built using modern technologies and frameworks.",
      features: [
        "Full-stack applications",
        "Modern UI/UX design",
        "Responsive layouts",
        "Performance optimized"
      ],
      link: "/projects",
      linkText: "View work",
      bgColor: "bg-foreground"
    }
  ]

  

  return (
    <section className="py-6 px-4 border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Explore My Work
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            Discover my thoughts through articles and see my projects in action
          </p>
        </div>

        {/* Work Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {workHighlights.map((work, index) => (
            <div key={index} className="group">
              <div className="p-8 rounded-2xl bg-muted/20 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg">
                <div className="text-center space-y-6">
                  <div className={`w-16 h-16 mx-auto ${work.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {work.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">{work.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {work.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {work.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link 
                      href={work.link} 
                      className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors font-medium group-hover:gap-3 gap-2"
                    >
                      {work.linkText}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  )
}

export default HomeWork
