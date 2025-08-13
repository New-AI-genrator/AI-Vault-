import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;
const isProduction = process.env.NODE_ENV === 'production';
const DOMAIN = isProduction ? '.yourdomain.com' : 'localhost';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie with Vercel-compatible settings
    res.setHeader(
      'Set-Cookie',
      	oken=;  +
      HttpOnly;  +
      Path=/;  +
      Max-Age=;  +
      ${isProduction ? 'Secure; ' : ''} +
      SameSite= +
      ${isProduction ? ; Domain= : ''}
    );

    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
