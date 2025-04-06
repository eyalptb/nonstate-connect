
import { createContext } from 'react';

// Add a proper user type with id for TypeScript
export type User = {
  id: string;
  name?: string;
  email?: string;
  username?: string;
  avatar_url?: string;
  roles?: string[];
};

// Updated context with non-null user id
export type AuthContextType = {
  loading: boolean;
  user: User | null;
  isAdmin: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: any }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: any }>;
  signOut: () => Promise<{ success: boolean; error?: any }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: any }>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: any }>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
