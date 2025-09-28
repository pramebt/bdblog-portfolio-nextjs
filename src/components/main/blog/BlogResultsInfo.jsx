'use client'

const BlogResultsInfo = ({ searchTerm, totalPosts, loading = false }) => {
  if (loading) return null

  return (
    <div className="text-center mb-8">
      <p className="text-muted-foreground">
        {searchTerm ? (
          <>Search results for "{searchTerm}": {totalPosts} blog posts</>
        ) : (
          <>Total {totalPosts} blog posts</>
        )}
      </p>
    </div>
  )
}

export default BlogResultsInfo
