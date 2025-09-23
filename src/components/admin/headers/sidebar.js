 "use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  BookOpen, 
  FolderOpen, 
  Image, 
 
  BarChart3,
  LogOut,
  User
} from 'lucide-react'
import SidebarLink from './sidebar-link'

const SidebarAdmin = ({ user }) => {
  // Admin navigation items
  const adminNavItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      href: "/admin/posts",
      label: "Posts",
      icon: BookOpen,
      badge: "12"
    },
    {
      href: "/admin/projects",
      label: "Projects", 
      icon: FolderOpen,
      badge: "8"
    },
    {
      href: "/admin/media",
      label: "Media",
      icon: Image,
      badge: "156"
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: BarChart3,
      badge: null
    },

  ]

  return (
    <aside className="w-64 bg-card border-r border-border h-screen fixed left-0 top-0 pt-16 flex flex-col">
      {/* User Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.name || 'Admin User'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || 'admin@bdblog.com'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {adminNavItems.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            badge={item.badge}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  )
}

export default SidebarAdmin