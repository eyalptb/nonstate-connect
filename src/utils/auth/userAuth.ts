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
    console.log(`Attempting to sign in with username: "${username}"`);
    
    // Normalize the username by trimming whitespace
    const normalizedUsername = username.trim();
    console.log(`Normalized username: "${normalizedUsername}"`);
    
    // Use the username-lookup edge function
    console.log(`Calling username-lookup edge function with normalized username`);
    const { data: lookupData, error: lookupError } = await supabase.functions.invoke('username-lookup', {
      body: { username: normalizedUsername }
    });
    
    console.log('Edge function response:', lookupData, lookupError);
    
    if (lookupError) {
      console.error('Username lookup error from edge function:', lookupError);
      return { error: new Error(`Username lookup failed: ${lookupError.message}`) };
    }
    
    if (!lookupData || lookupData.error) {
      console.error('Username not found or other error:', lookupData?.error);
      return { error: new Error(lookupData?.error || 'Invalid username or password') };
    }
    
    if (!lookupData.email) {
      console.error('No email returned for username');
      return { error: new Error('User not found') };
    }
    
    console.log(`Username lookup successful, found email: ${lookupData.email}`);
    
    // Sign in with the email and password
    console.log('Attempting sign in with email and password');
    const signInResult = await handleSignInWithEmail(lookupData.email, password);
    
    if (signInResult.error) {
      console.error('Sign in with email failed:', signInResult.error);
      return { error: new Error('Invalid username or password') };
    }
    
    console.log('Sign in successful');
    return signInResult;
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
    // Normalize the username by trimming whitespace
    const normalizedUsername = username.trim();
    console.log(`Signing up with normalized username: "${normalizedUsername}"`);
    
    // Check if username is available (case-insensitive)
    const { data: existingUser, error: usernameError } = await supabase
      .from('profiles')
      .select('id')
      .ilike('username', normalizedUsername)
      .maybeSingle();
      
    if (existingUser) {
      console.error(`Username "${normalizedUsername}" is already taken`);
      return { error: new Error('Username is already taken') };
    }
    
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: normalizedUsername },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    return { data, error };
  } catch (error) {
    console.error('Sign up error:', error);
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
    // Normalize the username by trimming whitespace
    const normalizedUsername = username.trim();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .ilike('username', normalizedUsername)
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
