
import { getSupabaseClient } from './supabase';

// Define the valid table names as string constants
const validTables = ['projects', 'conversations', 'contribution_zones', 'conversation_participants', 
  'messages', 'outputs', 'profiles', 'token_transactions', 'user_tokens'];

// Simplified API client without complex types
export const api = {
  // Simplified GET method
  get: async (path: string, params?: Record<string, any>) => {
    try {
      // Special case: auth session
      if (path === 'auth/session') {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.getSession();
        return { data, error: null };
      }

      // Parse path to get table name and ID
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      // Validate table name
      if (!validTables.includes(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const supabase = getSupabaseClient();
      
      // Get by ID
      if (id && !id.includes('?')) {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('id', id)
          .maybeSingle();
          
        if (error) throw error;
        return { data, error: null };
      } 
      
      // Get with query params
      else {
        // Extract query params
        let queryObj: Record<string, any> = {};
        if (id && id.includes('?')) {
          const queryPart = id.split('?')[1];
          const searchParams = new URLSearchParams(queryPart);
          searchParams.forEach((value, key) => {
            queryObj[key] = value;
          });
        } else if (params) {
          queryObj = params;
        }
        
        let query = supabase.from(tableName).select('*');
        
        // Apply filters
        Object.entries(queryObj).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
        
        const { data, error } = await query;
        
        if (error) throw error;
        return { data, error: null };
      }
    } catch (error) {
      console.error('API get error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  // Simplified POST method
  post: async (path: string, data: any) => {
    try {
      const tableName = path;
      
      if (!validTables.includes(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const supabase = getSupabaseClient();
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data)
        .select();
      
      if (error) throw error;
      return { data: result[0], error: null };
    } catch (error) {
      console.error('API post error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  // Simplified PUT method
  put: async (path: string, data: any) => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!validTables.includes(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const supabase = getSupabaseClient();
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return { data: result[0], error: null };
    } catch (error) {
      console.error('API put error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  // Simplified DELETE method
  delete: async (path: string) => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!validTables.includes(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const supabase = getSupabaseClient();
      const { data: result, error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return { data: result[0], error: null };
    } catch (error) {
      console.error('API delete error:', error);
      return { data: null, error: error as Error };
    }
  }
};
