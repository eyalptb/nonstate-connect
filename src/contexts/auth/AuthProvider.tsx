// Keep the first line as-is to avoid overwriting imports
import React, { createContext, useEffect, useState } from 'react';
import { AuthContext } from './types';
import type { User, AuthContextType } from './types';
import { useAuthMethods } from './useAuthMethods';
import { useNavigate } from 'react-router-dom';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("AuthProvider initializing"); // Debug log
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const { 
    signIn, 
    signUp, 
    signOut, 
    resetPassword, 
    updateProfile,
    deleteAccount,
    getUser,
    loading: authMethodsLoading
  } = useAuthMethods();
  
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log("Initializing auth state"); // Debug log
        const userData = await getUser();
        if (userData) {
          setUser(userData);
          setIsAdmin(userData.roles?.includes('admin') || false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, [getUser]);
  
  // Create an object with the properly typed methods
  const signInWithEmail = async (email: string, password: string) => {
    const result = await signIn({ identifier: email, password });
    return { success: !result.error, error: result.error };
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const result = await signUp({ email, password });
    return { success: !result.error, error: result.error };
  };
  
  const authContext: AuthContextType = {
    user,
    loading: loading || authMethodsLoading,
    isAdmin,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    resetPassword,
    updateProfile,
  };
  
  console.log("Auth state:", { user: user?.id || "none", loading, isAdmin }); // Debug log
  
  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
