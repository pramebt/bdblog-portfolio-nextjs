import Link from 'next/link'
import { ArrowLeft, CircleNotch, WarningCircle } from '@phosphor-icons/react/dist/ssr'

export const DetailLoading = ({ label = 'Loading…' }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
    <CircleNotch size={28} weight="bold" className="animate-spin text-muted-foreground" />
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
  </div>
)

export const DetailError = ({ message, backHref, backLabel }) => (
  <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/5">
      <WarningCircle size={30} weight="duotone" className="text-destructive" />
    </div>
    <h1 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">Something went wrong</h1>
    <p className="mb-8 font-light leading-relaxed text-muted-foreground">{message}</p>
    <BackLink href={backHref} label={backLabel} />
  </div>
)

export const BackLink = ({ href, label }) => (
  <Link
    href={href}
    className="group inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-foreground/25 hover:text-foreground"
  >
    <ArrowLeft size={14} weight="bold" className="transition-transform duration-300 group-hover:-translate-x-0.5" />
    {label}
  </Link>
)
