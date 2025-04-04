
import { supabase } from "@/integrations/supabase/client";

export const getSupabaseClient = () => {
  return supabase;
};

// Auth helpers that don't involve complex typing
export const getSession = async () => {
  return await supabase.auth.getSession();
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user || null;
};
