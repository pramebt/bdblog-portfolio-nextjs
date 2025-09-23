"use client"
import React from 'react'
import Link from 'next/link'
import { Home, BookOpen, FolderOpen, User, Mail, LogOut} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ModeToggle } from './modetoggle'

const Navbar = ({ user }) => {
  // Navigation items array
  const navigationItems = [
    {
      href: "/",
      label: "Home",
      icon: Home
    },
    {
      href: "/blog",
      label: "Blog",
      icon: BookOpen
    },
    {
      href: "/projects",
      label: "Projects",
      icon: FolderOpen
    },
    {
      href: "/about",
      label: "About",
      icon: User
    },
    {
      href: "/contact",
      label: "Contact",
      icon: Mail
    }
  ]

  return (
    <nav className="flex items-center space-x-6">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        {navigationItems.map((item) => {
          const IconComponent = item.icon
          return (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href} className="flex items-center space-x-2">
                <IconComponent className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            </Button>
          )
        })}
      </div>
      
      <ModeToggle />

      {/* User Authentication */}
      <div className="flex items-center space-x-3">
        {user ? (
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="text-xs">
              {user.name}
            </Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin">
                Admin
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin">
              Admin
            </Link>
          </Button>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button variant="ghost" size="sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar