
import { supabase } from '@/integrations/supabase/client';
import type { Provider } from '@supabase/supabase-js';

/**
 * Signs in with Google OAuth
 */
export const handleSignInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  
  return { data, error };
};

/**
 * Signs in with Apple OAuth
 */
export const handleSignInWithApple = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  
  return { data, error };
};

/**
 * Signs in with email and password
 */
export const handleSignInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  return { data, error };
};

/**
 * Helper function to validate email format
 */
export const isEmailFormat = (input: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};

/**
 * Signs in with username and password by looking up the email first
 * Uses the username-lookup edge function to avoid RLS recursion
 */
export const handleSignInWithUsername = async (username: string, password: string) => {
  try {
    // Use the username-lookup edge function instead of direct query
    const { data: lookupData, error: lookupError } = await supabase.functions.invoke('username-lookup', {
      body: { username }
    });
    
    if (lookupError || !lookupData || lookupData.error) {
      console.error('Username lookup error:', lookupError || lookupData?.error);
      return { error: new Error(lookupData?.error || 'Invalid username or password') };
    }
    
    if (!lookupData.email) {
      return { error: new Error('User not found') };
    }
    
    // Sign in with the email and password
    return await handleSignInWithEmail(lookupData.email, password);
  } catch (error) {
    console.error('Sign in with username error:', error);
    return { error };
  }
};

/**
 * Signs up a new user with email, password and username
 */
export const handleSignUp = async (email: string, password: string, username: string) => {
  try {
    // Check if username is available
    const { data: existingUser, error: usernameError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle();
      
    if (existingUser) {
      return { error: new Error('Username is already taken') };
    }
    
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    return { data, error };
  } catch (error) {
    return { error };
  }
};

/**
 * Request a password reset email
 */
export const requestPasswordReset = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback`
  });
  
  return { data, error };
};

/**
 * Handles signing out
 */
export const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * Checks if a username is available
 */
export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
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
    
    return !data; // If no data is found, username is available
  } catch (error) {
    console.error('Username check error:', error);
    return false;
  }
};
