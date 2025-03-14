
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
    // Preserve the original username when sending to the edge function
    // This ensures we try all possible formats on the server side
    console.log(`Attempting sign in with username: ${username}`);
    
    // Try to find the email associated with this username
    const { data, error: lookupError } = await supabase.functions.invoke('username-lookup', {
      body: { username }
    });
    
    if (lookupError) {
      console.error('Username lookup error:', lookupError);
      return { 
        error: new Error(`Username lookup failed: ${lookupError.message}`) 
      };
    }
    
    if (!data || data.error) {
      console.error('Username lookup failed:', data?.error || 'No data returned');
      return { 
        error: new Error(data?.error || 'Username not found. Please check your username or register.') 
      };
    }
    
    if (!data.email) {
      console.error('No email found for username:', username);
      return {
        error: new Error('No email associated with this username. Please contact support.')
      };
    }
    
    console.log(`Found email for username ${username}, attempting login with email: ${data.email}`);
    
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
