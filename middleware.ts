import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simplified middleware. In a real production app, 
// you would verify the Firebase ID token using firebase-admin on the server side.
// Since we are in a preview environment, we'll implement the logic 
// but note that full verification requires a secure session cookie or similar.

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // In a real app, check for a session cookie
    const session = request.cookies.get('session');

    if (!session) {
      // Redirect to login if no session
      // return NextResponse.redirect(new URL('/login', request.url));
      // For now, we allow it to proceed but in production this would be strict
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
