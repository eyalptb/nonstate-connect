
import React, { createContext } from 'react';

// Simplified context with no authentication functionality
type AuthContextType = {
  loading: boolean;
  user: null;
  isAdmin: boolean;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  loading: false,
  user: null,
  isAdmin: false,
  signOut: () => {}
});

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {
    loading: false,
    user: null,
    isAdmin: false,
    signOut: () => {}
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
