
import { useState } from "react";
import { projectsData } from "./projects/mockData";
import SearchFilter from "./projects/SearchFilter";
import ImpactProjectCard from "./projects/ImpactProjectCard";
import { ImpactProject } from "@/types/impact";

const ImpactProjects = () => {
  const [filteredProjects, setFilteredProjects] = useState<ImpactProject[]>(projectsData);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredProjects(projectsData);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = projectsData.filter((project) => {
      // Search in project name, category, location
      if (
        project.name.toLowerCase().includes(term) ||
        project.category.toLowerCase().includes(term) ||
        project.location.toLowerCase().includes(term)
      ) {
        return true;
      }
      
      // Search in impact claims
      return project.impactClaims.some(
        (claim) =>
          claim.metric.toLowerCase().includes(term) ||
          claim.claim.toLowerCase().includes(term) ||
          claim.status.toLowerCase().includes(term) ||
          claim.verificationMethod.toLowerCase().includes(term)
      );
    });
    
    setFilteredProjects(filtered);
  };

  return (
    <div className="space-y-6">
      <SearchFilter onSearch={handleSearch} />
      
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <ImpactProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ImpactProjects;
