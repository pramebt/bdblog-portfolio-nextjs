'use client'

const BlogResultsInfo = ({ searchTerm, totalPosts, loading = false }) => {
  if (loading) return null

  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <p className="font-mono text-xs tracking-wide text-muted-foreground">
        {searchTerm ? (
          <>
            Results for “{searchTerm}” · {totalPosts}
          </>
        ) : (
          <>{totalPosts} articles</>
        )}
      </p>
    </div>
  )
}

export default BlogResultsInfo
