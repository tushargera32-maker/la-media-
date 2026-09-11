import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Before this file existed, every /api mutation and every /admin page was
 * publicly reachable — anyone could POST, PATCH, DELETE or upload files.
 *
 * Rules:
 *  - /admin/*        requires a session (except /admin/login)
 *  - /api/*          GET is public (the marketing site reads from it)
 *                    POST/PUT/PATCH/DELETE require a session
 *  - Exceptions      public form submissions: contacts, collaborations,
 *                    newsletter signup. These are POST-only and are the
 *                    whole point of the forms on the site.
 */

const PUBLIC_POST_ROUTES = [
  '/api/contacts',
  '/api/collaborations',
  '/api/newsletter',
  '/api/registrations',
  '/api/registrations/architect',
  '/api/registrations/sponsor',
  '/api/track-visitor',
  // Public payment flow: order creation is validated server-side;
  // the webhook authenticates via Cashfree HMAC signature instead.
  '/api/payments/create-order',
  '/api/payments/webhook',
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // --- admin pages ---
  if (pathname.startsWith('/admin')) {
    if (pathname.startsWith('/admin/login')) return NextResponse.next();
    if (!token) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // --- api ---
  if (pathname.startsWith('/api')) {
    if (pathname.startsWith('/api/auth')) return NextResponse.next();
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
      return NextResponse.next();
    }
    // exact match only: /api/newsletter/[id] DELETE stays protected
    if (method === 'POST' && PUBLIC_POST_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
