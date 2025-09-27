'use client'

const BlogResultsInfo = ({ searchTerm, totalPosts, loading = false }) => {
  if (loading) return null

  return (
    <div className="text-center mb-8">
      <p className="text-muted-foreground">
        {searchTerm ? (
          <>ผลการค้นหา "{searchTerm}": {totalPosts} บทความ</>
        ) : (
          <>ทั้งหมด {totalPosts} บทความ</>
        )}
      </p>
    </div>
  )
}

export default BlogResultsInfo
