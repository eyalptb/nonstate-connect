import { apiConfig, useCustomBackend, DIGITALOCEAN_API_URL } from '@/config/api';
import { supabase } from '@/integrations/supabase/client';

// HTTP methods supported by our API
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Common interface for all API responses
export interface ApiResponse<T = any> {
  data?: T;
  error?: {
    message: string;
    code?: string;
    status?: number;
  };
}

// Table names type for type safety
type TableName = 'projects' | 'conversations' | 'contribution_zones' | 
                'conversation_participants' | 'messages' | 'outputs' | 
                'profiles' | 'token_transactions' | 'user_tokens';

/**
 * Base API client that can work with both Supabase and a custom backend
 */
export class ApiClient {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = useCustomBackend ? DIGITALOCEAN_API_URL : apiConfig.baseUrl;
  }

  /**
   * Make an API request to either Supabase or custom backend
   */
  async request<T = any>(
    endpoint: string,
    method: HttpMethod = 'GET',
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      // If using Supabase, use their client
      if (!useCustomBackend) {
        return this.supabaseRequest<T>(endpoint, method, data);
      }
      
      // Otherwise, make a standard fetch request to custom backend
      const url = `${this.baseUrl}/${endpoint}`;
      
      const headers = {
        'Content-Type': 'application/json',
        ...options?.headers,
      };
      
      // Get auth token if user is logged in
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.access_token) {
        headers['Authorization'] = `Bearer ${session.session.access_token}`;
      }
      
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
        credentials: 'include', // Send cookies for authentication
      });
      
      // Parse the response
      let responseData;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
      
      // Handle error responses
      if (!response.ok) {
        return {
          error: {
            message: responseData?.message || 'An error occurred',
            code: responseData?.code,
            status: response.status,
          },
        };
      }
      
      return { data: responseData };
    } catch (error) {
      console.error('API request error:', error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
        },
      };
    }
  }

  /**
   * Make a request using the Supabase client
   * This abstracts away Supabase specifics
   */
  private async supabaseRequest<T = any>(
    endpoint: string, 
    method: HttpMethod, 
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      // Parse endpoint to extract resource and id parts
      const parts = endpoint.split('/');
      const resource = parts[0] as TableName;
      const id = parts.length > 1 ? parts[1] : undefined;
      const queryParams = new URLSearchParams(parts.length > 2 ? parts[2] : '');
      
      // Handle different endpoints with appropriate Supabase methods
      switch (method) {
        case 'GET': {
          if (id) {
            const { data: result, error } = await supabase
              .from(resource)
              .select('*')
              .eq('id', id)
              .single();
              
            return error ? { error: { message: error.message } } : { data: result as unknown as T };
          } else {
            // Check if we need to apply any filters based on query params
            let query = supabase.from(resource).select('*');
            
            // Apply filters if present in the endpoint (e.g. 'contribution_zones?project_id=123')
            for (const [key, value] of Object.entries(Object.fromEntries(queryParams))) {
              query = query.eq(key, value);
            }
            
            const { data: result, error } = await query;
              
            return error ? { error: { message: error.message } } : { data: result as unknown as T };
          }
        }
        
        case 'POST': {
          const { data: insertResult, error: insertError } = await supabase
            .from(resource)
            .insert(data)
            .select();
            
          return insertError 
            ? { error: { message: insertError.message } } 
            : { data: insertResult as unknown as T };
        }
          
        case 'PUT':
        case 'PATCH': {
          if (!id) return { error: { message: 'ID is required for update operations' } };
          
          const { data: updateResult, error: updateError } = await supabase
            .from(resource)
            .update(data)
            .eq('id', id)
            .select();
            
          return updateError 
            ? { error: { message: updateError.message } } 
            : { data: updateResult as unknown as T };
        }
            
        case 'DELETE': {
          if (!id) return { error: { message: 'ID is required for delete operations' } };
          
          const { error: deleteError } = await supabase
            .from(resource)
            .delete()
            .eq('id', id);
            
          return deleteError 
            ? { error: { message: deleteError.message } } 
            : { data: { success: true } as unknown as T };
        }
            
        default:
          return { error: { message: `Unsupported method: ${method}` } };
      }
    } catch (error) {
      console.error('Supabase request error:', error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
        },
      };
    }
  }

  // Convenience methods
  async get<T = any>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'GET', undefined, options);
  }

  async post<T = any>(endpoint: string, data: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', data, options);
  }

  async put<T = any>(endpoint: string, data: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PUT', data, options);
  }

  async delete<T = any>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE', undefined, options);
  }
}

// Create and export a singleton instance
export const api = new ApiClient();
