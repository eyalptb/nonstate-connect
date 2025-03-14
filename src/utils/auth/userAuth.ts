
import { supabase } from '@/integrations/supabase/client';

export const handleSignInWithGoogle = async () => {
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

export const handleSignInWithEmail = async (email: string, password: string) => {
  try {
    console.log(`Attempting to sign in with email: ${email}`);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Email login error:', error);
      return { error };
    }
    
    console.log('Login successful:', data.user?.email);
    return { error: null };
  } catch (error) {
    console.error('Error signing in with email:', error);
    return { error: error as Error };
  }
};

export const isEmailFormat = (input: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};

export const handleSignInWithUsername = async (username: string, password: string) => {
  try {
    console.log(`Attempting sign in with username: ${username}`);
    
    // First, we need to find the email associated with this username
    const { data, error } = await supabase.functions.invoke('username-lookup', {
      body: { username }
    });
    
    if (error || !data || data.error) {
      console.error('Username lookup failed:', error || data?.error);
      return { 
        error: new Error('Invalid username or password. Please check your credentials and try again.') 
      };
    }
    
    console.log(`Found email for username ${username}, attempting login`);
    
    // Now try to sign in with the email we found
    const loginResult = await supabase.auth.signInWithPassword({
      email: data.email,
      password,
    });
    
    if (loginResult.error) {
      console.error('Login failed with looked up email:', loginResult.error);
      return { 
        error: new Error('Invalid username or password. Please check your credentials and try again.') 
      };
    }
    
    console.log('Login successful with username:', username);
    return { error: null };
  } catch (error) {
    console.error('Error signing in with username:', error);
    return { error: error as Error };
  }
};

export const handleSignOut = async () => {
  return await supabase.auth.signOut();
};
