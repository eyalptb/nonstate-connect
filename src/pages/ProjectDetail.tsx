
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { Container } from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Users, FileText } from 'lucide-react';
import { ContributionZone } from '@/types/projects';
import { fetchProjectZones, createContributionZone } from '@/services/projectService';
import ProjectDetailHeader from '@/components/projects/ProjectDetailHeader';
import ContributionZoneForm, { ZoneFormValues } from '@/components/projects/ContributionZoneForm';
import ContributionZoneList from '@/components/projects/ContributionZoneList';
import EmptyState from '@/components/projects/EmptyState';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { getProject } = useProjects();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [zones, setZones] = useState<ContributionZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [createZoneOpen, setCreateZoneOpen] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const projectData = await getProject(projectId);
        if (projectData) {
          setProject(projectData);
          const zonesData = await fetchProjectZones(projectId);
          setZones(zonesData);
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
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [projectId, getProject, navigate, toast]);

  const handleCreateZone = async (values: ZoneFormValues) => {
    if (!project?.id) return;

    try {
      const newZone = await createContributionZone({
        project_id: project.id,
        task_description: values.task_description,
        expected_outputs: values.expected_outputs,
        inputs: null, // For simplicity we're not handling inputs in this initial version
        assigned_user_id: null // Unassigned by default
      });

      setZones(prev => [...prev, newZone]);
      setCreateZoneOpen(false);
      toast({
        title: "Success",
        description: "New contribution zone created"
      });
    } catch (error) {
      console.error('Error creating zone:', error);
      toast({
        title: "Error",
        description: "Failed to create contribution zone",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted/20 rounded w-1/3"></div>
          <div className="h-4 bg-muted/20 rounded w-1/2"></div>
          <div className="h-[400px] bg-muted/20 rounded mt-8"></div>
        </div>
      </Container>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <Container className="py-8">
      <ProjectDetailHeader 
        projectName={project.name} 
        projectDescription={project.description} 
      />
      
      <Tabs defaultValue="zones" className="space-y-6">
        <TabsList>
          <TabsTrigger value="zones">Contribution Zones</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="outputs">Outputs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="zones">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Contribution Zones</h2>
            
            <Dialog open={createZoneOpen} onOpenChange={setCreateZoneOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Zone
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Contribution Zone</DialogTitle>
                  <DialogDescription>
                    Create a private, secure task area with specific inputs and expected outputs.
                  </DialogDescription>
                </DialogHeader>
                
                <ContributionZoneForm onSubmit={handleCreateZone} />
              </DialogContent>
            </Dialog>
          </div>
          
          <ContributionZoneList zones={zones} />
          
          {zones.length === 0 && (
            <EmptyState
              icon={FileText}
              title="No contribution zones yet"
              description="Create your first zone to start breaking down this project into secure tasks"
              buttonText="Create First Zone"
              onButtonClick={() => setCreateZoneOpen(true)}
            />
          )}
        </TabsContent>
        
        <TabsContent value="team">
          <EmptyState
            icon={Users}
            title="No team members yet"
            description="Invite contributors to work on specific tasks in your project"
            buttonText="Invite Collaborators"
            onButtonClick={() => {}}
          />
        </TabsContent>
        
        <TabsContent value="outputs">
          <EmptyState
            icon={FileText}
            title="No outputs yet"
            description="Completed tasks will generate outputs here"
          />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default ProjectDetail;
