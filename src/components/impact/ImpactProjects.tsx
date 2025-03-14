
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const projectsData = [
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

const statusIcons = {
  verified: <CheckCircle className="h-4 w-4 text-green-500" />,
  pending: <Clock className="h-4 w-4 text-amber-500" />,
  disputed: <AlertCircle className="h-4 w-4 text-red-500" />
};

const statusColors = {
  verified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  disputed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

const ImpactProjects = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects or impact claims..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {projectsData.map((project) => (
          <Card key={project.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{project.category}</Badge>
                    <span>{project.location}</span>
                  </CardDescription>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Impact Progress</div>
                  <div className="mt-1 flex items-center gap-2">
                    <Progress value={project.impactProgress} className="h-2 w-24" />
                    <span>{project.impactProgress}%</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                <span className="font-medium text-foreground">Claims: </span>
                {project.impactClaims.map((claim, i) => (
                  <span key={claim.id}>
                    {claim.metric} ({claim.claim})
                    {i < project.impactClaims.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">IPFS Hash:</span>
                <code className="bg-muted p-1 rounded">{project.ipfsHash}</code>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleProject(project.id)}
              >
                {expandedProject === project.id ? "Hide Details" : "View Details"}
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Verify Claim</Button>
                <Button size="sm">View Evidence</Button>
              </div>
            </CardFooter>
            
            {expandedProject === project.id && (
              <div className="px-6 pb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Impact Metric</TableHead>
                      <TableHead>Claim</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verification Method</TableHead>
                      <TableHead>Evidence</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {project.impactClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.metric}</TableCell>
                        <TableCell>{claim.claim}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {statusIcons[claim.status as keyof typeof statusIcons]}
                            <Badge className={`${statusColors[claim.status as keyof typeof statusColors]}`}>
                              {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{claim.verificationMethod}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{claim.evidence}</TableCell>
                        <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImpactProjects;
