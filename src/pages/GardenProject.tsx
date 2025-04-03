
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjectById, fetchProjectZones, fetchZoneOutputs } from '@/services/projectService2';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { GardenProject as GardenProjectType } from '@/types/garden';

import GardenProjectHeader from '@/components/garden/GardenProjectHeader';
import GardenProjectProgressCard from '@/components/garden/GardenProjectProgressCard';
import ImpactGoalCard from '@/components/garden/ImpactGoalCard';
import GardenZonesTab from '@/components/garden/GardenZonesTab';
import ContributorsTab from '@/components/garden/ContributorsTab';
import FinalPlanTab from '@/components/garden/FinalPlanTab';
import IntegrationDialog from '@/components/garden/IntegrationDialog';

const GardenProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<GardenProjectType | null>(null);
  const [zones, setZones] = useState<any[]>([]);
  const [outputs, setOutputs] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [integrationDialogOpen, setIntegrationDialogOpen] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const loadData = async () => {
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
    };

    loadData();
  }, [projectId, navigate, toast]);

  // Calculate project completion percentage
  const calculateCompletion = () => {
    if (!zones.length) return 0;
    
    const completedZones = Object.keys(outputs).filter(zoneId => 
      outputs[zoneId] && outputs[zoneId].length > 0
    ).length;
    
    return Math.round((completedZones / zones.length) * 100);
  };

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

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4 max-w-5xl mx-auto">
          <div className="h-8 bg-muted/20 rounded w-1/3"></div>
          <div className="h-4 bg-muted/20 rounded w-1/2"></div>
          <div className="h-[400px] bg-muted/20 rounded mt-8"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const completion = calculateCompletion();

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        <GardenProjectHeader project={project} />
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <GardenProjectProgressCard 
            zonesCount={zones.length} 
            completedZonesCount={Object.keys(outputs).filter(zoneId => 
              outputs[zoneId] && outputs[zoneId].length > 0
            ).length}
            onIntegrateClick={() => setIntegrationDialogOpen(true)}
          />
        </div>
        
        <ImpactGoalCard impactGoal={project.impact_goal} />
        
        <Tabs defaultValue="zones" className="space-y-6">
          <TabsList>
            <TabsTrigger value="zones">Contribution Zones</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
            <TabsTrigger value="plan">Final Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="zones">
            <GardenZonesTab 
              zones={zones}
              outputs={outputs}
              projectId={projectId}
              onZoneClick={setSelectedZone}
              onSubmitOutput={handleSubmitOutput}
            />
          </TabsContent>
          
          <TabsContent value="contributors">
            <ContributorsTab />
          </TabsContent>
          
          <TabsContent value="plan">
            <FinalPlanTab 
              isCompleted={completion === 100}
              onPreviewClick={() => setIntegrationDialogOpen(true)}
            />
          </TabsContent>
        </Tabs>
        
        <IntegrationDialog
          open={integrationDialogOpen}
          onOpenChange={setIntegrationDialogOpen}
          zones={zones}
          outputs={outputs}
          onIntegrateOutputs={handleIntegrateOutputs}
        />
      </div>
    </div>
  );
};

export default GardenProject;
