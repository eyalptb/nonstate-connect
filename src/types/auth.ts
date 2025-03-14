
import { Session, User } from '@supabase/supabase-js';

export type ProfileType = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  blockchain_did: string | null;
  created_at?: string;
  updated_at?: string;
};

export type UserRoleType = 'admin' | 'user';

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: ProfileType | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithUsername: (username: string, password: string) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
};
