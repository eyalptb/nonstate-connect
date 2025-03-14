
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
          onClick={toggleExpanded}
        >
          {expanded ? "Hide Details" : "View Details"}
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Verify Claim</Button>
          <Button size="sm">View Evidence</Button>
        </div>
      </CardFooter>
      
      {expanded && (
        <div className="px-6 pb-6">
          <ImpactClaimTable claims={project.impactClaims} />
        </div>
      )}
    </Card>
  );
};

export default ImpactProjectCard;
