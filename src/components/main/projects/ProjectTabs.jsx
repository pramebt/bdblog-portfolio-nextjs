'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Briefcase, User, GridFour } from '@phosphor-icons/react/dist/ssr'

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
      <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-auto sm:h-12 bg-muted/50 backdrop-blur-sm gap-1 sm:gap-0 p-1 sm:p-0">
        <TabsTrigger 
          value="all" 
          className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground px-2 sm:px-4 py-2 sm:py-0 min-h-[40px] sm:min-h-0 w-full"
        >
          <GridFour size={16} weight="light" className="sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">All Projects</span>
          {totalCount > 0 && (
            <Badge variant="secondary" className="h-4 sm:h-5 px-1.5 sm:px-2 text-[10px] sm:text-xs bg-background/80 flex-shrink-0">
              {totalCount}
            </Badge>
          )}
        </TabsTrigger>
        
        <TabsTrigger 
          value="PERSONAL" 
          className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground px-2 sm:px-4 py-2 sm:py-0 min-h-[40px] sm:min-h-0 w-full"
        >
          <User size={16} weight="light" className="sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">Personal</span>
          {personalCount > 0 && (
            <Badge variant="secondary" className="h-4 sm:h-5 px-1.5 sm:px-2 text-[10px] sm:text-xs bg-background/80 flex-shrink-0">
              {personalCount}
            </Badge>
          )}
        </TabsTrigger>
        
        <TabsTrigger 
          value="PROFESSIONAL" 
          className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground px-2 sm:px-4 py-2 sm:py-0 min-h-[40px] sm:min-h-0 w-full"
        >
          <Briefcase size={16} weight="light" className="sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">Professional</span>
          {professionalCount > 0 && (
            <Badge variant="secondary" className="h-4 sm:h-5 px-1.5 sm:px-2 text-[10px] sm:text-xs bg-background/80 flex-shrink-0">
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
