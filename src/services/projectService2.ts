
import { api } from './apiClient';
import { Project, ContributionZone, Output } from '@/types/projects';

/**
 * Enhanced project service that uses the API client
 * This will make it easier to switch from Supabase to your custom backend
 */

// Project-related functions
export const fetchUserProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>('projects');
  
  if (response.error) {
    console.error('Error fetching projects:', response.error);
    throw new Error(response.error.message);
  }
  
  return response.data || [];
};

export const fetchProjectById = async (projectId: string): Promise<Project | null> => {
  const response = await api.get<Project>(`projects/${projectId}`);
  
  if (response.error) {
    console.error(`Error fetching project ${projectId}:`, response.error);
    throw new Error(response.error.message);
  }
  
  return response.data || null;
};

export const createProject = async (
  projectData: Pick<Project, "name" | "description">
): Promise<Project> => {
  // Get the current user's ID from the session to set as owner
  const { data: sessionData } = await api.get('auth/session');
  
  // Safe check for user ID
  const userId = sessionData && typeof sessionData === 'object' ? 
    (sessionData as any).user?.id : null;
  
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const response = await api.post<Project>('projects', { 
    ...projectData, 
    owner_id: userId 
  });
  
  if (response.error) {
    console.error('Error creating project:', response.error);
    throw new Error(response.error.message);
  }
  
  return response.data as Project;
};

export const updateProject = async (
  projectId: string,
  updates: Partial<Pick<Project, "name" | "description">>
): Promise<Project> => {
  const response = await api.put<Project>(`projects/${projectId}`, updates);
  
  if (response.error) {
    console.error(`Error updating project ${projectId}:`, response.error);
    throw new Error(response.error.message);
  }
  
  return response.data as Project;
};

// Contribution Zone functions
export const fetchProjectZones = async (projectId: string): Promise<ContributionZone[]> => {
  // Custom endpoint for filtering by project_id
  const response = await api.get<ContributionZone[]>(`contribution_zones?project_id=${projectId}`);
  
  if (response.error) {
    console.error(`Error fetching zones for project ${projectId}:`, response.error);
    throw new Error(response.error.message);
  }
  
  return response.data || [];
};

export const createContributionZone = async (
  zoneData: Pick<ContributionZone, "project_id" | "task_description" | "inputs" | "expected_outputs" | "assigned_user_id">
): Promise<ContributionZone> => {
  const response = await api.post<ContributionZone>('contribution_zones', zoneData);
  
  if (response.error) {
    console.error('Error creating contribution zone:', response.error);
    throw new Error(response.error.message);
  }
  
  return response.data as ContributionZone;
};

// Output functions
export const fetchZoneOutputs = async (zoneId: string): Promise<Output[]> => {
  // Custom endpoint for filtering by zone_id
  const response = await api.get<Output[]>(`outputs?zone_id=${zoneId}`);
  
  if (response.error) {
    console.error(`Error fetching outputs for zone ${zoneId}:`, response.error);
    throw new Error(response.error.message);
  }
  
  return response.data || [];
};

export const submitOutput = async (
  outputData: Pick<Output, "zone_id" | "file_url">
): Promise<Output> => {
  // Get the current user's ID
  const { data: sessionData } = await api.get('auth/session');
  
  // Safe check for user ID
  const userId = sessionData && typeof sessionData === 'object' ? 
    (sessionData as any).user?.id : null;
  
  if (!userId) {
    throw new Error('User not authenticated');
  }
  
  const response = await api.post<Output>('outputs', {
    ...outputData,
    submitted_by: userId
  });
  
  if (response.error) {
    console.error('Error submitting output:', response.error);
    throw new Error(response.error.message);
  }
  
  return response.data as Output;
};
