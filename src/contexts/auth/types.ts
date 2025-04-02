
import { createContext } from 'react';

// Add a proper user type with id for TypeScript
export type User = {
  id: string;
  name?: string;
  email?: string;
  username?: string;
};

// Updated context with non-null user id
export type AuthContextType = {
  loading: boolean;
  user: User | null;
  isAdmin: boolean;
  signIn: (credentials: { identifier: string; password: string }) => Promise<{ error: Error | null }>;
  signUp: (data: { email: string; password: string; username?: string }) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  checkUsernameAvailability: (username: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>({
  loading: false,
  user: null,
  isAdmin: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  signOut: async () => {},
  checkUsernameAvailability: async () => false
});
