
import { useState } from "react";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ImpactClaimTable from "./ImpactClaimTable";
import { ImpactProject } from "@/types/impact";

export const statusIcons = {
  verified: <CheckCircle className="h-4 w-4 text-green-500" />,
  pending: <Clock className="h-4 w-4 text-amber-500" />,
  disputed: <AlertCircle className="h-4 w-4 text-red-500" />
};

export const statusColors = {
  verified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  disputed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

interface ImpactProjectCardProps {
  project: ImpactProject;
}

const ImpactProjectCard = ({ project }: ImpactProjectCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card id={`project-card-${project.id}`} key={project.id}>
      <CardHeader id={`project-header-${project.id}`} className="pb-2">
        <div id={`project-header-content-${project.id}`} className="flex justify-between">
          <div id={`project-title-container-${project.id}`}>
            <CardTitle id={`project-title-${project.id}`}>{project.name}</CardTitle>
            <CardDescription id={`project-description-${project.id}`} className="flex items-center gap-2 mt-1">
              <Badge id={`project-category-${project.id}`} variant="outline">{project.category}</Badge>
              <span id={`project-location-${project.id}`}>{project.location}</span>
            </CardDescription>
          </div>
          <div id={`project-progress-container-${project.id}`} className="text-sm">
            <div id={`project-progress-label-${project.id}`} className="font-medium">Impact Progress</div>
            <div id={`project-progress-bar-container-${project.id}`} className="mt-1 flex items-center gap-2">
              <Progress id={`project-progress-bar-${project.id}`} value={project.impactProgress} className="h-2 w-24" />
              <span id={`project-progress-value-${project.id}`}>{project.impactProgress}%</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent id={`project-content-${project.id}`}>
        <div id={`project-claims-summary-${project.id}`} className="text-sm text-muted-foreground mb-4">
          <span className="font-medium text-foreground">Claims: </span>
          {project.impactClaims.map((claim, i) => (
            <span id={`project-claim-summary-${project.id}-${claim.id}`} key={claim.id}>
              {claim.metric} ({claim.claim})
              {i < project.impactClaims.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div id={`project-ipfs-container-${project.id}`} className="flex items-center gap-2 text-xs">
          <span id={`project-ipfs-label-${project.id}`} className="text-muted-foreground">IPFS Hash:</span>
          <code id={`project-ipfs-hash-${project.id}`} className="bg-muted p-1 rounded">{project.ipfsHash}</code>
        </div>
      </CardContent>
      <CardFooter id={`project-footer-${project.id}`} className="flex justify-between">
        <Button
          id={`project-details-button-${project.id}`}
          variant="outline"
          size="sm"
          onClick={toggleExpanded}
        >
          {expanded ? "Hide Details" : "View Details"}
        </Button>
        <div id={`project-action-buttons-${project.id}`} className="flex gap-2">
          <Button id={`project-verify-button-${project.id}`} variant="outline" size="sm">Verify Claim</Button>
          <Button id={`project-evidence-button-${project.id}`} size="sm">View Evidence</Button>
        </div>
      </CardFooter>
      
      {expanded && (
        <div id={`project-expanded-content-${project.id}`} className="px-6 pb-6">
          <ImpactClaimTable claims={project.impactClaims} />
        </div>
      )}
    </Card>
  );
};

export default ImpactProjectCard;
