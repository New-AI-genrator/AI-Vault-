import { NextRequest, NextResponse } from 'next/server';
import { doubleCsrf } from 'csrf-csrf';

const csrfSecret = process.env.CSRF_SECRET || 'your-csrf-secret';

const {
  invalidCsrfTokenError, // This is just for convenience if you don't want to write "new Error('invalid csrf token')
  generateToken, // Use this in your routes to generate a form token with <input name="_csrf" type="hidden" value="<%= csrfToken %>" />
  validateRequest, // Also a convenience function
  doubleCsrfProtection, // The default CSRF protection middleware
} = doubleCsrf({
  getSecret: () => csrfSecret,
  cookieName: 'x-csrf-token',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getTokenFromRequest: (req: NextRequest) => {
    return req.headers.get('x-csrf-token') || req.nextUrl.searchParams.get('_csrf') || '';
  },
});

export { generateToken, validateRequest, doubleCsrfProtection, invalidCsrfTokenError };
