
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
    console.log(`Attempting sign in with username: "${username}"`);
    
    // Call the edge function to lookup the email for this username
    const { data, error: functionError } = await supabase.functions.invoke('username-lookup', {
      body: { username }
    });
    
    console.log('Username lookup response:', data);
    
    if (functionError) {
      console.error('Username lookup function error:', functionError);
      return { error: new Error(`Username lookup failed: ${functionError.message}`) };
    }
    
    // Check if there's an error message in the response
    if (data && data.error) {
      console.error('Username lookup failed:', data.error);
      return { error: new Error(data.error) };
    }
    
    if (!data || !data.email) {
      console.error('No email found for username:', username);
      return {
        error: new Error('Username not found. Please check your username or register.')
      };
    }
    
    console.log(`Found email for username: "${username}", attempting login with email: ${data.email}`);
    
    // Now sign in with the email
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password,
    });
    
    if (loginError) {
      console.error('Login failed with looked up email:', loginError);
      return { error: new Error('Incorrect password. Please try again.') };
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
