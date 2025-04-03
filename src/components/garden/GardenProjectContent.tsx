
import React from 'react';
import GardenProjectHeader from './GardenProjectHeader';
import GardenProjectProgressCard from './GardenProjectProgressCard';
import ImpactGoalCard from './ImpactGoalCard';
import GardenProjectTabs from './GardenProjectTabs';
import { GardenProject } from '@/types/garden';

interface GardenProjectContentProps {
  project: GardenProject;
  zones: any[];
  outputs: Record<string, any[]>;
  projectId?: string;
  onZoneClick: (zone: any) => void;
  onSubmitOutput: (zoneId: string) => void;
  onIntegrateClick: () => void;
}

const GardenProjectContent: React.FC<GardenProjectContentProps> = ({
  project,
  zones,
  outputs,
  projectId,
  onZoneClick,
  onSubmitOutput,
  onIntegrateClick,
}) => {
  // Calculate project completion percentage
  const calculateCompletion = () => {
    if (!zones.length) return 0;
    
    const completedZones = Object.keys(outputs).filter(zoneId => 
      outputs[zoneId] && outputs[zoneId].length > 0
    ).length;
    
    return Math.round((completedZones / zones.length) * 100);
  };

  const completion = calculateCompletion();
  const completedZonesCount = Object.keys(outputs).filter(zoneId => 
    outputs[zoneId] && outputs[zoneId].length > 0
  ).length;

  return (
    <div className="max-w-5xl mx-auto">
      <GardenProjectHeader project={project} />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <GardenProjectProgressCard 
          zonesCount={zones.length} 
          completedZonesCount={completedZonesCount}
          onIntegrateClick={onIntegrateClick}
        />
      </div>
      
      <ImpactGoalCard impactGoal={project.impact_goal} />
      
      <GardenProjectTabs 
        zones={zones}
        outputs={outputs}
        projectId={projectId}
        completion={completion}
        onZoneClick={onZoneClick}
        onSubmitOutput={onSubmitOutput}
        onIntegrateClick={onIntegrateClick}
      />
    </div>
  );
};

export default GardenProjectContent;
