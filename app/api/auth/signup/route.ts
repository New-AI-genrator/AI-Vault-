import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Input validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await db.createUser({
      name,
      email,
      password: hashedPassword,
      isTwoFactorEnabled: false, // Default to false for new users
      twoFactorSecret: undefined, // Will be set up later if 2FA is enabled
      backupCodes: [] // Initialize empty array for backup codes
    });

    // Create token
    const { password: _, ...userWithoutPassword } = newUser;
    const token = await createToken({
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
      name: userWithoutPassword.name,
      isTwoFactorEnabled: userWithoutPassword.isTwoFactorEnabled || false,
      twoFactorSecret: userWithoutPassword.twoFactorSecret,
      backupCodes: userWithoutPassword.backupCodes,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt || new Date().toISOString()
    });

    // Create response
    const response = NextResponse.json(
      { user: userWithoutPassword },
      { status: 201 }
    );
    
    // Set the auth cookie in the response
    await setAuthCookie(token);
    
    return response;

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
