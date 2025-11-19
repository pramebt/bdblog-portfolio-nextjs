"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import { House, BookOpen, FolderOpen, User, EnvelopeSimple, SignOut, Flask} from '@phosphor-icons/react'


import { FloatingDock } from "@/components/ui/floating-dock";
const Navbar = ({ user }) => {
  const pathname = usePathname()
  
  // Navigation items array
  const links = [
    {
      href: "/",
      title: "Home",
      icon: (<House weight="light" className="h-full w-full text-neutral-500 dark:text-neutral-300"/>),
      isActive: pathname === "/"
    },
    {
      href: "/blog",
      title: "Blog",
      icon: (<BookOpen weight="light" className="h-full w-full text-neutral-500 dark:text-neutral-300"/>),
      isActive: pathname.startsWith("/blog")
    },
    {
      href: "/projects",
      title: "Projects",
      icon: (<FolderOpen weight="light" className="h-full w-full text-neutral-500 dark:text-neutral-300"/>),
      isActive: pathname.startsWith("/projects")
    },
    {
      href: "/experiment",
      title: "Experiment",
      icon: (<Flask weight="light" className="h-full w-full text-neutral-500 dark:text-neutral-300"/>),
      isActive: pathname.startsWith("/experiment")
    },
    {
      href: "/contact",
      title: "Contact",
      icon: (<EnvelopeSimple weight="light" className="h-full w-full text-neutral-500 dark:text-neutral-300"/>),
      isActive: pathname.startsWith("/contact")
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