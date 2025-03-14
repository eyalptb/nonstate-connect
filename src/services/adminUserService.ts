
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AdminUserActionType = 
  | 'createUser' 
  | 'deleteUser' 
  | 'updateUser' 
  | 'resetPassword'
  | 'listUsers';

export type UserCreateParams = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  role?: 'admin' | 'user';
};

export type UserUpdateParams = {
  userId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
};

export type UserResetPasswordParams = {
  userId: string;
  newPassword: string;
};

export type AdminUserParams = 
  | UserCreateParams 
  | UserUpdateParams 
  | UserResetPasswordParams 
  | { userId: string }
  | {};

export type AdminUserResponse = {
  success: boolean;
  error?: string;
  user_id?: string;
  data?: any;
};

export const callAdminUserFunction = async (
  action: AdminUserActionType,
  params: AdminUserParams
): Promise<AdminUserResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('admin-user-management', {
      body: { action, ...params },
    });

    if (error) {
      console.error(`Admin user management error (${action}):`, error);
      throw new Error(error.message || `Failed to perform ${action}`);
    }

    if (data?.error) {
      console.error(`Admin user management error (${action}):`, data.error);
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(`Admin user management error (${action}):`, error);
    toast.error(`User management error: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export const createUser = async (params: UserCreateParams): Promise<AdminUserResponse> => {
  return await callAdminUserFunction('createUser', params);
};

export const deleteUser = async (userId: string): Promise<AdminUserResponse> => {
  return await callAdminUserFunction('deleteUser', { userId });
};

export const updateUser = async (params: UserUpdateParams): Promise<AdminUserResponse> => {
  return await callAdminUserFunction('updateUser', params);
};

export const resetUserPassword = async (params: UserResetPasswordParams): Promise<AdminUserResponse> => {
  return await callAdminUserFunction('resetPassword', params);
};

export const listUsers = async (): Promise<any[]> => {
  const response = await callAdminUserFunction('listUsers', {});
  return response.data || [];
};
