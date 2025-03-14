
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AppRole = 'admin' | 'user';

type UserRole = {
  id: string;
  user_id: string;
  role: AppRole;
  created_at?: string;
}

export type UserWithRoles = {
  id: string;
  email: string;
  created_at: string;
  full_name: string;
  roles: AppRole[];
};

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
    interface ProfileType { 
      id: string; 
      first_name: string | null; 
      last_name: string | null; 
      created_at: string;
    }
    
    // Make sure the data is properly typed
    const profiles = usersData as ProfileType[];
    
    // Define the type for role data to fix the "property 'id' does not exist on type 'never'" error
    interface RoleData {
      user_id: string;
      role: string;
    }
    
    // Cast the roles data to the correct type
    const typedRolesData = rolesData as RoleData[];
    
    const combinedUsers = profiles.map(profile => {
      const authUser = authUsers?.users.find(u => u.id === profile.id);
      const userRoles = typedRolesData
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

    // If role already exists, return success
    if (existingRole) {
      return true;
    }

    // Otherwise, insert the new role
    const { error } = await supabase
      .from('user_roles')
      .insert({ 
        user_id: userId, 
        role 
      });

    if (error) {
      throw error;
    }

    toast.success(`Role ${role} assigned successfully`);
    return true;
  } catch (error: any) {
    toast.error('Failed to assign user role', { description: error.message });
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

    if (error) {
      throw error;
    }

    toast.success(`Role ${role} removed successfully`);
    return true;
  } catch (error: any) {
    toast.error('Failed to remove user role', { description: error.message });
    return false;
  }
};
