import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { withValidation } from '@/lib/validation';
import { z } from 'zod';

// Validation schema for 2FA disable request
const disable2FASchema = z.object({
  // No request body needed for this endpoint, but keeping the pattern consistent
}).strict();

const handler = withValidation(async () => {
  // Get current user
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Unauthorized',
        message: 'You must be signed in to disable 2FA.'
      },
      { status: 401 }
    );
  }

  // Check if 2FA is already disabled
  if (!user.isTwoFactorEnabled) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Bad Request',
        message: 'Two-factor authentication is already disabled.'
      },
      { status: 400 }
    );
  }

  try {
    // Disable 2FA for the user by setting appropriate values
    await db.updateUser(user.id, {
      isTwoFactorEnabled: false,
      twoFactorSecret: undefined, // This will be set to null in the database
      backupCodes: undefined     // This will be set to null in the database
    } as any); // Temporary type assertion to bypass TypeScript error

    return NextResponse.json({ 
      success: true,
      message: 'Two-factor authentication has been disabled successfully.'
    });
  } catch (error) {
    console.error('2FA disable error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to disable two-factor authentication. Please try again.'
      },
      { status: 500 }
    );
  }
});

export const POST = handler;
