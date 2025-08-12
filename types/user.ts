export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // This will store the hashed password
  isTwoFactorEnabled: boolean;
  twoFactorSecret?: string; // Base32 encoded secret
  backupCodes?: string[]; // Hashed backup codes
  createdAt: string;
  updatedAt?: string;
}

export type UserWithoutPassword = Omit<User, 'password'>;
