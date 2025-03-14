
import { supabase } from '@/integrations/supabase/client';

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

export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase.functions.invoke('admin-assign-role', {
      body: { userId, action: 'deleteUser' }
    });

    if (error) {
      console.error('Error deleting user:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteUser:', error);
    return false;
  }
};
