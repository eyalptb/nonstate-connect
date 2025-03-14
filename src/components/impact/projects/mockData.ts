
import { ImpactProject } from "@/types/impact";

export const projectsData: ImpactProject[] = [
  {
    id: "p1",
    name: "Solar Microgrids for Rural Communities",
    category: "Energy",
    location: "Sub-Saharan Africa",
    impactClaims: [
      { 
        id: "c1",
        metric: "Energy Access", 
        claim: "5,000 households connected", 
        status: "verified", 
        verificationMethod: "Oracle",
        evidence: "Satellite imagery + IoT device data",
        date: "2023-12-15"
      },
      { 
        id: "c2",
        metric: "CO2 Reduction", 
        claim: "2,500 tons avoided", 
        status: "pending", 
        verificationMethod: "Community",
        evidence: "Energy usage metrics + calculation",
        date: "2024-02-20"
      }
    ],
    impactProgress: 75,
    ipfsHash: "Qm..."
  },
  {
    id: "p2",
    name: "Community Reforestation Initiative",
    category: "Environment",
    location: "Southeast Asia",
    impactClaims: [
      { 
        id: "c3",
        metric: "Trees Planted", 
        claim: "150,000 native trees", 
        status: "verified", 
        verificationMethod: "Hybrid",
        evidence: "Satellite imagery + on-ground verification",
        date: "2023-10-05"
      },
      { 
        id: "c4",
        metric: "Biodiversity", 
        claim: "30% increase in local species", 
        status: "disputed", 
        verificationMethod: "Scientific",
        evidence: "Research report pending peer review",
        date: "2024-01-25"
      }
    ],
    impactProgress: 60,
    ipfsHash: "Qm..."
  }
];
