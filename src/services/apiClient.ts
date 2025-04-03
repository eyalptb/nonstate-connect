
import { getSupabaseClient } from './supabase';

// Define table names as simple string literals
const validTableNames = [
  'projects', 'conversations', 'contribution_zones', 'conversation_participants', 
  'messages', 'outputs', 'profiles', 'token_transactions', 'user_tokens'
] as const;

// Simple string literal type
type TableName = typeof validTableNames[number];

// Helper function to get auth session
const getAuthSession = async () => {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data;
};

// Simple API client with no complex type recursion
export const api = {
  // GET method for fetching data
  get: async (path: string, params?: Record<string, any>) => {
    try {
      // Special case: auth session
      if (path === 'auth/session') {
        const session = await getAuthSession();
        return { data: session, error: null };
      }

      // Handle path with ID
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!validTableNames.includes(tableName as TableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const supabase = getSupabaseClient();
      let result;
      
      if (id && !id.includes('?')) {
        // Fetching a specific item by ID
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('id', id)
          .maybeSingle();
          
        if (error) throw error;
        result = data;
      } else {
        // Extract query params if in path format
        let queryParams = params || {};
        if (id && id.includes('?')) {
          const queryPart = id.split('?')[1];
          const searchParams = new URLSearchParams(queryPart);
          searchParams.forEach((value, key) => {
            queryParams[key] = value;
          });
        }
        
        // Fetch list with filters
        const { data, error } = await supabase
          .from(tableName)
          .select('*');
          
        if (error) throw error;
        result = data;
        
        // Apply filters manually if needed
        if (Object.keys(queryParams).length > 0) {
          result = result.filter((item) => {
            return Object.entries(queryParams).every(([key, value]) => {
              return item[key] === value;
            });
          });
        }
      }
      
      return { data: result, error: null };
    } catch (error) {
      console.error('API get error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  // POST method for creating data
  post: async (path: string, data: any) => {
    try {
      const tableName = path;
      
      if (!validTableNames.includes(tableName as TableName)) {
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
  
  // PUT method for updating data
  put: async (path: string, data: any) => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!validTableNames.includes(tableName as TableName)) {
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
  
  // DELETE method for removing data
  delete: async (path: string) => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!validTableNames.includes(tableName as TableName)) {
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
