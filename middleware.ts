import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {  // Get URL information
  const url = request.nextUrl;
  
  // Handle payment status URL with required query parameters
  if (url.pathname === '/payment/status' && request.method === 'POST') {
    const params = url.searchParams;
    const redirectUrl = new URL('/payment/status', url.origin);
    redirectUrl.search = params.toString();
    
    return NextResponse.redirect(redirectUrl, {
      status: 303 // Using 303 See Other for proper POST-to-GET redirect
    });
  }

  // Create response
  const response = NextResponse.next();

  // Add request information to headers
  response.headers.set('x-pathname', url.pathname);
  response.headers.set('x-url', request.url);
  response.headers.set('x-search-params', url.search);

  return response;
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
