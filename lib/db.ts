import { User } from '../types/user';

// In a production app, replace this with a real database connection
let users: User[] = [];

export const db = {
  // Find user by email
  async findUserByEmail(email: string): Promise<User | undefined> {
    return users.find(user => user.email === email);
  },
  
  // Find user by ID
  async findUserById(id: string): Promise<User | undefined> {
    return users.find(user => user.id === id);
  },
  
  // Create user
  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      isTwoFactorEnabled: userData.isTwoFactorEnabled || false,
      twoFactorSecret: userData.twoFactorSecret || '',
      backupCodes: userData.backupCodes || [],
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    return newUser;
  },
  
  // Update user
  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return undefined;
    
    users[userIndex] = { ...users[userIndex], ...updates };
    return users[userIndex];
  }
};
