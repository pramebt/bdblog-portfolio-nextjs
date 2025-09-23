import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, FolderOpen, Image, Settings, Users, BarChart3 } from 'lucide-react'

const AdminPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your blog content and settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Posts Management */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Posts</CardTitle>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Manage your blog posts and articles
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">12 Published</Badge>
              <Badge variant="outline">3 Drafts</Badge>
            </div>
            <Button className="w-full">
              Manage Posts
            </Button>
          </CardContent>
        </Card>

        {/* Projects Management */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Projects</CardTitle>
              <FolderOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Showcase your development projects
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">8 Active</Badge>
              <Badge variant="outline">2 Archived</Badge>
            </div>
            <Button className="w-full">
              Manage Projects
            </Button>
          </CardContent>
        </Card>

        {/* Media Management */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Media</CardTitle>
              <Image className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Manage your images and media files
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">156 Files</Badge>
              <Badge variant="outline">2.3 GB</Badge>
            </div>
            <Button className="w-full">
              Manage Media
            </Button>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Analytics</CardTitle>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              View your blog performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">1.2K Views</Badge>
              <Badge variant="outline">+15% This Week</Badge>
            </div>
            <Button variant="outline" className="w-full">
              View Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Users */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Users</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">3 Admins</Badge>
              <Badge variant="outline">1 Editor</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Manage Users
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Settings</CardTitle>
              <Settings className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Configure your blog settings
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">General</Badge>
              <Badge variant="outline">SEO</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Open Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminPage
