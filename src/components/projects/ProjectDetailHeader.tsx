
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectDetailHeaderProps {
  projectName: string;
  projectDescription: string;
}

const ProjectDetailHeader: React.FC<ProjectDetailHeaderProps> = ({ 
  projectName, 
  projectDescription 
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Button 
        variant="outline" 
        className="mb-6" 
        onClick={() => navigate('/projects')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Button>
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{projectName}</h1>
          <p className="text-muted-foreground mt-2">{projectDescription}</p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" /> Project Settings
        </Button>
      </div>
    </>
  );
};

export default ProjectDetailHeader;
