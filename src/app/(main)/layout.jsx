import React from 'react'
import Footer from '@/components/main/headers/footer'
import HeaderMain from '@/components/main/headers/header'
import { ModeToggle } from '@/components/main/headers/modetoggle'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMain />
      <main className="@container flex-1 pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <div className="fixed bottom-6 right-6 z-50">
        <ModeToggle />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout