
import { supabase } from '@/integrations/supabase/client';

/**
 * Simple API client for Supabase interactions
 * Avoids complex type recursion that causes TypeScript errors
 */

// Define response type
type ApiResponse = {
  data: any | null;
  error: Error | null;
};

// Define valid table names as string literals to avoid deep type instantiation
type TableName = 'projects' | 'conversations' | 'contribution_zones' | 
  'conversation_participants' | 'messages' | 'outputs' | 'profiles' | 
  'token_transactions' | 'user_tokens';

// Array of valid tables for runtime validation
const VALID_TABLES: TableName[] = [
  'projects', 'conversations', 'contribution_zones', 'conversation_participants', 
  'messages', 'outputs', 'profiles', 'token_transactions', 'user_tokens'
];

export const api = {
  // GET method
  get: async (path: string, params?: Record<string, any>): Promise<ApiResponse> => {
    try {
      // Special case for auth session
      if (path === 'auth/session') {
        const { data, error } = await supabase.auth.getSession();
        return { data, error: null };
      }

      // Parse path
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      // Validate table name
      if (!VALID_TABLES.includes(tableName as TableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      // Use validated table name, now we know it's safe
      const table = tableName as TableName;
      
      // Handle get by ID
      if (id && !id.includes('?')) {
        const { data, error } = await supabase
          .from(table)
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
        
        // Use type assertion for the query to avoid deep type instantiation
        const query = supabase.from(table).select('*');
        
        // Apply filters
        Object.entries(queryObj).forEach(([key, value]) => {
          query.eq(key, value);
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
      
      if (!VALID_TABLES.includes(tableName as TableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const table = tableName as TableName;
      
      const { data: result, error } = await supabase
        .from(table)
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
      
      if (!VALID_TABLES.includes(tableName as TableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const table = tableName as TableName;
      
      const { data: result, error } = await supabase
        .from(table)
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
      
      if (!VALID_TABLES.includes(tableName as TableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const table = tableName as TableName;
      
      const { data: result, error } = await supabase
        .from(table)
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
