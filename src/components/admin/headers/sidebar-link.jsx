"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const SidebarLink = ({ href, label, icon: Icon, badge }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="sm"
      asChild
      className={cn(
        "w-full justify-start h-10",
        isActive && "bg-secondary text-secondary-foreground"
      )}
    >
      <Link href={href} className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        {badge && (
          <Badge variant="default" className="text-xs bg-primary text-white">
            {badge}
          </Badge>
        )}
      </Link>
    </Button>
  )
}

export default SidebarLink