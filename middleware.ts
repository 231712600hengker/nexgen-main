import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/sign-in';

  const isAuthenticated = request.cookies.get('auth')?.value;

  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/home',
    '/sign-in'
  ]
};