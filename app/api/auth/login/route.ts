import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // If 2FA is enabled, return a response indicating 2FA is required
    if (user.isTwoFactorEnabled) {
      // Create a temporary token for 2FA verification
      const tempToken = sign(
        { 
          userId: user.id,
          email: user.email,
          purpose: '2fa_verification' 
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '5m' } // Short expiration for security
      );

      // Set temporary token in an httpOnly cookie
      const response = NextResponse.json(
        { 
          requires2FA: true,
          email: user.email,
          tempToken
        },
        { status: 202 } // 202 Accepted - requires 2FA
      );

      response.cookies.set('2fa_temp_token', tempToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 300, // 5 minutes
        path: '/',
      });

      return response;
    }

    // If 2FA is not enabled, proceed with normal login
    const { password: _, twoFactorSecret: __, backupCodes: ___, ...userWithoutSensitiveInfo } = user;
    
    // Create JWT token
    const token = sign(
      { 
        id: user.id,
        email: user.email,
        name: user.name,
        isTwoFactorEnabled: false
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Set the auth cookie
    const response = NextResponse.json({ 
      user: userWithoutSensitiveInfo,
      requires2FA: false
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
