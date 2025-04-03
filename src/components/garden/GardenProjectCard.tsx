
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Clock, Users, ChevronRight } from 'lucide-react';

interface GardenProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    created_at: string;
  };
  className?: string;
}

const GardenProjectCard = ({ project, className }: GardenProjectCardProps) => {
  // Format the date
  const formattedDate = new Date(project.created_at).toLocaleDateString();
  
  return (
    <Link to={`/garden/${project.id}`}>
      <Card className={`h-full hover:border-green-200 transition-all hover:shadow-md cursor-pointer ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-green-600" />
            {project.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">sustainable</Badge>
            <Badge variant="outline">garden</Badge>
            <Badge variant="outline">community</Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center mb-1">
              <Clock className="mr-2 h-4 w-4" />
              Created: {formattedDate}
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Contributors: 3
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full mt-2 gap-1">
            View Project
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default GardenProjectCard;
