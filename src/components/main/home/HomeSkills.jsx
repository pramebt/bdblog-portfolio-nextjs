import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Code2, Monitor, Server, Palette, Wrench } from 'lucide-react'
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
  SiFigma,
  SiPhp,
  SiMongodb,
  SiDocker,
  SiAmazon,
  SiVercel,
  SiJavascript
} from 'react-icons/si';

const HomeSkills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Monitor className="h-6 w-6" />,
      color: "text-muted-foreground",
      bgColor: "bg-muted/30",
      skills: [
        { name: 'React', icon: <SiReact className="h-5 w-5 transition-colors group-hover:text-[#61DAFB]" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="h-5 w-5 transition-colors" /> },
        { name: 'TypeScript', icon: <SiTypescript className="h-5 w-5 transition-colors group-hover:text-[#3178C6]" /> },
        { name: 'JavaScript', icon: <SiJavascript className="h-5 w-5 transition-colors group-hover:text-[#F7DF1E]" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="h-5 w-5 transition-colors group-hover:text-[#06B6D4]" /> },
      ]
    },
    {
      title: "Backend",
      icon: <Server className="h-6 w-6" />,
      color: "text-muted-foreground",
      bgColor: "bg-muted/30",
      skills: [
        { name: 'Node.js', icon: <SiNodedotjs className="h-5 w-5 transition-colors group-hover:text-[#339933]" /> },
        { name: 'Python', icon: <SiPython className="h-5 w-5 transition-colors group-hover:text-[#3776AB]" /> },
        { name: 'PHP', icon: <SiPhp className="h-5 w-5 transition-colors group-hover:text-[#777BB4]" /> },
        { name: 'Prisma', icon: <SiPrisma className="h-5 w-5 transition-colors group-hover:text-[#2D3748]" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className="h-5 w-5 transition-colors group-hover:text-[#4169E1]" /> },
        { name: 'MySQL', icon: <SiMysql className="h-5 w-5 transition-colors group-hover:text-[#4479A1]" /> },
        { name: 'MongoDB', icon: <SiMongodb className="h-5 w-5 transition-colors group-hover:text-[#47A248]" /> },
      ]
    },
    {
      title: "Design",
      icon: <Palette className="h-6 w-6" />,
      color: "text-muted-foreground",
      bgColor: "bg-muted/30",
      skills: [
        { name: 'Figma', icon: <SiFigma className="h-5 w-5 transition-colors group-hover:text-[#F24E1E]" /> },
      ]
    },
    {
      title: "Tools",
      icon: <Wrench className="h-6 w-6" />,
      color: "text-muted-foreground",
      bgColor: "bg-muted/30",
      skills: [
        { name: 'Git', icon: <SiGit className="h-5 w-5 transition-colors group-hover:text-[#F05032]" /> },
        { name: 'GitHub', icon: <SiGithub className="h-5 w-5 transition-colors" /> },
        { name: 'Docker', icon: <SiDocker className="h-5 w-5 transition-colors group-hover:text-[#2496ED]" /> },
        { name: 'AWS', icon: <SiAmazon className="h-5 w-5 transition-colors group-hover:text-[#FF9900]" /> },
        { name: 'Vercel', icon: <SiVercel className="h-5 w-5 transition-colors" /> },
      ]
    }
  ];

  const techLogos = [
    { node: <SiReact className="text-[48px] transition-colors hover:text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className="text-[48px] transition-colors" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="text-[48px] transition-colors hover:text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss className="text-[48px] transition-colors hover:text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiNodedotjs className="text-[48px] transition-colors hover:text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiPython className="text-[48px] transition-colors hover:text-[#3776AB]" />, title: "Python", href: "https://www.python.org" },
    { node: <SiPostgresql className="text-[48px] transition-colors hover:text-[#4169E1]" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
    { node: <SiMysql className="text-[48px] transition-colors hover:text-[#4479A1]" />, title: "MySQL", href: "https://www.mysql.com" },
    { node: <SiPrisma className="text-[48px] transition-colors hover:text-[#2D3748]" />, title: "Prisma", href: "https://www.prisma.io" },
    { node: <SiGit className="text-[48px] transition-colors hover:text-[#F05032]" />, title: "Git", href: "https://git-scm.com" },
    { node: <SiGithub className="text-[48px] transition-colors" />, title: "GitHub", href: "https://github.com" },
    { node: <SiFigma className="text-[48px] transition-colors hover:text-[#F24E1E]" />, title: "Figma", href: "https://www.figma.com" },
  ];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx}
              className="group p-6 rounded-2xl bg-muted/20 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${category.bgColor} ${category.color} transition-transform group-hover:scale-110`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>
              
              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIdx) => (
                  <div 
                    key={skillIdx}
                    className="flex items-center gap-3 p-2 rounded-lg bg-background/50 hover:bg-background transition-colors"
                  >
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.icon}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
