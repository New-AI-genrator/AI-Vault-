import { NextRequest, NextResponse } from 'next/server';
import { doubleCsrf } from 'csrf-csrf';

const csrfSecret = process.env.CSRF_SECRET || 'your-csrf-secret';

// Create CSRF protection utilities
const {
  invalidCsrfTokenError,
  generateCsrfToken,
  validateRequest,
  doubleCsrfProtection,
} = doubleCsrf({
  getSecret: () => csrfSecret,
  // Generate a session identifier - required for v4.0.3+
  getSessionIdentifier: (req: NextRequest) => {
    // Use the user's IP address as a fallback session identifier
    return req.headers.get('x-forwarded-for') || 'default-session';
  },
  // Name of the cookie to be used
  cookieName: 'x-csrf-token',
  // Cookie options
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  },
  // Token size in bytes
  size: 64,
  // HTTP methods that don't require CSRF protection
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  // How to get the token from the request
  getCsrfTokenFromRequest: (req: NextRequest) => {
    return req.headers.get('x-csrf-token') || req.nextUrl.searchParams.get('_csrf') || '';
  },
});

// Re-export the utilities with consistent naming
export { 
  generateCsrfToken as generateToken, 
  validateRequest,
  invalidCsrfTokenError,
  doubleCsrfProtection,
};
