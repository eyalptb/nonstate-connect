
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
 */
export const handleSignInWithUsername = async (username: string, password: string) => {
  try {
    // First, get the user ID from the username
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle();
      
    if (profileError || !profileData) {
      return { error: new Error('Invalid username or password') };
    }
    
    // Then get the user's email using their ID
    // This requires admin privileges, so it's better to use a serverless function
    // in a real-world scenario
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(profileData.id);
    
    if (userError || !userData?.user?.email) {
      return { error: new Error('User not found') };
    }
    
    // Finally, sign in with the email and password
    return await handleSignInWithEmail(userData.user.email, password);
  } catch (error) {
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
