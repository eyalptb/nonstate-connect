
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { fetchProjectById, fetchProjectZones, fetchZoneOutputs } from '@/services/projectService2';
import { GardenProject as GardenProjectType } from '@/types/garden';

export const useGardenProject = (projectId: string | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<GardenProjectType | null>(null);
  const [zones, setZones] = useState<any[]>([]);
  const [outputs, setOutputs] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [integrationDialogOpen, setIntegrationDialogOpen] = useState(false);

  const loadData = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    try {
      // Load project, zones, and outputs
      const projectData = await fetchProjectById(projectId);
      if (projectData) {
        setProject(projectData);
        
        const zonesData = await fetchProjectZones(projectId);
        setZones(zonesData);
        
        // For each zone, load its outputs
        const outputsData: Record<string, any[]> = {};
        for (const zone of zonesData) {
          const zoneOutputs = await fetchZoneOutputs(zone.id);
          outputsData[zone.id] = zoneOutputs;
        }
        setOutputs(outputsData);
      } else {
        navigate('/projects');
        toast({
          title: "Project not found",
          description: "The requested project could not be found",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error loading project data:', error);
      toast({
        title: "Error loading project",
        description: "Could not load project details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [projectId, navigate, toast]);

  // Mock function to handle output submission
  const handleSubmitOutput = (zoneId: string) => {
    toast({
      title: "Output submitted",
      description: "Your contribution has been securely stored",
    });
    // In a real app, this would upload a file and add it to the outputs
  };

  // Mock function to integrate outputs
  const handleIntegrateOutputs = () => {
    toast({
      title: "Outputs integrated",
      description: "Project plan has been combined and is ready for review",
    });
    setIntegrationDialogOpen(false);
  };

  // Initial data load
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    project,
    zones,
    outputs,
    loading,
    selectedZone,
    setSelectedZone,
    integrationDialogOpen,
    setIntegrationDialogOpen,
    handleSubmitOutput,
    handleIntegrateOutputs,
  };
};
