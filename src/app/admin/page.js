import React from 'react'
import CardManagement from '@/components/shared/admin/card-management'

const AdminPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your blog content and settings</p>
      </div>
      
      <CardManagement />
    </div>
  )
}

export default AdminPage
