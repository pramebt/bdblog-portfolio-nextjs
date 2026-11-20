import React from 'react'
import PageIntro from '@/components/main/shared/PageIntro'
import {
  ExperienceSection,
  EducationSection,
} from '@/components/main/experiment'

const ExperimentPage = () => {
  return (
    <div className="relative min-h-screen">
      <PageIntro
        label="Journey"
        title="Experience & education"
        description="My professional journey and educational background — places I've learned, built, and grown."
      />

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-5xl space-y-20">
          <ExperienceSection />
          <EducationSection />
        </div>
      </section>
    </div>
  )
}

export default ExperimentPage
