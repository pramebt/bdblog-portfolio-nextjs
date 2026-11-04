'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ProjectTabs = ({
  personalCount = 0,
  professionalCount = 0,
  totalCount = 0,
  activeTab = 'all',
  onTabChange,
  children,
}) => {
  const tabs = [
    { value: 'all', label: 'All', count: totalCount },
    { value: 'PERSONAL', label: 'Personal', count: personalCount },
    { value: 'PROFESSIONAL', label: 'Professional', count: professionalCount },
  ]

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-8 flex h-auto w-full flex-wrap justify-start gap-2 rounded-none bg-transparent p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-full border border-border/60 bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground shadow-none transition-all data-[state=active]:border-foreground/20 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 font-mono text-[10px] opacity-70">{tab.count}</span>
            )}
          </TabsTrigger>
        ))}
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
