// This file is now a placeholder since authentication has been removed
// It will be replaced when a new authentication system is implemented

import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Simplified dummy types
export type AppRole = 'admin' | 'user';

export type UserWithRoles = {
  id: string;
  email: string;
  created_at: string;
  full_name: string;
  roles: AppRole[];
};

// Placeholder functions that return empty data or success messages
// These will be properly implemented when authentication is re-added

export const fetchUserRoles = async () => {
  console.log('Authentication has been removed');
  return [];
};

export const fetchAllUsers = async (): Promise<UserWithRoles[]> => {
  console.log('Authentication has been removed');
  return [];
};

export const assignUserRole = async (_userId: string, _role: AppRole): Promise<boolean> => {
  console.log('Authentication has been removed');
  toast.info('Authentication functionality has been temporarily removed');
  return false;
};

export const removeUserRole = async (_userId: string, _role: AppRole): Promise<boolean> => {
  console.log('Authentication has been removed');
  toast.info('Authentication functionality has been temporarily removed');
  return false;
};
