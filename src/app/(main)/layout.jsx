import React from 'react'
import Footer from '@/components/main/headers/footer'
import HeaderMain from '@/components/main/headers/header'
import { ModeToggle } from '@/components/main/headers/modetoggle'
import { cn } from "@/lib/utils";
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <HeaderMain />
      {/* Main Content */}
      <main className="flex-1 pt-14 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      {/* Absolute positioned ModeToggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <ModeToggle />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout