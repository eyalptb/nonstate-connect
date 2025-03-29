
import React, { createContext, useState } from 'react';

// Simplified context with dummy auth functionality
type AuthContextType = {
  loading: boolean;
  user: { id: string } | null; // Updated to allow null
  isAdmin: boolean;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  loading: false,
  user: null,
  isAdmin: false,
  signOut: () => console.log('Sign out function called - does nothing currently')
});

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading] = useState(false);

  // Dummy sign out function
  const signOut = () => {
    console.log('Sign out function called - does nothing currently');
  };

  const value = {
    loading,
    user: { id: 'dummy-user-id' }, // Dummy user with id
    isAdmin: false,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
