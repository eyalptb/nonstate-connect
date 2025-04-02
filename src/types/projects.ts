
export type Project = {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
};

export type ContributionZone = {
  id: string;
  project_id: string;
  task_description: string;
  inputs: Record<string, any> | null;
  expected_outputs: string | null;
  assigned_user_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Output = {
  id: string;
  zone_id: string;
  file_url: string | null;
  submitted_by: string;
  submitted_at: string;
};

// Adding database type definitions for Supabase
export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>;
      };
      contribution_zones: {
        Row: ContributionZone;
        Insert: Omit<ContributionZone, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ContributionZone, 'id' | 'created_at' | 'updated_at'>>;
      };
      outputs: {
        Row: Output;
        Insert: Omit<Output, 'id' | 'submitted_at'>;
        Update: Partial<Omit<Output, 'id' | 'submitted_at'>>;
      };
    };
  };
};
