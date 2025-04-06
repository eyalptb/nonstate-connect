
import { createContext } from 'react';

export interface User {
  id: string;
  email?: string | null;
  username?: string | null;
  name?: string | null;
  roles?: string[];
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signOut: () => Promise<{ success: boolean; error?: Error }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: Error }>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: Error }>;
}

// Create the context with a default undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
