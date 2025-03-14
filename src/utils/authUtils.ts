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
    console.log(`Attempting to sign in with email: ${email}`);
    
    console.log('Login credentials check:', {
      emailProvided: !!email,
      emailLength: email?.length,
      passwordProvided: !!password,
      passwordLength: password?.length
    });
    
    if (email === '016eyal@gmail.com') {
      console.log('Admin email detected, attempting special handling');
    }
    
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
    
    if (username === 'jonnyCat') {
      console.log('Detected admin user jonnyCat, attempting special login flow');
      
      const adminEmail = '016eyal@gmail.com';
      console.log('Using admin email:', adminEmail);
      
      try {
        const result = await handleSignInWithEmail(adminEmail, password);
        
        if (!result.error) {
          console.log('Admin login succeeded with direct email');
          return { error: null };
        }
        
        console.error('Admin login failed with direct email:', result.error);
        
        return { 
          error: new Error(`Admin login failed. If you haven't created the admin account yet, please sign up first with username 'jonnyCat' and email '016eyal@gmail.com'.`) 
        };
      } catch (innerError) {
        console.error('Error in admin login special flow:', innerError);
        return { error: innerError as Error };
      }
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(username);
    
    if (isEmail) {
      return handleSignInWithEmail(username, password);
    }
    
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

export const assignAdminRole = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase.functions.invoke('admin-assign-role', {
      body: { userId, role: 'admin' }
    });

    if (error) {
      console.error('Error assigning admin role:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in assignAdminRole:', error);
    return false;
  }
};

export const assignUserRole = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase.functions.invoke('admin-assign-role', {
      body: { userId, role: 'user' }
    });

    if (error) {
      console.error('Error assigning user role:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in assignUserRole:', error);
    return false;
  }
};
