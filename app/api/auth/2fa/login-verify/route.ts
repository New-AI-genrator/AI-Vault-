import { NextResponse } from 'next/server';
import { verifyTwoFactorAuthToken } from '@/lib/twoFactorAuth';
import { db } from '@/lib/db';
import { withValidation, schemas } from '@/lib/validation';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Validation schema for 2FA login verification
const loginVerify2FASchema = z.object({
  email: schemas.email,
  token: z.string().min(1, '2FA token is required')
}).strict();

// Helper function to verify backup codes
async function verifyBackupCode(backupCodes: string[] | undefined, token: string): Promise<boolean> {
  if (!backupCodes || backupCodes.length === 0) return false;
  
  for (const storedCode of backupCodes) {
    try {
      const isMatch = await bcrypt.compare(token, storedCode);
      if (isMatch) return true;
    } catch (error) {
      console.error('Error comparing backup code:', error);
      continue;
    }
  }
  return false;
}

// Helper function to set auth cookie
async function setAuthCookie(userId: string, response: NextResponse) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Create JWT token
    const token = jwt.sign(
      { userId },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Error setting auth cookie:', error);
    throw error;
  }
}

export const POST = withValidation(async (request: Request) => {
  try {
    // Validate request body
    const { email, token } = await request.json();
    
    // Get the user
    const user = await db.findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Authentication failed',
          message: 'Invalid email or password.' // Generic message for security
        },
        { status: 400 }
      );
    }

  // Check if 2FA is enabled for the user
  if (!user.twoFactorSecret) {
    return NextResponse.json(
      { 
        success: false,
        error: '2FA not enabled',
        message: 'Two-factor authentication is not enabled for this account.'
      },
      { status: 400 }
    );
  }

    // Verify the 2FA token
    const isTokenValid = verifyTwoFactorAuthToken(user.twoFactorSecret, token);
    
    // Check backup codes if primary token fails
    const isBackupCode = await verifyBackupCode(user.backupCodes, token);

    if (!isTokenValid && !isBackupCode) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid 2FA code',
          message: 'The provided 2FA code is invalid. Please try again.'
        },
        { status: 400 }
      );
    }

    // If a backup code was used, remove it
    if (!isTokenValid && isBackupCode && user.backupCodes) {
      const updatedBackupCodes = [];
      for (const storedCode of user.backupCodes) {
        const isMatch = await bcrypt.compare(token, storedCode);
        if (!isMatch) {
          updatedBackupCodes.push(storedCode);
        }
      }
      
      await db.updateUser(user.id, {
        backupCodes: updatedBackupCodes.length > 0 ? updatedBackupCodes : undefined
      } as any); // Type assertion needed due to type mismatch
    }

    // If we get here, the token is valid or a backup code was used
    // Remove sensitive data from user object before sending response
    const { password: _, twoFactorSecret: __, backupCodes: ___, ...userWithoutSensitiveInfo } = user as any;
    
    // Create a new response with success message and user data (without sensitive info)
    const response = NextResponse.json(
      { 
        success: true,
        message: 'Successfully authenticated with two-factor authentication.'
      },
      { status: 200 }
    );
    
    // Set the auth cookie and return the response
    return await setAuthCookie(user.id, response);
  } catch (error) {
    console.error('2FA login verification error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to verify two-factor authentication. Please try again.'
      },
      { status: 500 }
    );
  }
});
