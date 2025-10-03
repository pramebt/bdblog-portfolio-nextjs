import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Code2 } from 'lucide-react'
import LogoLoop from '@/components/LogoLoop';
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
  SiFigma
} from 'react-icons/si';
const HomeSkills = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
    'Python', 'PHP', 'MySQL', 'MongoDB', 'Prisma',
    'Tailwind CSS', 'Git', 'Docker', 'AWS', 'Vercel'
  ]
  const techLogos = [
    { node: <SiReact className="text-[48px]" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className="text-[48px]" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="text-[48px]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss className="text-[48px]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiNodedotjs className="text-[48px]" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiPython className="text-[48px]" />, title: "Python", href: "https://www.python.org" },
    { node: <SiPostgresql className="text-[48px]" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
    { node: <SiMysql className="text-[48px]" />, title: "MySQL", href: "https://www.mysql.com" },
    { node: <SiPrisma className="text-[48px]" />, title: "Prisma", href: "https://www.prisma.io" },
    { node: <SiGit className="text-[48px]" />, title: "Git", href: "https://git-scm.com" },
    { node: <SiGithub className="text-[48px]" />, title: "GitHub", href: "https://github.com" },
    { node: <SiFigma className="text-[48px]" />, title: "Figma", href: "https://www.figma.com" },
  ];
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
            <Code2 className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto mb-12">
          {skills.map((skill, index) => (
            <Badge 
              key={index}
              variant="secondary" 
              className="px-4 py-2 text-base font-medium rounded-full bg-muted/30 text-foreground hover:bg-muted/50 transition-colors"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Full width LogoLoop */}
      <div className="w-screen relative left-[50%] right-[50%] -mx-[50vw] h-[200px] overflow-hidden">
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={48}
          gap={60}
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
