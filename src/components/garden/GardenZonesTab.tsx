
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GardenZoneCard from './GardenZoneCard';

interface GardenZonesTabProps {
  zones: any[];
  outputs: Record<string, any[]>;
  projectId?: string;
  onZoneClick: (zone: any) => void;
  onSubmitOutput: (zoneId: string) => void;
}

const GardenZonesTab: React.FC<GardenZonesTabProps> = ({ 
  zones, 
  outputs, 
  projectId, 
  onZoneClick,
  onSubmitOutput 
}) => {
  const navigate = useNavigate();

  if (zones.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {zones.map((zone) => (
        <GardenZoneCard
          key={zone.id}
          zone={zone}
          hasOutput={outputs[zone.id] && outputs[zone.id].length > 0}
          onSubmitOutput={onSubmitOutput}
          onClick={() => onZoneClick(zone)}
        />
      ))}
    </div>
  );
};

export default GardenZonesTab;
