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

export const getUserSessionAndProfile = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    return { session: null, profile: null, isAdmin: false };
  }
  
  const profile = await fetchUserProfile(session.user.id);
  const isAdmin = await checkUserAdminRole(session.user.id);
  
  return { session, profile, isAdmin };
};

// Helper function to check admin role - defined here to avoid circular dependencies
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
