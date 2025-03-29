
import { supabase } from "@/integrations/supabase/client";

/**
 * Check if a username is available
 * @param username The username to check
 * @returns Boolean indicating if the username is available
 */
export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Username check error:', error);
      return false;
    }
    
    return !data; // If no data is returned, username is available
  } catch (error) {
    console.error('Username check error:', error);
    return false;
  }
};

/**
 * Sets user as admin (should only be used by other admins)
 * @param userId The ID of the user to promote
 * @returns Boolean indicating success
 */
export const promoteToAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userId);
    
    return !error;
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    return false;
  }
};

/**
 * Removes admin privileges from a user (should only be used by other admins)
 * @param userId The ID of the user to demote
 * @returns Boolean indicating success
 */
export const demoteFromAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'user' })
      .eq('id', userId);
    
    return !error;
  } catch (error) {
    console.error('Error demoting admin to user:', error);
    return false;
  }
};

/**
 * Deletes a user (should only be used by admins)
 * @param userId The ID of the user to delete
 * @returns Boolean indicating success
 */
export const deleteUserAccount = async (userId: string): Promise<boolean> => {
  try {
    // Call the admin-assign-role function with the action 'deleteUser'
    const { error } = await supabase.functions.invoke('admin-assign-role', {
      body: { userId, action: 'deleteUser' }
    });
    
    return !error;
  } catch (error) {
    console.error('Error deleting user account:', error);
    return false;
  }
};

/**
 * Updates user profile information
 * @param userId The ID of the user to update
 * @param data The profile data to update
 * @returns Boolean indicating success
 */
export const updateUserProfile = async (userId: string, data: { username?: string }): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId);
    
    return !error;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

/**
 * Gets all users (should only be used by admins)
 * @returns Array of user profiles with role information
 */
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
};
