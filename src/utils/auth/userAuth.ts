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

export const handleSignInWithUsername = async (username: string, password: string) => {
  try {
    console.log(`Attempting sign in with username: ${username}`);
    
    // Check if the input is actually an email (user might have typed an email in username field)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(username)) {
      return handleSignInWithEmail(username, password);
    }
    
    // First try with the actual email we created in the database
    // This is for users we created manually with SQL
    const knownEmails = [
      `${username}@example.com`,
    ];
    
    console.log('Trying direct email formats:', knownEmails);
    
    for (const email of knownEmails) {
      console.log(`Attempting login with known format: ${email}`);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (!error) {
        console.log('Login successful with format:', email);
        return { error: null };
      }
      
      console.log(`Login failed with format ${email}:`, error);
    }

    // Fall back to the previous formats if the known formats don't work
    const formats = [
      `${username.trim().toLowerCase()}@username.local`,
      `${username.trim()}@username.local`,
      `user_${username.trim().toLowerCase()}@username.local`
    ];
    
    console.log('Trying username login with formats:', formats);
    
    for (const emailFormat of formats) {
      console.log(`Attempting login with format: ${emailFormat}`);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailFormat,
        password,
      });
      
      if (!error) {
        console.log('Login successful with format:', emailFormat);
        return { error: null };
      }
      
      console.log(`Login failed with format ${emailFormat}:`, error);
    }
    
    console.error('All username login formats failed');
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
