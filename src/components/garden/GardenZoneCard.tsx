
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, Clock, User, Upload } from 'lucide-react';

interface GardenZoneCardProps {
  zone: any;
  hasOutput: boolean;
  onSubmitOutput: (zoneId: string) => void;
  onClick: () => void;
}

const GardenZoneCard: React.FC<GardenZoneCardProps> = ({ 
  zone, 
  hasOutput, 
  onSubmitOutput,
  onClick
}) => {
  // Extract zone name from inputs
  const getZoneName = (zone: any) => {
    if (zone.inputs && zone.inputs.zone_name) {
      return zone.inputs.zone_name;
    }
    return "Unnamed Zone";
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:border-green-200 ${
        hasOutput ? 'border-green-200 bg-green-50/50 dark:bg-green-950/10' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            {getZoneName(zone)}
          </div>
          {hasOutput ? (
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
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={(e) => {
            e.stopPropagation();
            onSubmitOutput(zone.id);
          }}
        >
          <Upload className="mr-1 h-4 w-4" />
          Submit Output
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GardenZoneCard;
