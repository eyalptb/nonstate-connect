
import { getSupabaseClient } from './supabase';

// Define allowed table names to avoid type errors
type TableName = 'projects' | 'conversations' | 'contribution_zones' | 
  'conversation_participants' | 'messages' | 'outputs' | 'profiles' | 
  'token_transactions' | 'user_tokens';

// Special path for auth session that's not a table
type SpecialPath = 'auth/session';

export const supabaseRequest = async <T>(
  tableName: TableName,
  method: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE',
  data?: any,
  filters?: Record<string, any>
): Promise<T> => {
  try {
    const supabase = getSupabaseClient();
    
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    let query: any;
    
    switch (method) {
      case 'SELECT':
        query = supabase.from(tableName).select('*');
        break;
      case 'INSERT':
        query = supabase.from(tableName).insert(data);
        break;
      case 'UPDATE':
        query = supabase.from(tableName).update(data);
        break;
      case 'DELETE':
        query = supabase.from(tableName).delete();
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    
    if (filters) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          query = query.eq(key, filters[key]);
        }
      }
    }
    
    const { data: result, error } = await query;
    
    if (error) {
      console.error(`Error in ${method} operation:`, error);
      throw error;
    }
    
    return result as T;
  } catch (error) {
    console.error('Supabase request error:', error);
    throw error;
  }
};

// Helper function to safely get auth session
const getAuthSession = async () => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data;
};

// Helper function to check if a string is a valid table name
function isValidTableName(name: string): name is TableName {
  const validTableNames: string[] = [
    'projects', 'conversations', 'contribution_zones', 'conversation_participants', 
    'messages', 'outputs', 'profiles', 'token_transactions', 'user_tokens'
  ];
  return validTableNames.includes(name);
}

// API client wrapper to match what projectService2 expects
export const api = {
  get: async <T>(path: string, params?: Record<string, any>): Promise<{ data: T | null; error: Error | null }> => {
    try {
      // Handle special cases like auth/session
      if (path === 'auth/session') {
        const session = await getAuthSession();
        return { data: session as unknown as T, error: null };
      }

      // Handle path with ID
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!isValidTableName(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      let result;
      const supabase = getSupabaseClient();
      
      if (id && !id.includes('?')) {
        // Fetching a specific item by ID
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('id', id)
          .single();
          
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
        
        // Fetching a list, potentially with filters from params
        result = await supabaseRequest<T>(tableName, 'SELECT', undefined, queryParams);
      }
      
      return { data: result as T, error: null };
    } catch (error) {
      console.error('API get error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  post: async <T>(path: string, data: any): Promise<{ data: T | null; error: Error | null }> => {
    try {
      const tableName = path;
      
      if (!isValidTableName(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const result = await supabaseRequest<T>(tableName, 'INSERT', data);
      return { data: result as T, error: null };
    } catch (error) {
      console.error('API post error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  put: async <T>(path: string, data: any): Promise<{ data: T | null; error: Error | null }> => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!isValidTableName(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const supabase = getSupabaseClient();
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return { data: result as T, error: null };
    } catch (error) {
      console.error('API put error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  delete: async <T>(path: string): Promise<{ data: T | null; error: Error | null }> => {
    try {
      const parts = path.split('/');
      const tableName = parts[0];
      const id = parts[1];
      
      if (!isValidTableName(tableName)) {
        throw new Error(`Invalid table name: ${tableName}`);
      }
      
      const supabase = getSupabaseClient();
      const { data: result, error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return { data: result as T, error: null };
    } catch (error) {
      console.error('API delete error:', error);
      return { data: null, error: error as Error };
    }
  }
};
