// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

// Proteger todas las rutas que empiecen con /dashboard, /xtb, etc.
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/xtb/:path*',
    '/trade-republic/:path*',
    '/mintos/:path*',
    '/real-estate/:path*',
    '/analytics/:path*',
  ],
};