
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjectById, fetchProjectZones, fetchZoneOutputs } from '@/services/projectService2';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  Leaf, 
  Download, 
  FileText, 
  CheckCircle, 
  Clock, 
  User, 
  Users, 
  Upload 
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

const GardenProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
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

  // Extract zone name from inputs
  const getZoneName = (zone: any) => {
    if (zone.inputs && zone.inputs.zone_name) {
      return zone.inputs.zone_name;
    }
    return "Unnamed Zone";
  };

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

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-5xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-6" 
          onClick={() => navigate('/projects')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <div className="flex items-center">
              <Leaf className="mr-2 h-6 w-6 text-green-600" />
              <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            </div>
            <p className="text-muted-foreground mt-2">{project.description}</p>
            
            {/* Tags would be displayed here in a real app */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">sustainable</Badge>
              <Badge variant="outline">garden</Badge>
              <Badge variant="outline">community</Badge>
              <Badge variant="outline">local</Badge>
            </div>
          </div>
          
          <Card className="bg-muted/30 w-full md:w-64">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion</span>
                  <span className="font-medium">{calculateCompletion()}%</span>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${calculateCompletion()}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-sm pt-2">
                  <div className="flex items-center">
                    <FileText className="mr-1 h-4 w-4" />
                    <span>{zones.length} Zones</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    <span>3 Contributors</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={integrationDialogOpen} onOpenChange={setIntegrationDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" variant={calculateCompletion() === 100 ? "default" : "outline"}>
                    <Download className="mr-2 h-4 w-4" />
                    Integrate Outputs
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Integrate Project Outputs</DialogTitle>
                    <DialogDescription>
                      Combine all zone outputs into a final comprehensive garden plan
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 my-4">
                    <div className="border rounded-md p-4 bg-muted/20">
                      <h3 className="font-medium mb-2">Available Outputs</h3>
                      <ul className="space-y-2">
                        {zones.map((zone) => (
                          <li key={zone.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4" />
                              <span>{getZoneName(zone)}</span>
                            </div>
                            {outputs[zone.id] && outputs[zone.id].length > 0 ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-amber-500" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {calculateCompletion() === 100 
                        ? "All zones have outputs ready for integration." 
                        : "Some zones don't have outputs yet. You can still create a partial plan."}
                    </p>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIntegrationDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleIntegrateOutputs}>
                      Generate Integrated Plan
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
        
        {/* Impact Goal Section */}
        <Card className="mb-8 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-950">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Leaf className="mr-2 h-5 w-5 text-green-600" />
              Impact Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create a sustainable food source for the community while reducing carbon footprint through local produce.</p>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="zones" className="space-y-6">
          <TabsList>
            <TabsTrigger value="zones">Contribution Zones</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
            <TabsTrigger value="plan">Final Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="zones">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {zones.map((zone) => (
                <Card 
                  key={zone.id} 
                  className={`cursor-pointer transition-all hover:border-green-200 ${
                    outputs[zone.id] && outputs[zone.id].length > 0 ? 'border-green-200 bg-green-50/50 dark:bg-green-950/10' : ''
                  }`}
                  onClick={() => setSelectedZone(zone)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-primary" />
                        {getZoneName(zone)}
                      </div>
                      {outputs[zone.id] && outputs[zone.id].length > 0 ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">
                          <CheckCircle className="mr-1 h-3 w-3" /> Completed
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <Clock className="mr-1 h-3 w-3" /> In Progress
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {zone.task_description}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="mr-1 h-4 w-4" />
                      {zone.assigned_user_id ? "Assigned" : "Unassigned"}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" onClick={(e) => {
                      e.stopPropagation();
                      handleSubmitOutput(zone.id);
                    }}>
                      <Upload className="mr-1 h-4 w-4" />
                      Submit Output
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {zones.length === 0 && (
              <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No contribution zones yet</h3>
                <p className="mt-1 text-sm text-muted-foreground mb-4">
                  Add zones to start breaking down this project into secure tasks
                </p>
                <Button onClick={() => navigate(`/projects/${projectId}/setup`)}>
                  Set Up Zones
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="contributors">
            <Card>
              <CardHeader>
                <CardTitle>Project Contributors</CardTitle>
                <CardDescription>
                  Team members working on this garden project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-md">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">EW</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Eco Warrior</h3>
                      <p className="text-sm text-muted-foreground">Project Owner</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 border rounded-md">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">V1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Volunteer 1</h3>
                      <p className="text-sm text-muted-foreground">Site Layout Specialist</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 border rounded-md">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">AI</span>
                    </div>
                    <div>
                      <h3 className="font-medium">AI Agent</h3>
                      <p className="text-sm text-muted-foreground">Plant Selection Advisor</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 border rounded-md">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">V2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Volunteer 2</h3>
                      <p className="text-sm text-muted-foreground">Resource Coordinator</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="plan">
            {calculateCompletion() === 100 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Green Haven Community Garden Plan</CardTitle>
                  <CardDescription>
                    Integrated output from all contribution zones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Site Layout</h3>
                      <div className="border p-4 rounded-md bg-muted/10">
                        <div className="text-center p-8 border-2 border-dashed mb-4">
                          [Garden Layout Sketch Placeholder]
                        </div>
                        <p className="text-sm">
                          A 20ft x 30ft garden area with 6 raised beds, a composting station, tool shed, and water catchment system.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Plant Selection</h3>
                      <div className="border p-4 rounded-md bg-muted/10">
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Tomatoes (Cherry & Beefsteak)</span>
                            <span className="text-muted-foreground">12 plants</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Basil</span>
                            <span className="text-muted-foreground">8 plants</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Kale</span>
                            <span className="text-muted-foreground">6 plants</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Zucchini</span>
                            <span className="text-muted-foreground">4 plants</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Bell Peppers</span>
                            <span className="text-muted-foreground">8 plants</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Resource List</h3>
                      <div className="border p-4 rounded-md bg-muted/10">
                        <div className="divide-y">
                          <div className="py-2 flex justify-between">
                            <span>Raised Bed Lumber</span>
                            <span className="font-medium">$120</span>
                          </div>
                          <div className="py-2 flex justify-between">
                            <span>Organic Soil Mix</span>
                            <span className="font-medium">$240</span>
                          </div>
                          <div className="py-2 flex justify-between">
                            <span>Garden Tools</span>
                            <span className="font-medium">$85</span>
                          </div>
                          <div className="py-2 flex justify-between">
                            <span>Seeds and Seedlings</span>
                            <span className="font-medium">$65</span>
                          </div>
                          <div className="py-2 flex justify-between">
                            <span>Rainwater Collection System</span>
                            <span className="font-medium">$150</span>
                          </div>
                          <div className="py-2 flex justify-between font-medium">
                            <span>Total</span>
                            <span>$660</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export as PDF
                  </Button>
                  <Button>Share Plan</Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Final Plan</CardTitle>
                  <CardDescription>
                    Once all zones are completed, the integrated plan will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Plan not ready yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground mb-4">
                      {calculateCompletion()}% of contribution zones have been completed
                    </p>
                    <Button onClick={() => setIntegrationDialogOpen(true)}>
                      Preview with Existing Outputs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GardenProject;
