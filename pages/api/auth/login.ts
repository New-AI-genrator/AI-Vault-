// Simple type definitions to avoid TypeScript errors
type NextApiRequest = {
  method?: string;
  body?: any;
  query: { [key: string]: string | string[] | undefined };
  cookies: { [key: string]: string };
  headers: { [key: string]: string | string[] | undefined };
};

type NextApiResponse = {
  status: (statusCode: number) => NextApiResponse;
  json: (body: any) => void;
  setHeader: (name: string, value: string | string[]) => void;
  end: () => void;
};

// @ts-ignore - Bypassing type checking for bcryptjs
import { compare } from 'bcryptjs';
// @ts-ignore - Bypassing type checking for jsonwebtoken
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

type LoginRequest = {
  email: string;
  password: string;
};

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
      `token=${token}; ` +
      'HttpOnly; ' +
      'Path=/; ' +
      `Max-Age=${process.env.SESSION_EXPIRY || 86400}; ` +
      `${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}` +
      'SameSite=Lax' +
      `${process.env.NODE_ENV === 'production' ? '; Domain=yourdomain.com' : ''}`
    );

    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
