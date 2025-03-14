
import React, { createContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthContextType, ProfileType } from '@/types/auth';
import { 
  fetchUserProfile, 
  checkUserAdminRole,
  handleSignInWithGoogle,
  handleSignInWithEmail,
  handleSignInWithUsername,
  handleSignOut
} from '@/utils/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        checkUserRole(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
          checkUserRole(session.user.id);
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    const profileData = await fetchUserProfile(userId);
    if (profileData) {
      setProfile(profileData);
    }
  };

  const checkUserRole = async (userId: string) => {
    const hasAdminRole = await checkUserAdminRole(userId);
    setIsAdmin(hasAdminRole);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
      await checkUserRole(user.id);
    }
  };

  const signOut = async () => {
    await handleSignOut();
    setProfile(null);
    setIsAdmin(false);
    toast.success("Successfully logged out");
  };

  const signInWithGoogle = async () => {
    return handleSignInWithGoogle();
  };

  const signInWithEmail = async (email: string, password: string) => {
    return handleSignInWithEmail(email, password);
  };

  const signInWithUsername = async (username: string, password: string) => {
    return handleSignInWithUsername(username, password);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isAdmin,
        loading,
        signOut,
        signInWithGoogle,
        signInWithEmail,
        signInWithUsername,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export { useAuth } from '@/hooks/useAuth';
