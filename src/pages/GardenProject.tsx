
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGardenProject } from '@/hooks/useGardenProject';

import GardenProjectLoading from '@/components/garden/GardenProjectLoading';
import GardenProjectContent from '@/components/garden/GardenProjectContent';
import IntegrationDialog from '@/components/garden/IntegrationDialog';

const GardenProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    project,
    zones,
    outputs,
    loading,
    selectedZone,
    setSelectedZone,
    integrationDialogOpen,
    setIntegrationDialogOpen,
    handleSubmitOutput,
    handleIntegrateOutputs,
  } = useGardenProject(projectId);

  if (loading) {
    return <GardenProjectLoading />;
  }

  if (!project) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <GardenProjectContent
        project={project}
        zones={zones}
        outputs={outputs}
        projectId={projectId}
        onZoneClick={setSelectedZone}
        onSubmitOutput={handleSubmitOutput}
        onIntegrateClick={() => setIntegrationDialogOpen(true)}
      />
      
      <IntegrationDialog
        open={integrationDialogOpen}
        onOpenChange={setIntegrationDialogOpen}
        zones={zones}
        outputs={outputs}
        onIntegrateOutputs={handleIntegrateOutputs}
      />
    </div>
  );
};

export default GardenProject;
