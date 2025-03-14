
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AppRole = 'admin' | 'user';

export type UserWithRoles = {
  id: string;
  email: string;
  created_at: string;
  full_name: string;
  roles: AppRole[];
};

export const fetchAllUsers = async (): Promise<UserWithRoles[]> => {
  try {
    // Fetch all users from the profiles table
    const { data: usersData, error: usersError } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, created_at');

    if (usersError) throw usersError;

    // For each user, fetch their email from auth.users
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) throw authError;

    // For each user, fetch their roles
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('user_id, role');

    if (rolesError) throw rolesError;

    // Combine the data
    const combinedUsers = usersData.map(profile => {
      const authUser = authUsers?.users.find(u => u.id === profile.id);
      const userRoles = rolesData
        .filter(r => r.user_id === profile.id)
        .map(r => r.role as AppRole);
      
      return {
        id: profile.id,
        email: authUser?.email || 'Unknown',
        created_at: profile.created_at,
        full_name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'N/A',
        roles: userRoles,
      };
    });

    return combinedUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    toast.error('Failed to load users');
    return [];
  }
};

export const assignUserRole = async (userId: string, role: AppRole): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: role
      });

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        toast.error('User already has this role');
      } else {
        throw error;
      }
      return false;
    }
    
    toast.success(`Role ${role} assigned successfully`);
    return true;
  } catch (error) {
    console.error('Error assigning role:', error);
    toast.error('Failed to assign role');
    return false;
  }
};

export const removeUserRole = async (userId: string, role: AppRole): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', role);

    if (error) throw error;
    
    toast.success(`Role ${role} removed successfully`);
    return true;
  } catch (error) {
    console.error('Error removing role:', error);
    toast.error('Failed to remove role');
    return false;
  }
};
