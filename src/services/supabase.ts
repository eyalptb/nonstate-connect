
import { supabase } from "@/integrations/supabase/client";

export const getSupabaseClient = () => {
  return supabase;
};
