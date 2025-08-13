import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get token from cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    // Verify token
    const decoded = verify(token, JWT_SECRET) as { userId: string };

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      // Clear invalid token
      res.setHeader(
        'Set-Cookie',
        'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'
      );
      return res.status(401).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Auth check error:', error);
    // Clear invalid token
    res.setHeader(
      'Set-Cookie',
      'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'
    );
    return res.status(401).json({ error: 'Invalid token' });
  }
}