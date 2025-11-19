'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Briefcase, User, GridFour } from '@phosphor-icons/react'

const ProjectTabs = ({ 
  projects = [],
  personalCount = 0,
  professionalCount = 0,
  totalCount = 0,
  activeTab = 'all',
  onTabChange,
  children
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-muted/50 backdrop-blur-sm">
        <TabsTrigger 
          value="all" 
          className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
        >
          <GridFour size={16} weight="light" />
          <span>All Projects</span>
          {totalCount > 0 && (
            <Badge variant="secondary" className="h-5 px-2 text-xs bg-background/80">
              {totalCount}
            </Badge>
          )}
        </TabsTrigger>
        
        <TabsTrigger 
          value="PERSONAL" 
          className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
        >
          <User size={16} weight="light" />
          <span>Personal</span>
          {personalCount > 0 && (
            <Badge variant="secondary" className="h-5 px-2 text-xs bg-background/80">
              {personalCount}
            </Badge>
          )}
        </TabsTrigger>
        
        <TabsTrigger 
          value="PROFESSIONAL" 
          className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
        >
          <Briefcase size={16} weight="light" />
          <span>Professional</span>
          {professionalCount > 0 && (
            <Badge variant="secondary" className="h-5 px-2 text-xs bg-background/80">
              {professionalCount}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-0">
        {children}
      </TabsContent>
      
      <TabsContent value="PERSONAL" className="mt-0">
        {children}
      </TabsContent>
      
      <TabsContent value="PROFESSIONAL" className="mt-0">
        {children}
      </TabsContent>
    </Tabs>
  )
}

export default ProjectTabs
