import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type UserRole = {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at?: string;
}

export const fetchUserRoles = async () => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('*');

    if (error) {
      throw error;
    }

    return data as UserRole[];
  } catch (error: any) {
    toast.error('Failed to fetch user roles', { description: error.message });
    return [];
  }
};

export const assignUserRole = async (userId: string, role: 'admin' | 'user') => {
  try {
    // Check if the role assignment already exists
    const { data: existingRole, error: fetchError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .eq('role', role)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is the "no rows returned" error
      throw fetchError;
    }

    // If role already exists, return it
    if (existingRole) {
      return { data: existingRole as UserRole, error: null };
    }

    // Otherwise, insert the new role
    const { data, error } = await supabase
      .from('user_roles')
      .insert({ 
        user_id: userId, 
        role 
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: data as UserRole, error: null };
  } catch (error: any) {
    toast.error('Failed to assign user role', { description: error.message });
    return { data: null, error };
  }
};

export const removeUserRole = async (roleId: string) => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', roleId);

    if (error) {
      throw error;
    }

    return { error: null };
  } catch (error: any) {
    toast.error('Failed to remove user role', { description: error.message });
    return { error };
  }
};
