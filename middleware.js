import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is trying to access admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          // Check if user has admin role
          return token?.role === 'ADMIN'
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
  ]
}
