"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Image,
  BarChart3,
  LogOut,
  User,
  Home,
} from "lucide-react";
import SidebarLink from "./sidebar-link";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";
import { useAdminStats } from "@/hooks/useAdminStats";

import { ModeToggle } from "@/components/main/headers/modetoggle";

const SidebarAdmin = ({ user }) => {
  const { stats, loading, error } = useAdminStats()

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  // Admin navigation items with dynamic badges
  const adminNavItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      href: "/admin/blog",
      label: "Posts",
      icon: BookOpen,
      badge: loading ? "..." : error ? "0" : stats.posts.total.toString(),
    },
    {
      href: "/admin/projects",
      label: "Projects",
      icon: FolderOpen,
      badge: loading ? "..." : error ? "0" : stats.projects.total.toString(),
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: BarChart3,
      badge: null,
    },
  ];

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
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || "admin@bdblog.com"}
            </p>
          </div>
          <ModeToggle />
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
      <div className="p-4 space-y-2">
      <Button
        asChild
          variant="ghost"
          size="sm"
          className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10"
        >
          <Link href="/" className="flex items-center space-x-2">
          <Home className="w-4 h-4 mr-2" />
          Home
          </Link>
        </Button>
        
      <Separator />
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
