import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { generateTwoFactorAuthSecret } from '@/lib/twoFactorAuth';
import { db } from '@/lib/db';

export async function POST() {
  try {
    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Generate 2FA secret and QR code
    const secret = await generateTwoFactorAuthSecret(
      user.email,
      'AI Tools Directory' // Your app name
    );

    // Store the secret in the user's session (not in the DB yet)
    const response = NextResponse.json({
      secret: secret.base32,
      qrCode: secret.qrCode,
      otpauth_url: secret.otpauth_url
    });

    // Store the secret in an httpOnly cookie (temporary, until verified)
    response.cookies.set('temp_2fa_secret', secret.base32, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 10, // 10 minutes to complete setup
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('2FA setup error:', error);
    return NextResponse.json(
      { error: 'Failed to set up 2FA' },
      { status: 500 }
    );
  }
}
