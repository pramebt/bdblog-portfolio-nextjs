import React from 'react'
import Footer from '@/components/main/headers/footer'
import HeaderMain from '@/components/main/headers/header'

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

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout