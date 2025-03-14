
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error };
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
    
    // For username-based login:
    // 1. Prepare the username: clean, trim and lowercase
    const cleanUsername = username.trim().toLowerCase();
    console.log('Attempting to sign in with username:', cleanUsername);
    
    // 2. Try to sign in with the username in email format
    const { error } = await supabase.auth.signInWithPassword({
      email: `${cleanUsername}@username.local`,
      password,
    });
    
    // Debug in case of error
    if (error) {
      console.error('Authentication error:', error);
      
      // You may want to try alternative formats if the first attempt fails
      // This could help if users were created with different email formats
      if (error.message === 'Invalid login credentials') {
        console.log('Trying alternative username format...');
        
        // Try without lowercasing
        const { error: altError } = await supabase.auth.signInWithPassword({
          email: `${username.trim()}@username.local`,
          password,
        });
        
        if (!altError) {
          return { error: null };
        }
      }
    }
    
    return { error: error };
  } catch (error) {
    console.error('Error signing in with username:', error);
    return { error: error as Error };
  }
};

export const handleSignOut = async () => {
  return await supabase.auth.signOut();
};
