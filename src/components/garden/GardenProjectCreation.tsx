
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { createProject } from '@/services/projectService2';
import { gardenTemplates } from '@/data/gardenTemplates';
import { CheckCircle, Leaf, Plus, Trash2 } from 'lucide-react';

// Form validation schema
const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  impact_goal: z.string().min(10, "Impact goal must be at least 10 characters"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const GardenProjectCreation = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [step, setStep] = useState<'details' | 'template' | 'zones'>('details');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      impact_goal: '',
    }
  });

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleTemplateSelect = (index: number) => {
    setSelectedTemplate(index);
    const template = gardenTemplates[index];
    form.setValue('name', template.name);
    form.setValue('description', template.description);
    form.setValue('impact_goal', template.impact_goal);
    setTags(template.tags);
  };

  const handleCreateProject = async (values: ProjectFormValues) => {
    setLoading(true);
    try {
      // Create the project
      const newProject = await createProject({
        name: values.name,
        description: values.description,
      });

      toast.success(`Project "${values.name}" created successfully`);
      
      // Navigate to the project detail page to set up zones
      navigate(`/projects/${newProject.id}/setup`, { 
        state: { 
          isNewProject: true,
          projectData: {
            ...newProject,
            impact_goal: values.impact_goal,
            tags
          },
          template: selectedTemplate !== null ? gardenTemplates[selectedTemplate] : null
        } 
      });
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl flex items-center justify-center">
          <Leaf className="mr-2 h-6 w-6 text-green-600" />
          Create Green Garden Project
        </CardTitle>
        <CardDescription>
          Plan your community garden collaboratively with secure contribution zones
        </CardDescription>
      </CardHeader>

      <Tabs defaultValue="details" className="w-full" onValueChange={(value) => setStep(value as any)}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="details">Project Details</TabsTrigger>
          <TabsTrigger value="template">Choose Template</TabsTrigger>
          <TabsTrigger value="zones">Zone Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>
                Provide basic details about your garden project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Green Haven Community Garden" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A collaborative project to create a sustainable community garden..."
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="impact_goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Impact Goal</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Create a sustainable food source for the community while reducing carbon footprint..."
                            className="min-h-20"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button 
                            type="button" 
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 h-4 w-4 rounded-full bg-muted-foreground/20 flex items-center justify-center hover:bg-muted-foreground/40"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add a tag" 
                        value={tagInput} 
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button type="button" size="sm" variant="outline" onClick={handleAddTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormDescription>
                      Add tags like "sustainable", "garden", "community", etc.
                    </FormDescription>
                  </FormItem>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button onClick={() => setStep('template')}>
                Next: Choose Template
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="template">
          <Card>
            <CardHeader>
              <CardTitle>Choose a Template</CardTitle>
              <CardDescription>
                Select a template or continue with your custom project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gardenTemplates.map((template, index) => (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all ${selectedTemplate === index ? 'border-green-500 border-2' : 'border'}`}
                    onClick={() => handleTemplateSelect(index)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {selectedTemplate === index && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <CardDescription className="line-clamp-2">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-sm">
                        <span className="font-medium">Zones:</span> {template.zones.length}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {template.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card 
                  className={`cursor-pointer border-dashed ${selectedTemplate === null ? 'border-green-500 border-2' : 'border'}`}
                  onClick={() => setSelectedTemplate(null)}
                >
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Custom Project</CardTitle>
                      {selectedTemplate === null && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <CardDescription>
                      Continue with your own custom project setup
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm">
                      Create your own zones and tasks from scratch
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('details')}>
                Back
              </Button>
              <Button onClick={() => form.handleSubmit(handleCreateProject)()}>
                {loading ? "Creating..." : "Create Project"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="zones">
          <Card>
            <CardHeader>
              <CardTitle>Set up Contribution Zones</CardTitle>
              <CardDescription>
                Define the collaboration zones for your garden project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">
                  First create the project, then you'll be able to set up contribution zones
                </p>
                <Button onClick={() => form.handleSubmit(handleCreateProject)()}>
                  {loading ? "Creating..." : "Create Project First"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GardenProjectCreation;
