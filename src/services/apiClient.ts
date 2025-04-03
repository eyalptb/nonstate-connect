
import { getSupabaseClient } from './supabase';

/**
 * Simple API client for Supabase interactions
 * Avoids complex type recursion that causes TypeScript errors
 */

// Define response type without complex generics
type ApiResponse = {
  data: any;
  error: Error | null;
};

// List of valid table names as an array
const VALID_TABLES = ['projects', 'conversations', 'contribution_zones', 'conversation_participants', 
  'messages', 'outputs', 'profiles', 'token_transactions', 'user_tokens'];

export const api = {
  // GET method
  get: async (path: string, params?: Record<string, any>): Promise<ApiResponse> => {
    try {
      // Special case for auth session
      if (path === 'auth/session') {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.getSession();
        return { data, error: null };
      }

      // Parse path
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      // Validate table name
      if (!VALID_TABLES.includes(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const supabase = getSupabaseClient();
      
      // Handle get by ID
      if (id && !id.includes('?')) {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('id', id)
          .maybeSingle();
          
        if (error) throw error;
        return { data, error: null };
      } 
      
      // Handle get with query params
      else {
        let queryObj: Record<string, any> = {};
        
        // Extract query from URL or use provided params
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
  
  // POST method
  post: async (path: string, data: any): Promise<ApiResponse> => {
    try {
      const tableName = path;
      
      if (!VALID_TABLES.includes(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const supabase = getSupabaseClient();
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data)
        .select();
      
      if (error) throw error;
      return { data: result?.[0] || null, error: null };
    } catch (error) {
      console.error('API post error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  // PUT method
  put: async (path: string, data: any): Promise<ApiResponse> => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!VALID_TABLES.includes(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const supabase = getSupabaseClient();
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return { data: result?.[0] || null, error: null };
    } catch (error) {
      console.error('API put error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  // DELETE method
  delete: async (path: string): Promise<ApiResponse> => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!VALID_TABLES.includes(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const supabase = getSupabaseClient();
      const { data: result, error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return { data: result?.[0] || null, error: null };
    } catch (error) {
      console.error('API delete error:', error);
      return { data: null, error: error as Error };
    }
  }
};
