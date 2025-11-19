"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, FolderOpen, CircleNotch } from '@phosphor-icons/react'
import { useAdminStats } from '@/hooks/useAdminStats'
import Link from 'next/link'

const CardManagement = () => {
  const { stats, loading, error } = useAdminStats()

  // Helper function to format numbers
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  // Admin dashboard cards data with dynamic content
  const getDashboardCards = () => [
    {
      title: "Posts",
      description: "Manage your blog posts and articles",
      icon: BookOpen,
      href: "/admin/blog",
      badges: loading ? [
        { text: "Loading...", variant: "outline" },
        { text: "Loading...", variant: "outline" }
      ] : error ? [
        { text: "Error", variant: "destructive" },
        { text: "Error", variant: "destructive" }
      ] : [
        { text: `${stats.posts.published} Published`, variant: "secondary" },
        { text: `${stats.posts.draft} Drafts`, variant: "outline" }
      ],
      buttonText: "Manage Posts",
      buttonVariant: "default",
      total: loading ? "..." : error ? "0" : stats.posts.total
    },
    {
      title: "Projects",
      description: "Showcase your development projects",
      icon: FolderOpen,
      href: "/admin/projects",
      badges: loading ? [
        { text: "Loading...", variant: "outline" },
        { text: "Loading...", variant: "outline" }
      ] : error ? [
        { text: "Error", variant: "destructive" },
        { text: "Error", variant: "destructive" }
      ] : [
        { text: `${stats.projects.published} Active`, variant: "secondary" },
        { text: `${stats.projects.draft} Drafts`, variant: "outline" }
      ],
      buttonText: "Manage Projects",
      buttonVariant: "default",
      total: loading ? "..." : error ? "0" : stats.projects.total
    },
  ]

  const dashboardCards = getDashboardCards()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardCards.map((card) => {
        const IconComponent = card.icon
        return (
          <Card key={card.title} className="hover:shadow-lg transition-all duration-200 border-border/50 hover:border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  {card.total && (
                    <Badge variant="secondary" className="text-xs">
                      {card.total}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {loading && <CircleNotch size={16} weight="bold" className="animate-spin text-muted-foreground" />}
                  <IconComponent size={20} weight="light" className="text-muted-foreground" />
                </div>
              </div>
              <CardDescription className="text-sm">
                {card.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {card.badges.map((badge, index) => (
                  <Badge key={index} variant={badge.variant} className="text-xs">
                    {badge.text}
                  </Badge>
                ))}
              </div>
              <Button 
                variant={card.buttonVariant} 
                className="w-full"
                asChild
                disabled={loading}
              >
                <Link href={card.href}>
                  {loading ? (
                    <>
                      <CircleNotch size={16} weight="bold" className="mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    card.buttonText
                  )}
                </Link>
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default CardManagement
