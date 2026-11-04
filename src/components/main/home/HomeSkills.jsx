'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import LogoLoop from '@/components/ui/LogoLoop'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiFigma,
  SiPhp,
  SiMongodb,
  SiDocker,
  SiVercel,
  SiJavascript,
  SiCanva
} from 'react-icons/si'

const skillGroups = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Python', 'PHP', 'Prisma', 'PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    title: 'Design & Tools',
    items: ['Figma', 'Canva', 'Git', 'GitHub', 'Docker', 'Vercel'],
  },
]

const techLogos = [
  { node: <SiReact className="text-[40px] transition-colors hover:text-[#61DAFB]" />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs className="text-[40px]" />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript className="text-[40px] transition-colors hover:text-[#3178C6]" />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiJavascript className="text-[40px] transition-colors hover:text-[#F7DF1E]" />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiTailwindcss className="text-[40px] transition-colors hover:text-[#06B6D4]" />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiNodedotjs className="text-[40px] transition-colors hover:text-[#339933]" />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiPython className="text-[40px] transition-colors hover:text-[#3776AB]" />, title: 'Python', href: 'https://www.python.org' },
  { node: <SiPhp className="text-[40px] transition-colors hover:text-[#777BB4]" />, title: 'PHP', href: 'https://www.php.net' },
  { node: <SiPostgresql className="text-[40px] transition-colors hover:text-[#4169E1]" />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
  { node: <SiMysql className="text-[40px] transition-colors hover:text-[#4479A1]" />, title: 'MySQL', href: 'https://www.mysql.com' },
  { node: <SiMongodb className="text-[40px] transition-colors hover:text-[#47A248]" />, title: 'MongoDB', href: 'https://www.mongodb.com' },
  { node: <SiPrisma className="text-[40px]" />, title: 'Prisma', href: 'https://www.prisma.io' },
  { node: <SiGit className="text-[40px] transition-colors hover:text-[#F05032]" />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiGithub className="text-[40px]" />, title: 'GitHub', href: 'https://github.com' },
  { node: <SiDocker className="text-[40px] transition-colors hover:text-[#2496ED]" />, title: 'Docker', href: 'https://www.docker.com' },
  { node: <SiVercel className="text-[40px]" />, title: 'Vercel', href: 'https://vercel.com' },
  { node: <SiFigma className="text-[40px] transition-colors hover:text-[#F24E1E]" />, title: 'Figma', href: 'https://www.figma.com' },
  { node: <SiCanva className="text-[40px] transition-colors hover:text-[#00C4CC]" />, title: 'Canva', href: 'https://www.canva.com' },
]

const HomeSkills = () => {
  return (
    <section className="py-24 md:py-28">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <p className="section-label">Stack</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground">
            Skills & technologies
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mb-12">
            Tools I reach for to turn ideas into polished products.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {skillGroups.map((group, idx) => (
            <ScrollReveal key={group.title} delay={0.08 * idx}>
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-sm text-foreground/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="h-[140px] w-full overflow-hidden">
        <LogoLoop
          logos={techLogos}
          speed={90}
          direction="left"
          logoHeight={40}
          gap={56}
          pauseOnHover
          scaleOnHover
          fadeOut
          ariaLabel="Technology stack"
        />
      </div>
    </section>
  )
}

export default HomeSkills
