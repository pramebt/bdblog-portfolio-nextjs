'use client'

import { WarningCircle } from '@phosphor-icons/react/dist/ssr'

const ProjectErrorState = ({ error }) => {
  if (!error) return null

  return (
    <div className="mx-auto mb-8 flex max-w-md items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4">
      <WarningCircle size={20} weight="duotone" className="shrink-0 text-destructive" />
      <p className="text-sm text-destructive">{error}</p>
    </div>
  )
}

export default ProjectErrorState
