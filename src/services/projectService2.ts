
import { api } from './apiClient';

// Project-related functions
export const fetchUserProjects = async () => {
  const response = await api.get('projects');
  
  if (response.error) {
    console.error('Error fetching projects:', response.error);
    throw new Error(response.error.message);
  }
  
  return response.data || [];
};

export const fetchProjectById = async (projectId: string) => {
  const response = await api.get(`projects/${projectId}`);
  
  if (response.error) {
    console.error(`Error fetching project ${projectId}:`, response.error);
    throw new Error(response.error.message);
  }
  
  return response.data || null;
};

export const createProject = async (projectData: { name: string; description: string }) => {
  // Get the current user's ID from the session to set as owner
  const { data: sessionData } = await api.get('auth/session');
  
  // Safe check for user ID
  const userId = sessionData && typeof sessionData === 'object' ? 
    (sessionData as any).user?.id : null;
  
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const response = await api.post('projects', { 
    ...projectData, 
    owner_id: userId 
  });
  
  if (response.error) {
    console.error('Error creating project:', response.error);
    throw new Error(response.error.message);
  }
  
  return response.data;
};

export const updateProject = async (projectId: string, updates: { name?: string; description?: string }) => {
  const response = await api.put(`projects/${projectId}`, updates);
  
  if (response.error) {
    console.error(`Error updating project ${projectId}:`, response.error);
    throw new Error(response.error.message);
  }
  
  return response.data;
};

// Contribution Zone functions
export const fetchProjectZones = async (projectId: string) => {
  // Custom endpoint for filtering by project_id
  const response = await api.get(`contribution_zones`, { project_id: projectId });
  
  if (response.error) {
    console.error(`Error fetching zones for project ${projectId}:`, response.error);
    throw new Error(response.error.message);
  }
  
  return response.data || [];
};

export const createContributionZone = async (zoneData: {
  project_id: string;
  task_description: string;
  inputs: any;
  expected_outputs: any;
  assigned_user_id?: string;
}) => {
  const response = await api.post('contribution_zones', zoneData);
  
  if (response.error) {
    console.error('Error creating contribution zone:', response.error);
    throw new Error(response.error.message);
  }
  
  return response.data;
};

// Output functions
export const fetchZoneOutputs = async (zoneId: string) => {
  // Custom endpoint for filtering by zone_id
  const response = await api.get(`outputs`, { zone_id: zoneId });
  
  if (response.error) {
    console.error(`Error fetching outputs for zone ${zoneId}:`, response.error);
    throw new Error(response.error.message);
  }
  
  return response.data || [];
};

export const submitOutput = async (outputData: { zone_id: string; file_url: string }) => {
  // Get the current user's ID
  const { data: sessionData } = await api.get('auth/session');
  
  // Safe check for user ID
  const userId = sessionData && typeof sessionData === 'object' ? 
    (sessionData as any).user?.id : null;
  
  if (!userId) {
    throw new Error('User not authenticated');
  }
  
  const response = await api.post('outputs', {
    ...outputData,
    submitted_by: userId
  });
  
  if (response.error) {
    console.error('Error submitting output:', response.error);
    throw new Error(response.error.message);
  }
  
  return response.data;
};
