import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Common validation schemas
export const schemas = {
  email: z.string().email('Invalid email format').min(5).max(255).trim(),
  password: z.string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  name: z.string().min(2).max(100).trim(),
  twoFactorCode: z.string().length(6, 'Code must be 6 digits').regex(/^\d+$/, 'Code must contain only numbers'),
  backupCode: z.string().length(12, 'Backup code must be 12 characters').regex(/^[A-Z0-9]+$/, 'Invalid backup code format'),
};

// Validation error response
class ValidationError extends Error {
  status: number;
  errors: Record<string, string[]>;

  constructor(errors: Record<string, string[]>) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.status = 400;
    this.errors = errors;
  }
}

// Validate request body against schema
export function validateBody<T extends z.ZodTypeAny>(schema: T) {
  return async (req: NextRequest) => {
    try {
      const body = await req.json();
      const result = await schema.safeParseAsync(body);
      
      if (!result.success) {
        const errors: Record<string, string[]> = {};
        
        result.error.issues.forEach((issue) => {
          const path = issue.path.join('.');
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(issue.message);
        });
        
        throw new ValidationError(errors);
      }
      
      return result.data as z.infer<typeof schema>;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new ValidationError({ _: ['Invalid JSON body'] });
      }
      throw error;
    }
  };
}

// Validate query parameters against schema
export function validateQuery<T extends z.ZodTypeAny>(schema: T) {
  return (req: NextRequest) => {
    const query = Object.fromEntries(req.nextUrl.searchParams);
    const result = schema.safeParse(query);
    
    if (!result.success) {
      const errors: Record<string, string[]> = {};
      
      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message);
      });
      
      throw new ValidationError(errors);
    }
    
    return result.data as z.infer<typeof schema>;
  };
}

// Error handler for API routes
export function withValidation(handler: (req: NextRequest, ...args: any) => Promise<NextResponse>) {
  return async (req: NextRequest, ...args: any) => {
    try {
      return await handler(req, ...args);
    } catch (error) {
      if (error instanceof ValidationError) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Validation failed',
            errors: error.errors 
          },
          { status: error.status }
        );
      }
      
      console.error('Validation error:', error);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'An unexpected error occurred',
          message: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  };
}

// Helper to validate API keys
export function validateApiKey(apiKey: string | null) {
  if (!apiKey) {
    throw new ValidationError({ apiKey: ['API key is required'] });
  }
  
  // In production, validate against your actual API keys
  if (process.env.NODE_ENV === 'production') {
    const validKeys = process.env.API_KEYS?.split(',') || [];
    if (!validKeys.includes(apiKey)) {
      throw new ValidationError({ apiKey: ['Invalid API key'] });
    }
  }
  
  return true;
}
