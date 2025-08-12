import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Allowed origins (update these in production)
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://your-production-domain.com',
];

// Allowed methods
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

// Allowed headers
const ALLOWED_HEADERS = [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'X-CSRF-Token',
  'X-Api-Key',
];

// CORS middleware
export function corsMiddleware(request: NextRequest) {
  // Get the origin from the request
  const origin = request.headers.get('origin');
  
  // Always allow requests with no origin (like mobile apps or curl requests)
  if (!origin) {
    return null;
  }

  // Check if the origin is allowed
  const isAllowedOrigin = 
    process.env.NODE_ENV === 'development' || 
    ALLOWED_ORIGINS.includes(origin) ||
    origin.endsWith('.yourdomain.com'); // Allow subdomains

  if (!isAllowedOrigin) {
    return new NextResponse('Not allowed by CORS', { status: 403 });
  }

  // For preflight requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 }); // No content
    
    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', ALLOWED_METHODS.join(', '));
    response.headers.set('Access-Control-Allow-Headers', ALLOWED_HEADERS.join(', '));
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours
    
    return response;
  }

  // For actual requests
  const response = NextResponse.next();
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Expose-Headers', 'X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset');
  
  // Add Vary header for caching
  response.headers.set('Vary', 'Origin');
  
  return response;
}

// Helper to wrap API routes with CORS
export function withCors(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    // Handle CORS
    const corsResponse = corsMiddleware(req);
    if (corsResponse) {
      return corsResponse;
    }
    
    // Call the original handler
    return handler(req);
  };
}
