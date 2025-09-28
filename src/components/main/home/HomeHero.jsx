import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User, MapPin, Calendar, ArrowRight } from 'lucide-react'

const HomeHero = () => {
  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-32 h-32 mx-auto mb-12 rounded-full bg-muted/30 flex items-center justify-center">
          <User className="h-16 w-16 text-muted-foreground/60" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 text-foreground">
          BD Blog
        </h1>
        <p className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto font-light leading-relaxed">
          Passionate developer who loves creating meaningful digital experiences.
        </p>
        <p className="text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          นักพัฒนาที่หลงใหลในการสร้างประสบการณ์ดิจิทัลที่มีความหมาย
        </p>

        <div className="flex flex-wrap gap-4 justify-center items-center mb-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span className="font-light">Bangkok, Thailand</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span className="font-light">Available for projects</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            asChild 
            size="lg" 
            className="px-8 py-4 text-lg font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            <Link href="/blog">
              Read Blog
            </Link>
          </Button>
          <Button 
            asChild 
            variant="ghost" 
            size="lg"
            className="px-8 py-4 text-lg font-medium rounded-full hover:bg-muted/50 transition-colors"
          >
            <Link href="/projects">
              View Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
