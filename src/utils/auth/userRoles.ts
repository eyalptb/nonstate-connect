import { supabase } from '@/integrations/supabase/client';

// Removed the duplicate checkUserAdminRole function that was causing conflict

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
