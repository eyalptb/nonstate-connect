
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

// Add a proper user type with id for TypeScript
type User = {
  id: string;
  name?: string;
  email?: string;
  username?: string;
};

// Updated context with non-null user id
type AuthContextType = {
  loading: boolean;
  user: User | null;
  isAdmin: boolean;
  signIn: (credentials: { identifier: string; password: string }) => Promise<{ error: Error | null }>;
  signUp: (data: { email: string; password: string; username?: string }) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  checkUsernameAvailability: (username: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>({
  loading: false,
  user: null,
  isAdmin: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  signOut: async () => {},
  checkUsernameAvailability: async () => false
});

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
          };
          
          setUser(userData);
          
          // Check if user is admin using a separate function to avoid recursion
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
        } else {
          setUser(null);
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
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
      
      setLoading(false);
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email or username and password
  const signIn = async ({ identifier, password }: { identifier: string; password: string }) => {
    try {
      setLoading(true);
      
      let email = identifier;
      
      // Check if identifier is a username rather than email
      if (!identifier.includes('@')) {
        const { data, error: usernameError } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', identifier)
          .maybeSingle();
        
        if (usernameError || !data) {
          return { error: new Error('Invalid username or password') };
        }
        
        // Get the user's email from auth.users using admin functions via edge function
        const { data: userData, error: userError } = await supabase.functions.invoke('auth-get-user-email', {
          body: { userId: data.id }
        });
        
        if (userError || !userData?.email) {
          return { error: new Error('Failed to retrieve user information') };
        }
        
        email = userData.email;
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          toast.error('Please confirm your email before signing in.');
        } else {
          toast.error('Invalid login credentials');
        }
        return { error };
      }
      
      toast.success('Signed in successfully');
      navigate('/dashboard');
      return { error: null };
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Sign in error:', error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email, password, and optional username
  const signUp = async ({ email, password, username }: { email: string; password: string; username?: string }) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { username }
        }
      });
      
      if (error) {
        toast.error(error.message);
        return { error };
      }
      
      toast.success('Registration successful! Please check your email to confirm your account.');
      return { error: null };
    } catch (error) {
      toast.error('An unexpected error occurred during sign up');
      console.error('Sign up error:', error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        toast.error('Google sign in failed');
        console.error('Google sign in error:', error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Apple
  const signInWithApple = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        toast.error('Apple sign in failed');
        console.error('Apple sign in error:', error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Apple sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error('Sign out failed');
        console.error('Sign out error:', error);
        return;
      }
      
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('An unexpected error occurred during sign out');
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if username is available
  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .maybeSingle();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Username check error:', error);
        return false;
      }
      
      return !data; // If no data is returned, username is available
    } catch (error) {
      console.error('Username check error:', error);
      return false;
    }
  };

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
