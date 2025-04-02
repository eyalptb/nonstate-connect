
import { supabase } from "@/integrations/supabase/client";
import { Project, ContributionZone, Output } from "@/types/projects";

// Project-related functions
export const fetchUserProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
  
  return data || [];
};

export const fetchProjectById = async (projectId: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();
    
  if (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    throw error;
  }
  
  return data;
};

export const createProject = async (
  projectData: Pick<Project, "name" | "description">
): Promise<Project> => {
  const { data, error } = await supabase
    .from("projects")
    .insert([projectData])
    .select()
    .single();
    
  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }
  
  return data;
};

export const updateProject = async (
  projectId: string,
  updates: Partial<Pick<Project, "name" | "description">>
): Promise<Project> => {
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", projectId)
    .select()
    .single();
    
  if (error) {
    console.error(`Error updating project ${projectId}:`, error);
    throw error;
  }
  
  return data;
};

// Contribution Zone functions
export const fetchProjectZones = async (projectId: string): Promise<ContributionZone[]> => {
  const { data, error } = await supabase
    .from("contribution_zones")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });
    
  if (error) {
    console.error(`Error fetching zones for project ${projectId}:`, error);
    throw error;
  }
  
  return data || [];
};

export const createContributionZone = async (
  zoneData: Pick<ContributionZone, "project_id" | "task_description" | "inputs" | "expected_outputs" | "assigned_user_id">
): Promise<ContributionZone> => {
  const { data, error } = await supabase
    .from("contribution_zones")
    .insert([zoneData])
    .select()
    .single();
    
  if (error) {
    console.error("Error creating contribution zone:", error);
    throw error;
  }
  
  return data;
};

// Output functions
export const fetchZoneOutputs = async (zoneId: string): Promise<Output[]> => {
  const { data, error } = await supabase
    .from("outputs")
    .select("*")
    .eq("zone_id", zoneId)
    .order("submitted_at", { ascending: false });
    
  if (error) {
    console.error(`Error fetching outputs for zone ${zoneId}:`, error);
    throw error;
  }
  
  return data || [];
};

export const submitOutput = async (
  outputData: Pick<Output, "zone_id" | "file_url">
): Promise<Output> => {
  const { data, error } = await supabase
    .from("outputs")
    .insert([outputData])
    .select()
    .single();
    
  if (error) {
    console.error("Error submitting output:", error);
    throw error;
  }
  
  return data;
};
