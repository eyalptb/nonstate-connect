
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GardenProject } from '@/types/garden';

interface GardenProjectHeaderProps {
  project: GardenProject;
}

const GardenProjectHeader: React.FC<GardenProjectHeaderProps> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button 
        variant="outline" 
        className="mb-6" 
        onClick={() => navigate('/garden')}
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
          
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags?.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            )) || (
              <>
                <Badge variant="outline">sustainable</Badge>
                <Badge variant="outline">garden</Badge>
                <Badge variant="outline">community</Badge>
                <Badge variant="outline">local</Badge>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GardenProjectHeader;
