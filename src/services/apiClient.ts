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
