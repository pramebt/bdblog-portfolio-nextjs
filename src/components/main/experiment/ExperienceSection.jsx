import React from 'react'
import Image from 'next/image'

const ExperienceSection = () => {
  const experienceData = [
    {
      title: 'Frontend Developer',
      company: 'Freelance',
      period: 'June 2025 - July 2025',
      location: 'Remote',
      logo: '/images/common/freelance.webp',
      description: 'Freelance Project using React, React-Native, and Nextjs. Includes creating demo app such as ride-hailing. Also developed web platforms for car rental, lawyer landing page and backoffice systems for mentioned apps and websites.',
      skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS']
    },
    {
      title: 'Web Developer (Intern)',
      company: 'Forth Smart Service Public Co., Ltd.',
      period: 'May 2024 - June 2024',
      location: 'Bangkok, Thailand',
      logo: '/images/common/forth-logo.webp',
      description: 'Designed the database system and customized both the front-end and back-end of the website using HTML, CSS, JavaScript and PHP. Ensured that data added by the admin was dynamically displayed on the user interface for seamless user access. Modified and improved the system based on requests from other departments, including fetching data to display on the UI and adding new menus and features to the website.',
      skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'jQuery']
    }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-2xl font-light text-foreground mb-2">
          Experience
        </h2>
        <div className="w-12 h-px bg-border mx-auto"></div>
      </div>
      
      <div className="space-y-8">
        {experienceData.map((exp, index) => (
          <div key={index} className="group">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center flex-shrink-0">
                <Image 
                  src={exp.logo} 
                  alt={`${exp.company} logo`}
                  width={36}
                  height={36}
                  className="object-contain rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-muted-foreground font-light">
                    {exp.company}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>{exp.period}</span>
                  <span>•</span>
                  <span>{exp.location}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {exp.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceSection
