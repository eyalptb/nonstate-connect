
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
    
    // Special handling for test user
    if (email.toLowerCase() === '016eyal@gmail.com') {
      console.log('Debug mode: Using special handling for test user email');
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          console.error('Test user email login error:', error);
          if (error.message?.includes('Invalid login credentials')) {
            return { error: new Error(`Incorrect password for test user. Try with password: jonnycat123`) };
          }
          return { error };
        }
        
        console.log('Test user email login successful');
        return { error: null };
      } catch (specialError) {
        console.error('Special handling error:', specialError);
        return { error: new Error('Could not process login. Please try again.') };
      }
    }
    
    // Regular email login
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
    // Trim any whitespace from the username
    const trimmedUsername = username.trim();
    console.log(`Attempting sign in with username: "${trimmedUsername}"`);
    
    // Special handling for test user 'jonnyCat' with case-insensitive check
    if (trimmedUsername.toLowerCase() === 'jonnycat') {
      console.log('Debug mode: Using test credentials for jonnyCat');
      
      // For this test user, we'll bypass the normal flow entirely
      const testEmail = '016eyal@gmail.com';
      
      try {
        // Direct login attempt with the known email
        console.log(`Attempting direct login for test user with email: ${testEmail}`);
        
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password,
        });
        
        if (loginError) {
          console.error('Login failed for test user jonnyCat:', loginError);
          
          // Handle specific error cases
          if (loginError.status === 500) {
            console.log('Server error occurred. Providing a user-friendly message.');
            return { error: new Error('Server error occurred. Please try again later or contact support.') };
          }
          
          if (loginError.message?.includes('Invalid login credentials')) {
            return { error: new Error('Incorrect password for jonnyCat. Please try with password: jonnycat123') };
          }
          
          // For any other errors
          return { error: new Error(`Login failed: ${loginError.message || 'Unknown error'}`) };
        }
        
        console.log('Login successful for test user jonnyCat');
        return { error: null };
      } catch (innerError) {
        console.error('Unexpected error in jonnyCat login handler:', innerError);
        return { error: new Error('An unexpected error occurred. Please try again later.') };
      }
    }
    
    // For regular users, continue with the username lookup flow
    try {
      // Call the edge function to lookup the email for this username
      console.log('Calling username-lookup edge function for:', trimmedUsername);
      
      const response = await fetch(`https://wnetelqsdbiacotgfxib.supabase.co/functions/v1/username-lookup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': (supabase as any).supabaseKey,
        },
        body: JSON.stringify({ username: trimmedUsername }),
      });
      
      console.log('Username lookup response status:', response.status);
      
      // Parse the response JSON
      const data = await response.json();
      console.log('Username lookup response data:', data);
      
      // Check if there's an error message in the response
      if (data && data.error) {
        console.error('Username lookup failed:', data.error);
        
        if (data.details?.includes('Database error')) {
          console.log('Database error detected, suggesting email login instead');
          return { error: new Error('Database connection issue. Please try logging in with your email instead.') };
        }
        
        // Check if the profiles table is empty (no users have set usernames)
        if (data.profilesExist === false) {
          return { error: new Error('Username login is not available yet. Please use email login instead.') };
        }
        
        return { error: new Error(data.error) };
      }
      
      if (!data || !data.email) {
        console.error('No email found for username:', trimmedUsername);
        return {
          error: new Error('Username not found. Please check your username or register.')
        };
      }
      
      console.log(`Found email for username: "${trimmedUsername}", attempting login with email: ${data.email}`);
      
      // Now sign in with the email
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password,
      });
      
      if (loginError) {
        console.error('Login failed with looked up email:', loginError);
        if (loginError.status === 500) {
          return { error: new Error('Server error occurred. Please try again with your email address instead.') };
        }
        return { error: new Error('Incorrect password. Please try again.') };
      }
      
      console.log('Login successful with username:', trimmedUsername);
      return { error: null };
    } catch (error) {
      console.error('Error in username lookup:', error);
      return { error: new Error('Failed to process username login. Please try with email instead.') };
    }
  } catch (error) {
    console.error('Error signing in with username:', error);
    return { error: error as Error };
  }
};

export const handleSignOut = async () => {
  return await supabase.auth.signOut();
};
