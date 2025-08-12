import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifyTwoFactorAuthToken, generateBackupCodes } from '@/lib/twoFactorAuth';
import { db } from '@/lib/db';
import { validateBody, withValidation, schemas } from '@/lib/validation';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getCurrentUser } from '@/lib/auth';

// Validation schema for 2FA verification
const verify2FASchema = z.object({
  token: schemas.twoFactorCode,
});

const handler = withValidation(async (request: NextRequest) => {
  try {
    // Validate request body
    const { token } = await validateBody(verify2FASchema)(request);
    
    // Get the current user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Unauthorized',
          message: 'You must be signed in to verify 2FA.'
        },
        { status: 401 }
      );
    }

    // Check if 2FA is already enabled
    if (currentUser.isTwoFactorEnabled) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Bad Request',
          message: 'Two-factor authentication is already enabled.'
        },
        { status: 400 }
      );
    }

    // Get the 2FA secret from the cookie
    const twoFactorCookie = cookies().get('2fa_secret');
    if (!twoFactorCookie?.value) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Bad Request',
          message: '2FA setup session expired. Please try setting up 2FA again.'
        },
        { status: 400 }
      );
    }

    // Verify the token
    const isTokenValid = verifyTwoFactorAuthToken(twoFactorCookie.value, token);
    if (!isTokenValid) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid Token',
          message: 'The verification code is invalid. Please try again.'
        },
        { status: 400 }
      );
    }

    // Generate backup codes
    const backupCodes = generateBackupCodes();
    const hashedBackupCodes = await Promise.all(
      backupCodes.map(code => bcrypt.hash(code, 10))
    );

    // Update user with 2FA enabled and save backup codes
    await db.updateUser(currentUser.id, {
      isTwoFactorEnabled: true,
      twoFactorSecret: twoFactorCookie.value,
      backupCodes: hashedBackupCodes
    });

    // Create success response
    const response = NextResponse.json({
      success: true,
      message: 'Two-factor authentication has been enabled successfully.',
      backupCodes: backupCodes // Send plain text backup codes to the client once
    });

    // Clear the 2FA setup cookie
    response.cookies.set({
      name: '2fa_secret',
      value: '',
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const
    });
    
    return response;
  } catch (error) {
    console.error('2FA verification error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to verify 2FA. Please try again.'
      },
      { status: 500 }
    );
  }
});

export { handler as POST };
