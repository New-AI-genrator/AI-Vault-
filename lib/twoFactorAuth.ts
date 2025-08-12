import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export interface TwoFactorAuthSecret {
  base32: string;
  otpauth_url: string;
  qrCode: string;
}

export async function generateTwoFactorAuthSecret(email: string, issuer: string): Promise<TwoFactorAuthSecret> {
  // Generate a secret
  const secret = speakeasy.generateSecret({
    name: `${issuer}:${email}`,
    length: 20
  });

  // Generate QR code
  const qrCode = await QRCode.toDataURL(secret.otpauth_url || '');

  return {
    base32: secret.base32,
    otpauth_url: secret.otpauth_url || '',
    qrCode
  };
}

export function verifyTwoFactorAuthToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1 // Allow tokens from the previous and next 30-second window
  });
}

export function generateBackupCodes(count = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    codes.push(
      Array.from(
        { length: 8 },
        () => Math.floor(Math.random() * 16).toString(16)
      ).join('').toUpperCase()
    );
  }
  return codes;
}
