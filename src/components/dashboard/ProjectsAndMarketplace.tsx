
import React from "react";
import ProjectContribution from "@/components/ProjectContribution";
import TokenMarketplace from "@/components/TokenMarketplace";

export const ProjectsAndMarketplace: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div>
        <ProjectContribution />
      </div>
      <div>
        <TokenMarketplace />
      </div>
    </div>
  );
};
