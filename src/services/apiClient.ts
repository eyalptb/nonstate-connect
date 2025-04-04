
import { supabase } from '@/integrations/supabase/client';

/**
 * Simplified API client that avoids TypeScript recursion errors
 * by using minimal typing and manual table validation
 */

export const api = {
  // GET method
  get: async (path: string, params?: Record<string, any>): Promise<{data: any, error: any}> => {
    try {
      // Special case for auth session
      if (path === 'auth/session') {
        const { data, error } = await supabase.auth.getSession();
        return { data, error };
      }

      // Parse path
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      // Perform a table name check without complex typing
      if (!isValidTable(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      // Handle get by ID
      if (id && !id.includes('?')) {
        // Use any typing to avoid recursion
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('id', id)
          .maybeSingle();
          
        return { data, error };
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
        
        // Build query manually to avoid type recursion
        const baseQuery = supabase.from(tableName).select('*');
        
        // Apply filters one by one
        let fullQuery = baseQuery;
        for (const [key, value] of Object.entries(queryObj)) {
          fullQuery = fullQuery.eq(key, value);
        }
        
        // Execute query
        const { data, error } = await fullQuery;
        
        return { data, error };
      }
    } catch (error) {
      console.error('API get error:', error);
      return { data: null, error };
    }
  },
  
  // POST method
  post: async (path: string, data: any): Promise<{data: any, error: any}> => {
    try {
      if (!isValidTable(path)) {
        throw new Error(`Invalid table name: ${path}`);
      }
      
      const { data: responseData, error } = await supabase
        .from(path)
        .insert(data)
        .select();
      
      return { data: responseData?.[0] || null, error };
    } catch (error) {
      console.error('API post error:', error);
      return { data: null, error };
    }
  },
  
  // PUT method
  put: async (path: string, data: any): Promise<{data: any, error: any}> => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!isValidTable(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const { data: responseData, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select();
      
      return { data: responseData?.[0] || null, error };
    } catch (error) {
      console.error('API put error:', error);
      return { data: null, error };
    }
  },
  
  // DELETE method
  delete: async (path: string): Promise<{data: any, error: any}> => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!isValidTable(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const { data: responseData, error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)
        .select();
      
      return { data: responseData?.[0] || null, error };
    } catch (error) {
      console.error('API delete error:', error);
      return { data: null, error };
    }
  }
};

// Simple manual validation function to check table names
function isValidTable(tableName: string): boolean {
  const validTables = [
    'projects', 
    'conversations', 
    'contribution_zones', 
    'conversation_participants', 
    'messages', 
    'outputs', 
    'profiles', 
    'token_transactions', 
    'user_tokens'
  ];
  
  return validTables.includes(tableName);
}
