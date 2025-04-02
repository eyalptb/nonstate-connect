
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ArrowLeft, 
  PlusCircle, 
  Users, 
  FileText, 
  Settings, 
  ChevronRight,
  User
} from 'lucide-react';
import { ContributionZone } from '@/types/projects';
import { fetchProjectZones, createContributionZone } from '@/services/projectService';

const zoneSchema = z.object({
  task_description: z.string().min(10, "Task description must be at least 10 characters"),
  expected_outputs: z.string().min(5, "Expected outputs must be at least 5 characters")
});

type ZoneFormValues = z.infer<typeof zoneSchema>;

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { getProject } = useProjects();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [zones, setZones] = useState<ContributionZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [createZoneOpen, setCreateZoneOpen] = useState(false);

  const zoneForm = useForm<ZoneFormValues>({
    resolver: zodResolver(zoneSchema),
    defaultValues: {
      task_description: '',
      expected_outputs: ''
    }
  });

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
      zoneForm.reset();
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
      <Button 
        variant="outline" 
        className="mb-6" 
        onClick={() => navigate('/projects')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Button>
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground mt-2">{project.description}</p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" /> Project Settings
        </Button>
      </div>

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
                
                <Form {...zoneForm}>
                  <form onSubmit={zoneForm.handleSubmit(handleCreateZone)} className="space-y-6">
                    <FormField
                      control={zoneForm.control}
                      name="task_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Task Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe what needs to be done in this contribution zone"
                              className="min-h-20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={zoneForm.control}
                      name="expected_outputs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Outputs</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe what deliverables should result from this task"
                              className="min-h-20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit">Create Zone</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          {zones.length > 0 ? (
            <div className="space-y-4">
              {zones.map(zone => (
                <Card key={zone.id} className="hover:border-primary/50 transition-all cursor-pointer">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-primary" />
                        <span className="line-clamp-1">{zone.task_description.substring(0, 60)}...</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4 px-4">
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="mr-1 h-4 w-4" />
                        {zone.assigned_user_id ? "Assigned" : "Unassigned"}
                      </div>
                      <div>
                        Created: {new Date(zone.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No contribution zones yet</h3>
              <p className="mt-1 text-sm text-muted-foreground mb-4">
                Create your first zone to start breaking down this project into secure tasks
              </p>
              <Button onClick={() => setCreateZoneOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create First Zone
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="team">
          <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
            <Users className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No team members yet</h3>
            <p className="mt-1 text-sm text-muted-foreground mb-4">
              Invite contributors to work on specific tasks in your project
            </p>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Invite Collaborators
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="outputs">
          <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No outputs yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Completed tasks will generate outputs here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default ProjectDetail;
