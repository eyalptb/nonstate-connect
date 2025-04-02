
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
