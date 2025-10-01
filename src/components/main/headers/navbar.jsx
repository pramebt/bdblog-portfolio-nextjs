"use client"
import React from 'react'
import Link from 'next/link'
import { Home, BookOpen, FolderOpen, User, Mail, LogOut, FlaskConical} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { FloatingDock } from "@/components/ui/floating-dock";
const Navbar = ({ user }) => {
  // Navigation items array
  const links = [
    {
      href: "/",
      title: "Home",
      icon: (<Home className="h-full w-full text-neutral-500 dark:text-neutral-300"/>)
    },
    {
      href: "/blog",
      title: "Blog",
      icon: (<BookOpen className="h-full w-full text-neutral-500 dark:text-neutral-300"/>)
    },
    {
      href: "/projects",
      title: "Projects",
      icon: (<FolderOpen className="h-full w-full text-neutral-500 dark:text-neutral-300"/>)
    },
    {
      href: "/experiment",
      title: "Experiment",
      icon: (<FlaskConical className="h-full w-full text-neutral-500 dark:text-neutral-300"/>)
    },
    {
      href: "/contact",
      title: "Contact",
      icon: (<Mail className="h-full w-full text-neutral-500 dark:text-neutral-300"/>)
    }
  ]

  return (
    <nav className="flex items-center space-x-6">
     <FloatingDock
        desktopClassName="fixed top-8 left-1/2 transform -translate-x-1/2"
        mobileClassName="fixed top-4 right-4"
        items={links}
      />

      
    </nav>
  )
}

export default Navbar