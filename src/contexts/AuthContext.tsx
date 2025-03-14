
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type ProfileType = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  blockchain_did: string | null;
  created_at?: string;
  updated_at?: string;
};

type UserRoleType = 'admin' | 'user';

type AuthContextType = {
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize authentication state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        checkUserRole(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
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
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data as ProfileType);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const checkUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }

      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
      await checkUserRole(user.id);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setIsAdmin(false);
    toast.success("Successfully logged out");
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) {
        console.error('Error signing in with Google:', error);
        return { error: error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Error signing in with Google:', error);
      return { error: error as Error };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error: error };
    } catch (error) {
      console.error('Error signing in with email:', error);
      return { error: error as Error };
    }
  };

  const signInWithUsername = async (username: string, password: string) => {
    try {
      // First, we need to check if the input is actually an email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(username);
      
      if (isEmail) {
        // If it's an email, use the email login method
        return signInWithEmail(username, password);
      }
      
      // If it's not an email, we assume it's a username
      // IMPORTANT: Trim the username to remove any spaces
      const cleanUsername = username.trim();
      
      const { error } = await supabase.auth.signInWithPassword({
        email: `${cleanUsername}@username.local`, // Clean username in the email format
        password,
      });
      return { error: error };
    } catch (error) {
      console.error('Error signing in with username:', error);
      return { error: error as Error };
    }
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
