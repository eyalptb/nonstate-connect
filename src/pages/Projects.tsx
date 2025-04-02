
import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/contexts/AuthContext';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Folder, FolderOpen, Clock, Users, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

// Form validation schema
const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters")
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const Projects = () => {
  const { user } = useAuth();
  const { projects, loading, addProject } = useProjects();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const handleCreateProject = async (values: ProjectFormValues) => {
    const result = await addProject(values.name, values.description);
    if (result) {
      setCreateDialogOpen(false);
      form.reset();
    }
  };

  return (
    <Container className="py-8">
      <PageHeader
        title="Secure Collaboration Projects"
        description="Create and manage projects with private contribution zones"
      />

      <div className="flex justify-between items-center my-6">
        <Tabs defaultValue="my-projects" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="my-projects">My Projects</TabsTrigger>
              <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Create a new secure collaboration project with privacy-first contribution zones.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateProject)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter project name" {...field} />
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
                              placeholder="Describe the project and its objectives" 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button type="submit">Create Project</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="my-projects">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="border border-muted h-48 animate-pulse">
                    <div className="h-full bg-muted/20"></div>
                  </Card>
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <Link key={project.id} to={`/projects/${project.id}`}>
                    <Card className="border hover:border-primary/50 transition-all hover:shadow-md cursor-pointer h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FolderOpen className="mr-2 h-5 w-5 text-primary" />
                          {project.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center mb-1">
                            <Clock className="mr-2 h-4 w-4" />
                            Created: {new Date(project.created_at).toLocaleDateString()}
                          </div>
                          {/* In a real app, we would fetch and display the number of zones and contributors */}
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            Contributors: -
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
                <Folder className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No projects yet</h3>
                <p className="mt-1 text-sm text-muted-foreground mb-4">
                  Create your first project to get started with secure collaboration
                </p>
                <Button onClick={() => setCreateDialogOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="assigned">
            <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
              <Users className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No tasks assigned</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You'll see projects where you've been assigned tasks here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No recent activity</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your recently accessed projects will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default Projects;
