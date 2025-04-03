
export interface Project {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

// Define the GardenProject type to match the Project type with additional garden-specific fields
export interface GardenProject {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  impact_goal?: string;
}

// Add GardenTaskType for use in templates
export type GardenTaskType = 
  | 'planning'
  | 'design'
  | 'implementation'
  | 'maintenance'
  | 'documentation'
  | 'evaluation';
