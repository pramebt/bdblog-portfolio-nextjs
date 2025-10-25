import React from 'react'
import Image from 'next/image'

const EducationSection = () => {
  const educationData = [
    {
      title: 'Bachelor of Computer Engineering',
      institution: 'Naresuan University',
      period: '2021 - 2025',
      location: 'Phitsanulok, Thailand',
      logo: '/images/common/nu-logo.webp'
    },
    {
      title: 'Science-Math',
      institution: 'Fakkwan Wittayakom School',
      period: '2018 - 2021',
      location: 'Phayao, Thailand',
      logo: '/images/common/fw-logo.webp'
    }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-2xl font-light text-foreground mb-2">
          Education
        </h2>
        <div className="w-12 h-px bg-border mx-auto"></div>
      </div>
      
      <div className="space-y-8">
        {educationData.map((edu, index) => (
          <div key={index} className="group">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center flex-shrink-0">
                <Image 
                  src={edu.logo} 
                  alt={`${edu.institution} logo`}
                  width={36}
                  height={36}
                  className="object-contain rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {edu.title}
                  </h3>
                  <p className="text-muted-foreground font-light">
                    {edu.institution}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>{edu.period}</span>
                  <span>•</span>
                  <span>{edu.location}</span>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EducationSection
