'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Timeline } from '@/components/ui/timeline'
import { 
  Buildings, 
  Rocket, 
  Code,
  MapPin,
  CaretDown,
  CaretUp
} from '@phosphor-icons/react/dist/ssr'

const HomeExperience = () => {
  const [expandedItems, setExpandedItems] = useState(new Set())

  const toggleExpanded = (index) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  // Experience data
  const experienceData = [
    {
      title: 'June 2025 - July 2025',
      iconBg: 'bg-white',
      logo: {
        src: '/images/common/freelance.webp',
        alt: 'Freelance Logo',
        width: 36,
        height: 36,
        className: 'object-contain rounded-full'
      },
      content: (index) => (
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-border transition-all duration-300">
          {/* ส่วนที่แสดงเสมอ - ข้อมูลพื้นฐาน */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 p-2">
                <Image 
                  src="/images/common/freelance.webp" 
                  alt="Freelance Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-full transition-transform hover:scale-110"
                />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">
                  Frontend Developer
                </h3>
                <p className="text-sm md:text-base text-muted-foreground font-medium mb-2">
                  Freelance
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} weight="light" />
                  <span>Remote</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleExpanded(index)}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-foreground/5 transition-all duration-500 ease-out"
            >
              <CaretDown 
                size={16}
                weight="bold"
                className={`text-foreground dark:text-white transition-all duration-500 ease-out ${
                  expandedItems.has(index) ? 'rotate-180' : 'rotate-0'
                }`} 
              />
            </button>
          </div>

          {/* ส่วนรายละเอียดที่สามารถพับได้ */}
          <div className={`overflow-hidden transition-all duration-500 ease-out ${
            expandedItems.has(index) ? 'max-h-96 opacity-100 mt-4 pt-4 border-t border-border/50' : 'max-h-0 opacity-0'
          }`}>
            <div className="animate-in slide-in-from-top-2 duration-500 ease-out">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Freelance Project using React, React-Native, and Nextjs. Includes creating demo app such as ride-hailing. Also developed web platforms for car rental,lawyer landing page and backoffice systems for mentioned apps and websites.
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'].map((tech, idx) => (
                  <Badge 
                    key={idx}
                    variant="secondary"
                    className="text-xs bg-muted/50 hover:bg-muted transition-all duration-300 ease-out"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'May 2024 - June 2024',
      iconColor: 'text-purple-500',
      iconBg: 'bg-white',
      logo: {
        src: '/images/common/forth-logo.webp',
        alt: 'Forth Smart Service Logo',
        width: 36,
        height: 36,
        className: 'object-contain rounded-full'
      },
      content: (index) => (
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-border transition-all duration-300">
          {/* ส่วนที่แสดงเสมอ - ข้อมูลพื้นฐาน */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="border w-14 h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 p-2">
                <Image 
                  src="/images/common/forth-logo.webp" 
                  alt="Forth Smart Service Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-full transition-transform hover:scale-110"
                />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">
                  Web Developer (Intern)
                </h3>
                <p className="text-sm md:text-base text-muted-foreground font-medium mb-2">
                  Forth Smart Service Public Co., Ltd.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} weight="light" />
                  <span>Bangkok, Thailand</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleExpanded(index)}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-foreground/5 transition-all duration-500 ease-out"
            >
              <CaretDown 
                size={16}
                weight="bold"
                className={`text-foreground dark:text-white transition-all duration-500 ease-out ${
                  expandedItems.has(index) ? 'rotate-180' : 'rotate-0'
                }`} 
              />
            </button>
          </div>

          {/* ส่วนรายละเอียดที่สามารถพับได้ */}
          <div className={`overflow-hidden transition-all duration-500 ease-out ${
            expandedItems.has(index) ? 'max-h-96 opacity-100 mt-4 pt-4 border-t border-border/50' : 'max-h-0 opacity-0'
          }`}>
            <div className="animate-in slide-in-from-top-2 duration-500 ease-out">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Designed the database system and customized both the front-end and back-end of the website using HTML, CSS, JavaScript and PHP. Ensured that data added by the admin was dynamically displayed on the user interface for seamless user access. Modified and improved the system based on requests from other departments, including fetching data to display on the UI and adding new menus and features to the website.
              </p>
              <div className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'jQuery'].map((tech, idx) => (
                  <Badge 
                    key={idx}
                    variant="secondary"
                    className="text-xs bg-muted/50 hover:bg-muted transition-all duration-300 ease-out"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    
  ]

  // Use only experience data for now
  const timelineData = experienceData

  return (
    <div className="w-full">
      <Timeline data={timelineData} />
    </div>
  )
}

export default HomeExperience
