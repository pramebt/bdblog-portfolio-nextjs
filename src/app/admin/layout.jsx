import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import SidebarAdmin from '@/components/admin/headers/sidebar'

const AdminLayout = async ({ children }) => {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <SidebarAdmin user={session.user} />
      
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
