import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'

export default function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 ambient-surface" />

      <Link href="/" className="mb-10 inline-flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-foreground/5">
          <Image
            src="/images/common/terminal-box-fill.svg"
            alt="BD Folio"
            width={18}
            height={18}
            className="dark:invert"
          />
        </div>
        <span className="text-base font-semibold tracking-tight text-foreground">BD Folio</span>
      </Link>

      {children}

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} weight="bold" />
        Back to site
      </Link>
    </div>
  )
}
