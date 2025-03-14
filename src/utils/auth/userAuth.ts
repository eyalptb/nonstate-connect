
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
    
    // Re-check if the input is actually an email (user might have typed an email in username field)
    if (isEmailFormat(username)) {
      console.log('Input appears to be an email, redirecting to email login flow');
      return handleSignInWithEmail(username, password);
    }
    
    // Try with a standardized email format for username login
    const userEmail = `${username.trim().toLowerCase()}@collabcoin.app`;
    console.log(`Trying username login with format: ${userEmail}`);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password,
    });
    
    if (!error) {
      console.log('Login successful with format:', userEmail);
      return { error: null };
    }
    
    console.log(`Login failed with format ${userEmail}:`, error);
    return { 
      error: new Error('Invalid username or password. Please check your credentials and try again.') 
    };
  } catch (error) {
    console.error('Error signing in with username:', error);
    return { error: error as Error };
  }
};

export const handleSignOut = async () => {
  return await supabase.auth.signOut();
};
