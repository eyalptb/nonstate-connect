
import React, { createContext, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { ProfileType } from '@/types/auth';

// Simplified auth context while we rebuild
type AuthContextType = {
  user: User | null;
  profile: ProfileType | null;
  loading: boolean;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // For now, we'll use a simple state without actual auth logic
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // We'll rebuild this component later with proper auth

  const value = {
    user,
    profile,
    loading,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
