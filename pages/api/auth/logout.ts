import { NextApiRequest, NextApiResponse } from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const DOMAIN = isProduction ? '.yourdomain.com' : 'localhost';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Clear the token cookie
    res.setHeader(
      'Set-Cookie',
      `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; ${
        isProduction ? 'Secure; ' : ''
      }SameSite=${isProduction ? 'none' : 'lax'}${
        isProduction ? `; Domain=${DOMAIN}` : ''
      }`
    );

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}