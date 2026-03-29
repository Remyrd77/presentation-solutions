import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Allow access to login page without authentication
    if (req.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // You can add additional middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow login page without token
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }
        // Require token for all other admin pages
        return !!token;
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

// Protect all /admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
