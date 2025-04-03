import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type AuthMethodsProps = {
  setLoading: (loading: boolean) => void;
  navigate: (path: string) => void;
};

export const useAuthMethods = ({ setLoading, navigate }: AuthMethodsProps) => {
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
        console.error('Sign out error:', error);
        toast.error('Sign out failed');
        throw error;
      }
      
      // Don't navigate here - let the auth state change handler handle it
      // The navigation will be handled by the onAuthStateChange in AuthProvider
      
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error as Error };
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

  return {
    signIn,
    signUp,
    signInWithGoogle,
    signInWithApple,
    signOut,
    checkUsernameAvailability
  };
};
