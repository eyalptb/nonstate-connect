
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GardenZonesTab from './GardenZonesTab';
import ContributorsTab from './ContributorsTab';
import FinalPlanTab from './FinalPlanTab';

interface GardenProjectTabsProps {
  zones: any[];
  outputs: Record<string, any[]>;
  projectId?: string;
  completion: number;
  onZoneClick: (zone: any) => void;
  onSubmitOutput: (zoneId: string) => void;
  onIntegrateClick: () => void;
}

const GardenProjectTabs: React.FC<GardenProjectTabsProps> = ({
  zones,
  outputs,
  projectId,
  completion,
  onZoneClick,
  onSubmitOutput,
  onIntegrateClick,
}) => {
  return (
    <Tabs defaultValue="zones" className="space-y-6">
      <TabsList>
        <TabsTrigger value="zones">Contribution Zones</TabsTrigger>
        <TabsTrigger value="contributors">Contributors</TabsTrigger>
        <TabsTrigger value="plan">Final Plan</TabsTrigger>
      </TabsList>
      
      <TabsContent value="zones">
        <GardenZonesTab 
          zones={zones}
          outputs={outputs}
          projectId={projectId}
          onZoneClick={onZoneClick}
          onSubmitOutput={onSubmitOutput}
        />
      </TabsContent>
      
      <TabsContent value="contributors">
        <ContributorsTab />
      </TabsContent>
      
      <TabsContent value="plan">
        <FinalPlanTab 
          isCompleted={completion === 100}
          onPreviewClick={onIntegrateClick}
        />
      </TabsContent>
    </Tabs>
  );
};

export default GardenProjectTabs;
