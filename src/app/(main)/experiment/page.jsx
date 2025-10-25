import React from 'react'
import { Separator } from '@/components/ui/separator'
import { 
  ExperienceSection,
  EducationSection,
} from '@/components/main/experiment'

const ExperimentPage = () => {
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
        <ExperienceSection />

        <Separator className="my-16" />

        {/* Education Section */}
        <EducationSection />
      </div>
    </div>
  )
}

export default ExperimentPage