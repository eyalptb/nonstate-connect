
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

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Auth state changed:", _event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Use setTimeout to avoid potential auth state deadlocks
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
            checkUserRole(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Then check for an existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
        checkUserRole(session.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    console.log("Fetching profile for user:", userId);
    const profileData = await fetchUserProfile(userId);
    if (profileData) {
      console.log("Profile fetched successfully:", profileData);
      setProfile(profileData);
    } else {
      console.log("No profile found for user:", userId);
    }
  };

  const checkUserRole = async (userId: string) => {
    const hasAdminRole = await checkUserAdminRole(userId);
    setIsAdmin(hasAdminRole);
  };

  const refreshProfile = async () => {
    if (user) {
      console.log("Refreshing profile for user:", user.id);
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
    console.log("Auth context: Signing in with email:", email);
    return handleSignInWithEmail(email, password);
  };

  const signInWithUsername = async (username: string, password: string) => {
    console.log("Auth context: Signing in with username:", username);
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
