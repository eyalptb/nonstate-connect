
import { supabase } from '@/integrations/supabase/client';

/**
 * Simple API client for Supabase interactions
 * Avoids complex type recursion that causes TypeScript errors
 */

// Define response type without complex generics
type ApiResponse = {
  data: any;
  error: Error | null;
};

// Define valid table names as a union type
type ValidTable = 'projects' | 'conversations' | 'contribution_zones' | 
  'conversation_participants' | 'messages' | 'outputs' | 'profiles' | 
  'token_transactions' | 'user_tokens';

// List of valid table names for runtime validation
const VALID_TABLES: ValidTable[] = [
  'projects', 'conversations', 'contribution_zones', 'conversation_participants', 
  'messages', 'outputs', 'profiles', 'token_transactions', 'user_tokens'
];

// Type guard to validate table names
function isValidTable(tableName: string): tableName is ValidTable {
  return VALID_TABLES.includes(tableName as ValidTable);
}

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
      if (!isValidTable(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      // Handle get by ID
      if (id && !id.includes('?')) {
        // Use the validated tableName which TypeScript now knows is a ValidTable
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
        
        // Use the validated tableName
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
      
      if (!isValidTable(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      // Use the validated tableName
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
      
      if (!isValidTable(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      // Use the validated tableName
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
      
      if (!isValidTable(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      // Use the validated tableName
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
