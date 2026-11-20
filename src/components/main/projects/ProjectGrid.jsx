'use client'

import ProjectCard from './ProjectCard'
import ProjectIndexList from './ProjectIndexList'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const LG_SPAN = {
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  12: 'lg:col-span-12',
}

const ROW_PATTERNS = [
  [4, 4, 4],
  [7, 5],
]

// Lays cards out in alternating 3-up / 7-5 rows; a lone trailing card becomes a full-width "wide" card.
const buildBentoLayout = (count) => {
  const layout = []
  let row = 0
  while (layout.length < count) {
    const pattern = ROW_PATTERNS[row % ROW_PATTERNS.length]
    const remaining = count - layout.length
    if (remaining >= pattern.length) {
      pattern.forEach((span) => layout.push({ span, variant: 'card' }))
    } else if (remaining === 1) {
      layout.push({ span: 12, variant: 'wide' })
    } else {
      Array.from({ length: remaining }).forEach(() => layout.push({ span: 12 / remaining, variant: 'card' }))
    }
    row += 1
  }
  return layout
}

const ProjectGrid = ({ projects, loading = false, view = 'grid', startIndex = 1 }) => {
  if (loading || projects.length === 0) return null

  if (view === 'index') {
    return (
      <div className="mb-12">
        <ProjectIndexList projects={projects} startIndex={startIndex} />
      </div>
    )
  }

  const [featured, ...rest] = projects
  const layout = buildBentoLayout(rest.length)

  return (
    <div className="mb-12 space-y-4">
      <ScrollReveal yOffset={24} duration={0.85}>
        <ProjectCard project={featured} index={startIndex} variant="featured" />
      </ScrollReveal>

      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {rest.map((project, i) => {
            const { span, variant } = layout[i]
            const regularBefore = layout.slice(0, i).filter((item) => item.variant === 'card').length
            const mdSpan = variant === 'wide' && regularBefore % 2 === 0 ? 'md:col-span-2' : ''
            return (
              <ScrollReveal
                key={project.id}
                className={`${LG_SPAN[span]} ${mdSpan}`}
                delay={Math.min((i % 3) * 0.08, 0.24)}
                yOffset={20}
              >
                <ProjectCard project={project} index={startIndex + i + 1} variant={variant} />
              </ScrollReveal>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProjectGrid
