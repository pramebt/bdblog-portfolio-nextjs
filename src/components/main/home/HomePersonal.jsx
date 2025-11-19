'use client'

import React from 'react'
import { Heart, Coffee, Lightning, GraduationCap, Target, Lightbulb, Users, BookOpen } from '@phosphor-icons/react'
import { GlowingEffect } from '@/components/ui/glowing-effect'

const HomePersonal = () => {
  const passions = [
    {
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
      icon: <Coffee size={16} weight="light" className="text-black dark:text-neutral-400" />,
      title: "Problem Solving",
      description: "Finding elegant solutions to complex challenges through creative thinking and systematic approach."
    },
    {
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
      icon: <Lightning size={16} weight="light" className="text-black dark:text-neutral-400" />,
      title: "Innovation",
      description: "Exploring new technologies and creative approaches to build better user experiences."
    },
    {
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
      icon: <GraduationCap size={16} weight="light" className="text-black dark:text-neutral-400" />,
      title: "Learning",
      description: "Continuously growing and sharing knowledge with the developer community."
    },
    {
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
      icon: <Target size={16} weight="light" className="text-black dark:text-neutral-400" />,
      title: "Quality Focus",
      description: "Writing clean, maintainable code that stands the test of time and scale."
    },
    {
      area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
      icon: <Users size={16} weight="light" className="text-black dark:text-neutral-400" />,
      title: "Collaboration",
      description: "Working with teams to deliver exceptional products and mentor fellow developers."
    }
  ]

  return (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
            <Heart size={32} weight="light" className="text-muted-foreground/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            What Drives Me
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            Beyond coding, here's what fuels my passion for development
          </p>
        </div>

        {/* Passions Grid with Glowing Effect */}
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          {passions.map((passion, index) => (
            <GridItem
              key={index}
              area={passion.area}
              icon={passion.icon}
              title={passion.title}
              description={passion.description}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

const GridItem = ({ area, icon, title, description }) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default HomePersonal
