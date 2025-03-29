
import React, { createContext } from 'react';

// Add a proper user type with id for TypeScript
type User = {
  id: string;
  name?: string;
  email?: string;
};

// Updated context with non-null user id
type AuthContextType = {
  loading: boolean;
  user: User | null;
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
  // Mock user with id for development
  const dummyUser = { id: "dummy-user-id" };
  
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
