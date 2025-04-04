
import { supabase } from '@/integrations/supabase/client';

/**
 * Simple API client for Supabase interactions
 * Uses explicit type casting to avoid TypeScript recursion errors
 */

// Define valid table names
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

// Use a union type for table names
type ValidTable = typeof VALID_TABLES[number];

// Simple response type
type ApiResponse = {
  data: any | null;
  error: Error | null;
};

export const api = {
  // GET method
  get: async (path: string, params?: Record<string, any>): Promise<ApiResponse> => {
    try {
      // Special case for auth session
      if (path === 'auth/session') {
        const { data, error } = await supabase.auth.getSession();
        return { data, error: error as Error };
      }

      // Parse path
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      // Validate table name
      if (!VALID_TABLES.includes(tableName as ValidTable)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      // Handle get by ID
      if (id && !id.includes('?')) {
        // Type assertion to handle the type checking
        const query = supabase.from(tableName as ValidTable);
        const result = await query.select('*').eq('id', id).maybeSingle();
          
        return { data: result.data, error: result.error as Error };
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
        
        // Start with base query with type assertion
        const query = supabase.from(tableName as ValidTable);
        
        // Apply filters using a dynamic approach
        let filteredQuery = query.select('*');
        Object.entries(queryObj).forEach(([key, value]) => {
          filteredQuery = filteredQuery.eq(key, value);
        });
        
        // Execute query
        const result = await filteredQuery;
        
        return { data: result.data, error: result.error as Error };
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
      
      if (!VALID_TABLES.includes(tableName as ValidTable)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      // Use type assertion to satisfy TypeScript
      const query = supabase.from(tableName as ValidTable);
      const result = await query.insert(data).select();
      
      return { data: result.data?.[0] || null, error: result.error as Error };
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
      
      if (!VALID_TABLES.includes(tableName as ValidTable)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      // Use type assertion to satisfy TypeScript
      const query = supabase.from(tableName as ValidTable);
      const result = await query.update(data).eq('id', id).select();
      
      return { data: result.data?.[0] || null, error: result.error as Error };
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
      
      if (!VALID_TABLES.includes(tableName as ValidTable)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      // Use type assertion to satisfy TypeScript
      const query = supabase.from(tableName as ValidTable);
      const result = await query.delete().eq('id', id).select();
      
      return { data: result.data?.[0] || null, error: result.error as Error };
    } catch (error) {
      console.error('API delete error:', error);
      return { data: null, error: error as Error };
    }
  }
};
