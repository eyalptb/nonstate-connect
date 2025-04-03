
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GardenProjectCard from '@/components/garden/GardenProjectCard';
import { Leaf, PlusCircle, Folder } from 'lucide-react';

const GardenProjects = () => {
  const navigate = useNavigate();
  const { projects, loading } = useProjects();

  // Filter to show only projects that appear to be garden projects
  // In a real app, you'd have a proper way to identify garden projects
  const gardenProjects = projects.filter(p => 
    p.name.toLowerCase().includes('garden') || 
    (p.description && p.description.toLowerCase().includes('garden'))
  );

  return (
    <Container className="py-8">
      <PageHeader
        title={
          <div className="flex items-center">
            <Leaf className="mr-2 h-6 w-6 text-green-600" />
            Green Garden Projects
          </div>
        }
        description="Plan and manage sustainable garden projects with secure collaboration"
      />

      <div className="flex justify-between items-center my-6">
        <Tabs defaultValue="all-gardens" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all-gardens">All Gardens</TabsTrigger>
              <TabsTrigger value="my-gardens">My Gardens</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <Button className="flex items-center" onClick={() => navigate('/garden/create')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Garden Project
            </Button>
          </div>

          <TabsContent value="all-gardens">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border border-muted h-48 animate-pulse">
                    <div className="h-full bg-muted/20"></div>
                  </div>
                ))}
              </div>
            ) : gardenProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gardenProjects.map(project => (
                  <GardenProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
                <Leaf className="h-12 w-12 mx-auto text-green-600" />
                <h3 className="mt-4 text-lg font-medium">No garden projects yet</h3>
                <p className="mt-1 text-sm text-muted-foreground mb-4">
                  Create your first green garden project to get started
                </p>
                <Button onClick={() => navigate('/garden/create')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Garden Project
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-gardens">
            <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
              <Folder className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No personal garden projects</h3>
              <p className="mt-1 text-sm text-muted-foreground mb-4">
                Create a garden project that you own and manage
              </p>
              <Button onClick={() => navigate('/garden/create')}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create First Garden
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
              <Leaf className="h-12 w-12 mx-auto text-green-600" />
              <h3 className="mt-4 text-lg font-medium">Community Gardens</h3>
              <p className="mt-1 text-sm text-muted-foreground mb-4">
                Explore public community garden projects
              </p>
              <Button variant="outline">
                Browse Community Gardens
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16 px-4 py-8 border-2 border-dashed border-green-200 rounded-lg bg-green-50/50 dark:bg-green-950/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
            <Leaf className="mr-2 h-6 w-6 text-green-600" />
            Garden Project Benefits
          </h2>
          <p className="mb-6 text-muted-foreground">
            Our secure collaboration platform makes planning community gardens easier and more effective
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <h3 className="font-bold mb-2">Secure Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Contributors work in isolated zones with encrypted data storage
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold mb-2">Environmental Impact</h3>
              <p className="text-sm text-muted-foreground">
                Track and measure the positive environmental effects of your garden
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold mb-2">Ready-Made Templates</h3>
              <p className="text-sm text-muted-foreground">
                Get started quickly with pre-configured garden project templates
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GardenProjects;
