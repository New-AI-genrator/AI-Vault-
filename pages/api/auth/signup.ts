import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create JWT token
    const token = sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set HTTP-only cookie
    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`
    );

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
