
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  fetchUserProjects, 
  createProject,
  updateProject,
  fetchProjectById
} from '@/services/projectService';
import { Project } from '@/types/projects';

export const useProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all projects for the current user
  const fetchProjects = useCallback(async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const projectsData = await fetchUserProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast, user]);

  // Create a new project
  const addProject = async (name: string, description: string) => {
    if (!user) return null;
    
    try {
      const newProject = await createProject({ name, description });
      setProjects(prev => [newProject, ...prev]);
      toast({
        title: "Success",
        description: `Project "${name}" created successfully`
      });
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive"
      });
      return null;
    }
  };

  // Update an existing project
  const editProject = async (projectId: string, updates: { name?: string; description?: string }) => {
    if (!user) return null;
    
    try {
      const updatedProject = await updateProject(projectId, updates);
      setProjects(prev => 
        prev.map(p => p.id === projectId ? updatedProject : p)
      );
      toast({
        title: "Success",
        description: "Project updated successfully"
      });
      return updatedProject;
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive"
      });
      return null;
    }
  };

  // Fetch a single project by ID
  const getProject = async (projectId: string) => {
    if (!user) return null;
    
    try {
      return await fetchProjectById(projectId);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast({
        title: "Error",
        description: "Failed to load project details",
        variant: "destructive"
      });
      return null;
    }
  };

  // Initial data load
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    fetchProjects,
    addProject,
    editProject,
    getProject
  };
};
