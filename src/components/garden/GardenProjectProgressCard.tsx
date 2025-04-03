
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, Download } from 'lucide-react';

interface GardenProjectProgressCardProps {
  zonesCount: number;
  completedZonesCount: number;
  onIntegrateClick: () => void;
}

const GardenProjectProgressCard: React.FC<GardenProjectProgressCardProps> = ({ 
  zonesCount, 
  completedZonesCount,
  onIntegrateClick
}) => {
  const calculateCompletion = () => {
    if (!zonesCount) return 0;
    return Math.round((completedZonesCount / zonesCount) * 100);
  };

  const completion = calculateCompletion();

  return (
    <Card className="bg-muted/30 w-full md:w-64">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Project Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion</span>
            <span className="font-medium">{completion}%</span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${completion}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center text-sm pt-2">
            <div className="flex items-center">
              <FileText className="mr-1 h-4 w-4" />
              <span>{zonesCount} Zones</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <span>3 Contributors</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={completion === 100 ? "default" : "outline"} onClick={onIntegrateClick}>
          <Download className="mr-2 h-4 w-4" />
          Integrate Outputs
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GardenProjectProgressCard;
