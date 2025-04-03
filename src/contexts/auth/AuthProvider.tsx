
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext, User } from './types';
import { useAuthMethods } from './useAuthMethods';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const {
    signIn,
    signUp,
    signInWithGoogle,
    signInWithApple,
    signOut,
    checkUsernameAvailability
  } = useAuthMethods({ setLoading, navigate });

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
          navigate('/');
        } else if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
          };
          
          setUser(userData);
          
          // Check if user is admin using a separate function to avoid recursion
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role, username')
              .eq('id', session.user.id)
              .single();
            
            if (profile) {
              setUser(prev => ({ 
                ...prev!, 
                username: profile.username 
              }));
              setIsAdmin(profile.role === 'admin');
            } else {
              setIsAdmin(false);
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
            setIsAdmin(false);
          }
        } else {
          setUser(null);
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
          };
          
          setUser(userData);
          
          // Check if user is admin
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, username')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser(prev => ({ 
              ...prev!, 
              username: profile.username 
            }));
            setIsAdmin(profile.role === 'admin');
          } else {
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const value = {
    loading,
    user,
    isAdmin,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithApple,
    signOut,
    checkUsernameAvailability
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
