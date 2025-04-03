
/**
 * API configuration for backend services
 */

// Backend service types
export type BackendService = 'supabase' | 'custom';

// API configuration
export interface ApiConfig {
  baseUrl: string;
  service: BackendService;
  version: string;
}

// Default configuration using Supabase
export const apiConfig: ApiConfig = {
  baseUrl: 'https://wnetelqsdbiacotgfxib.supabase.co', // Will be replaced with DigitalOcean URL later
  service: 'supabase',
  version: 'v1',
};

// Toggle this to switch between Supabase and custom backend
export const useCustomBackend = false;

// This will be your DigitalOcean API URL when ready
export const DIGITALOCEAN_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
