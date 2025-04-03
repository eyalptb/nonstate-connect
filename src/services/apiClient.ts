
import { getSupabaseClient } from './supabase';

// Define allowed table names to avoid type errors
type TableName = 'projects' | 'conversations' | 'contribution_zones' | 
  'conversation_participants' | 'messages' | 'outputs' | 'profiles' | 
  'token_transactions' | 'user_tokens';

export const supabaseRequest = async <T>(
  tableName: TableName,
  method: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE',
  data?: any,
  filters?: any
): Promise<T> => {
  try {
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

// API client wrapper to match what projectService2 expects
export const api = {
  get: async <T>(path: string, params?: any): Promise<{ data: T | null; error: Error | null }> => {
    try {
      const parts = path.split('/');
      const tableName = parts[0] as TableName;
      const id = parts[1];
      
      let result;
      
      if (id) {
        // Fetching a specific item by ID
        const { data, error } = await getSupabaseClient()
          .from(tableName)
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        result = data;
      } else {
        // Fetching a list, potentially with filters from params
        result = await supabaseRequest<T>(tableName, 'SELECT', undefined, params);
      }
      
      return { data: result as T, error: null };
    } catch (error) {
      console.error('API get error:', error);
      return { data: null, error: error as Error };
    }
  },
  
  post: async <T>(path: string, data: any): Promise<{ data: T | null; error: Error | null }> => {
    try {
      const tableName = path as TableName;
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
      const tableName = parts[0] as TableName;
      const id = parts[1];
      
      const { data: result, error } = await getSupabaseClient()
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
      const tableName = parts[0] as TableName;
      const id = parts[1];
      
      const { data: result, error } = await getSupabaseClient()
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
