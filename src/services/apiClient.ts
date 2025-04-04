
import { supabase } from '@/integrations/supabase/client';

type ApiResponse<T = any> = {
  data: T | null;
  error: any | null;
};

// Define a specific type for auth session responses
type AuthSessionResponse = {
  session: any | null;
};

// List of valid tables for runtime validation
const VALID_TABLES = [
  'projects', 
  'conversations', 
  'contribution_zones', 
  'conversation_participants', 
  'messages', 
  'outputs', 
  'profiles', 
  'token_transactions', 
  'user_tokens'
] as const;

// Simple validation function to check table names
function isValidTable(tableName: string): boolean {
  return VALID_TABLES.includes(tableName as any);
}

export const api = {
  // GET method
  get: async <T = any>(path: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
    try {
      // Special case for auth session
      if (path === 'auth/session') {
        const { data, error } = await supabase.auth.getSession();
        // Return the response as AuthSessionResponse type specifically for this endpoint
        return { data: data as unknown as T, error };
      }

      // Parse path
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts.length > 1 ? parts[1] : null;
      
      // Validate table name
      if (!isValidTable(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      let query;
      
      // Handle get by ID
      if (id && !id.includes('?')) {
        query = await supabase.from(tableName as any)
          .select('*')
          .eq('id', id)
          .maybeSingle();
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
        
        // Build query
        let queryBuilder = supabase.from(tableName as any).select('*');
        
        // Apply filters one by one
        for (const [key, value] of Object.entries(queryObj)) {
          queryBuilder = queryBuilder.eq(key, value);
        }
        
        query = await queryBuilder;
      }
      
      return { data: query.data as T, error: query.error };
    } catch (error) {
      console.error('API get error:', error);
      return { data: null, error };
    }
  },
  
  // POST method
  post: async <T = any>(path: string, data: any): Promise<ApiResponse<T>> => {
    try {
      if (!isValidTable(path)) {
        throw new Error(`Invalid table name: ${path}`);
      }
      
      const result = await supabase
        .from(path as any)
        .insert(data)
        .select();
      
      return { 
        data: result.data?.[0] as T || null, 
        error: result.error 
      };
    } catch (error) {
      console.error('API post error:', error);
      return { data: null, error };
    }
  },
  
  // PUT method
  put: async <T = any>(path: string, data: any): Promise<ApiResponse<T>> => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!isValidTable(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const result = await supabase
        .from(tableName as any)
        .update(data)
        .eq('id', id)
        .select();
      
      return { 
        data: result.data?.[0] as T || null, 
        error: result.error 
      };
    } catch (error) {
      console.error('API put error:', error);
      return { data: null, error };
    }
  },
  
  // DELETE method
  delete: async <T = any>(path: string): Promise<ApiResponse<T>> => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!isValidTable(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const result = await supabase
        .from(tableName as any)
        .delete()
        .eq('id', id)
        .select();
      
      return { 
        data: result.data?.[0] as T || null, 
        error: result.error 
      };
    } catch (error) {
      console.error('API delete error:', error);
      return { data: null, error };
    }
  }
};
