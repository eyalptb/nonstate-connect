
import { supabase } from '@/integrations/supabase/client';
import { ProfileType } from '@/types/auth';

export const fetchUserProfile = async (userId: string): Promise<ProfileType | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data as ProfileType;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const checkUserAdminRole = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (error) {
      console.error('Error fetching user role:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
};

export const getUserSessionAndProfile = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    return { session: null, profile: null, isAdmin: false };
  }
  
  const profile = await fetchUserProfile(session.user.id);
  const isAdmin = await checkUserAdminRole(session.user.id);
  
  return { session, profile, isAdmin };
};

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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Email login error:', error);
      return { error };
    }
    
    return { error: null };
  } catch (error) {
    console.error('Error signing in with email:', error);
    return { error: error as Error };
  }
};

export const handleSignInWithUsername = async (username: string, password: string) => {
  try {
    // Check if the input is actually an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(username);
    
    if (isEmail) {
      // If it's an email, use the email login method
      return handleSignInWithEmail(username, password);
    }
    
    // For username-based login, try multiple email formats
    // This is needed because Supabase auth doesn't natively support username login
    const formats = [
      // Try with lowercase username
      `${username.trim().toLowerCase()}@username.local`,
      // Try with original case
      `${username.trim()}@username.local`,
      // Try with other potential formats
      `user_${username.trim().toLowerCase()}@username.local`
    ];
    
    console.log('Trying username login with formats:', formats);
    
    // Try each format until one works
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
    
    // If we get here, none of the formats worked
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
