
import { getSupabaseClient } from './supabase';

// Define the allowed table names as a string literal union type
// This provides better type safety than using strings directly
type TableName = 'projects' | 'conversations' | 'contribution_zones' | 
  'conversation_participants' | 'messages' | 'outputs' | 'profiles' | 
  'token_transactions' | 'user_tokens';

// Type for HTTP methods used in our API
type HttpMethod = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';

// Simple validation function to check if a string is a valid table name
function isValidTableName(name: string): name is TableName {
  const validTableNames = [
    'projects', 'conversations', 'contribution_zones', 'conversation_participants', 
    'messages', 'outputs', 'profiles', 'token_transactions', 'user_tokens'
  ];
  return validTableNames.includes(name as TableName);
}

/**
 * Core supabase request function with explicit typing
 */
export const supabaseRequest = async <T>(
  tableName: TableName,
  method: HttpMethod,
  data?: any,
  filters?: Record<string, any>
): Promise<T> => {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  let query;
  
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
  
  // Apply filters if provided
  if (filters) {
    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
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
};

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

// API response type to maintain consistent return structure
interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

// API client with simplified type approach to avoid deep instantiation
export const api = {
  // GET method for fetching data
  get: async <T>(path: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
    try {
      // Special case: auth session
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
        
        // Fetching a list with filters
        result = await supabaseRequest<T>(tableName, 'SELECT', undefined, queryParams);
      }
      
      return { data: result as T, error: null };
    } catch (error) {
      console.error('API get error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  // POST method for creating data
  post: async <T>(path: string, data: any): Promise<ApiResponse<T>> => {
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
  
  // PUT method for updating data
  put: async <T>(path: string, data: any): Promise<ApiResponse<T>> => {
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
        .select();
      
      if (error) throw error;
      
      return { data: result[0] as T, error: null };
    } catch (error) {
      console.error('API put error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  // DELETE method for removing data
  delete: async <T>(path: string): Promise<ApiResponse<T>> => {
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
        .select();
      
      if (error) throw error;
      
      return { data: result[0] as T, error: null };
    } catch (error) {
      console.error('API delete error:', error);
      return { data: null, error: error as Error };
    }
  }
};
