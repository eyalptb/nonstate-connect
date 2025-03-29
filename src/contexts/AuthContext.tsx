
import React, { createContext, useState } from 'react';
import { ProfileType } from '@/types/auth';

// Expanded context with dummy auth functionality
type AuthContextType = {
  loading: boolean;
  user: null; // Always null for now
  isAdmin: boolean; // Always false for now
  signOut: () => void; // Dummy function
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
  const [loading, setLoading] = useState(false);

  // Dummy sign out function
  const signOut = () => {
    console.log('Sign out function called - does nothing currently');
  };

  const value = {
    loading,
    user: null, // Always null for now
    isAdmin: false, // Always false for now
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
