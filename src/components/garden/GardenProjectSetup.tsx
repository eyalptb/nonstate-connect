
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { createContributionZone } from '@/services/projectService2';
import { GardenTemplate } from '@/data/gardenTemplates';
import { ArrowLeft, FileText, Plus, User } from 'lucide-react';

// Form validation schema for a zone
const zoneSchema = z.object({
  zone_name: z.string().min(3, "Zone name must be at least 3 characters"),
  task_description: z.string().min(10, "Task description must be at least 10 characters"),
  expected_outputs: z.string().min(5, "Expected outputs must be at least 5 characters"),
  assignee: z.string().optional(),
});

type ZoneFormValues = z.infer<typeof zoneSchema>;

const GardenProjectSetup = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [zones, setZones] = useState<any[]>([]);

  // Extract data passed through navigation state
  const isNewProject = location.state?.isNewProject || false;
  const projectData = location.state?.projectData || null;
  const template = location.state?.template as GardenTemplate | null;

  const form = useForm<ZoneFormValues>({
    resolver: zodResolver(zoneSchema),
    defaultValues: {
      zone_name: '',
      task_description: '',
      expected_outputs: '',
      assignee: '',
    }
  });

  useEffect(() => {
    // Pre-fill zones from template if available
    if (template && isNewProject) {
      const templateZones = template.zones.map(zone => ({
        zone_name: zone.name,
        task_description: zone.task_description,
        expected_outputs: zone.expected_outputs,
        assignee: '',
        isTemplate: true,
      }));
      setZones(templateZones);
    }
  }, [template, isNewProject]);

  const handleAddZone = async (values: ZoneFormValues) => {
    if (!projectId) return;

    try {
      setLoading(true);
      // First, add to local state for immediate UI feedback
      setZones([...zones, { ...values, isNew: true }]);

      // Now create in the backend
      await createContributionZone({
        project_id: projectId,
        task_description: values.task_description,
        expected_outputs: values.expected_outputs,
        inputs: { zone_name: values.zone_name },
        assigned_user_id: values.assignee || null,
      });

      toast.success("Contribution zone added");
      form.reset({
        zone_name: '',
        task_description: '',
        expected_outputs: '',
        assignee: '',
      });
    } catch (error) {
      console.error('Error creating zone:', error);
      toast.error("Failed to create contribution zone");
      // Remove from local state if backend creation failed
      setZones(zones.filter(z => !z.isNew));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplatedZones = async () => {
    if (!projectId || !zones.length) return;
    
    setLoading(true);
    try {
      // Create all template zones in the backend
      for (const zone of zones) {
        if (zone.isTemplate) {
          await createContributionZone({
            project_id: projectId,
            task_description: zone.task_description,
            expected_outputs: zone.expected_outputs,
            inputs: { zone_name: zone.zone_name },
            assigned_user_id: zone.assignee || null,
          });
        }
      }
      
      toast.success("All contribution zones created");
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Error creating template zones:', error);
      toast.error("Failed to create some contribution zones");
    } finally {
      setLoading(false);
    }
  };

  const goToProject = () => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        variant="outline" 
        className="mb-6" 
        onClick={() => navigate(`/projects/${projectId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Project
      </Button>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Set Up Contribution Zones</CardTitle>
          <CardDescription>
            Define collaborative work areas for your garden project
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isNewProject && template && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Template Zones</h3>
              <Accordion type="single" collapsible className="w-full">
                {zones.filter(z => z.isTemplate).map((zone, index) => (
                  <AccordionItem key={`template-${index}`} value={`template-${index}`}>
                    <AccordionTrigger className="hover:bg-muted/40 px-4">
                      <div className="flex items-center text-left">
                        <FileText className="mr-2 h-4 w-4 text-primary" />
                        {zone.zone_name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Task Description</h4>
                          <p className="text-muted-foreground">{zone.task_description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Expected Outputs</h4>
                          <p className="text-muted-foreground">{zone.expected_outputs}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Assign To (Optional)</h4>
                          <Select 
                            onValueChange={(value) => {
                              const updatedZones = [...zones];
                              updatedZones[index].assignee = value;
                              setZones(updatedZones);
                            }}
                            value={zone.assignee || ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user1">Volunteer 1</SelectItem>
                              <SelectItem value="ai_agent">AI Agent</SelectItem>
                              <SelectItem value="user2">Volunteer 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-4 flex justify-end">
                <Button onClick={handleCreateTemplatedZones} disabled={loading}>
                  {loading ? "Creating..." : "Use Template Zones"}
                </Button>
              </div>
              
              <div className="my-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or create custom zones
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddZone)} className="space-y-6">
              <FormField
                control={form.control}
                name="zone_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zone Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Site Layout" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this contribution area
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="task_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Create a layout for the garden including dimensions, bed placements..."
                        className="min-h-20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="expected_outputs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Outputs</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="A sketch or diagram of the garden layout with dimensions..."
                        className="min-h-20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign To (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user1">Volunteer 1</SelectItem>
                        <SelectItem value="ai_agent">AI Agent</SelectItem>
                        <SelectItem value="user2">Volunteer 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Who will be responsible for this task
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  <Plus className="mr-2 h-4 w-4" />
                  {loading ? "Adding..." : "Add Zone"}
                </Button>
              </div>
            </form>
          </Form>
          
          {zones.filter(z => !z.isTemplate).length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Custom Zones Added</h3>
              <Accordion type="single" collapsible className="w-full">
                {zones.filter(z => !z.isTemplate).map((zone, index) => (
                  <AccordionItem key={`custom-${index}`} value={`custom-${index}`}>
                    <AccordionTrigger className="hover:bg-muted/40 px-4">
                      <div className="flex items-center text-left">
                        <FileText className="mr-2 h-4 w-4 text-primary" />
                        {zone.zone_name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Task Description</h4>
                          <p className="text-muted-foreground">{zone.task_description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Expected Outputs</h4>
                          <p className="text-muted-foreground">{zone.expected_outputs}</p>
                        </div>
                        {zone.assignee && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="mr-1 h-4 w-4" />
                            Assigned to: {zone.assignee}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={goToProject}>
            Skip Setup
          </Button>
          <Button onClick={goToProject} disabled={loading}>
            {loading ? "Finishing..." : "Complete Setup"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GardenProjectSetup;
