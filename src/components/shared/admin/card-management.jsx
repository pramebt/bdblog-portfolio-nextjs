import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, FolderOpen, Image, Settings, Users, BarChart3 } from 'lucide-react'

const CardManagement = () => {
  // Admin dashboard cards data
  const dashboardCards = [
    {
      title: "Posts",
      description: "Manage your blog posts and articles",
      icon: BookOpen,
      badges: [
        { text: "12 Published", variant: "secondary" },
        { text: "3 Drafts", variant: "outline" }
      ],
      buttonText: "Manage Posts",
      buttonVariant: "default"
    },
    {
      title: "Projects",
      description: "Showcase your development projects",
      icon: FolderOpen,
      badges: [
        { text: "8 Active", variant: "secondary" },
        { text: "2 Archived", variant: "outline" }
      ],
      buttonText: "Manage Projects",
      buttonVariant: "default"
    },
    {
      title: "Media",
      description: "Manage your images and media files",
      icon: Image,
      badges: [
        { text: "156 Files", variant: "secondary" },
        { text: "2.3 GB", variant: "outline" }
      ],
      buttonText: "Manage Media",
      buttonVariant: "default"
    },
    {
      title: "Analytics",
      description: "View your blog performance metrics",
      icon: BarChart3,
      badges: [
        { text: "1.2K Views", variant: "secondary" },
        { text: "+15% This Week", variant: "outline" }
      ],
      buttonText: "View Analytics",
      buttonVariant: "outline"
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardCards.map((card) => {
        const IconComponent = card.icon
        return (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <IconComponent className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>
                {card.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-4">
                {card.badges.map((badge, index) => (
                  <Badge key={index} variant={badge.variant}>
                    {badge.text}
                  </Badge>
                ))}
              </div>
              <Button variant={card.buttonVariant} className="w-full">
                {card.buttonText}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default CardManagement
