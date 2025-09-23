import React from 'react'
import SidebarAdmin from '@/components/admin/headers/sidebar'

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <SidebarAdmin />
      
      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
